import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

async function expectNoSeriousAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem('sororite-consent'));
});

test('la portada expone el hero, no carga analítica y pasa axe', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Ver cursos' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Cookies' })).toBeVisible();
  await expect(
    page.locator('script[src*="googletagmanager"], script[src*="facebook.net"]'),
  ).toHaveCount(0);
  await expectNoSeriousAxeViolations(page);
});

test('rechazar cookies oculta el aviso y no inyecta scripts', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Rechazar' }).click();
  await expect(page.getByRole('region', { name: 'Cookies' })).toHaveCount(0);
  await expect(
    page.locator('script[src*="googletagmanager"], script[src*="facebook.net"]'),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'Preferencias de cookies' }).click();
  await expect(page.getByRole('region', { name: 'Cookies' })).toBeVisible();
});

test('el menú móvil abre la navegación', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menú' }).click();
  await page
    .getByRole('navigation', { name: 'Principal' })
    .getByRole('link', { name: 'Contacto', exact: true })
    .click();
  await expect(page).toHaveURL(/\/contacto$/);
  await expect(page.getByRole('link', { name: /Escribir por WhatsApp/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Enviar un correo/ })).toBeVisible();
  await page.getByRole('button', { name: 'Rechazar' }).click();
  await expectNoSeriousAxeViolations(page);
});

test('las páginas principales pasan axe', async ({ page }) => {
  const paths = [
    '/quienes-somos',
    '/cursos',
    '/galeria',
    '/contacto',
    '/politica-de-privacidad',
    '/terminos',
  ];
  for (const path of paths) {
    await page.goto(path);
    await page.getByRole('button', { name: 'Rechazar' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expectNoSeriousAxeViolations(page);
  }
});

test('la ficha de ejemplo muestra el aviso y el esquema Course', async ({ page }) => {
  await page.goto('/cursos/ejemplo-cosmetica-natural-online');
  await expect(page.getByText('Dato de ejemplo')).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
  expect(jsonLd).toContain('"@type":"Course"');
  expect(jsonLd).toContain('"@type":"Organization"');
  await page.getByRole('button', { name: 'Rechazar' }).click();
  await expectNoSeriousAxeViolations(page);
});

test('una ruta inexistente muestra la página 404', async ({ page }) => {
  const response = await page.goto('/ruta-que-no-existe');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'No encontramos esta página' })).toBeVisible();
});
