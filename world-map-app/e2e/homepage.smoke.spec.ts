import { test, expect } from '@playwright/test';

test.describe('Homepage smoke tests', () => {
  test('Home page loads and renders the application title', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle('Interactive World Map | Country Data Explorer')
  ;})

  test('world map SVG is injected into the page', async ({ page }) => {
    await page.goto('');
    const mapContainer = page.locator('.worldmap-container');
    await expect(mapContainer).toBeVisible();
    // Verify the SVG actually loaded by checking for at least one country path
    const countryPaths = mapContainer.locator('path');
    await expect(countryPaths.first()).toBeAttached({ timeout: 10_000 });
  });

  test('country info panel is rendered with default empty state', async ({ page }) => {
    await page.goto('');
    const infoPanel = page.locator('app-countryinfo');
    await expect(infoPanel).toBeVisible();
    await expect(infoPanel).toContainText('Country Name:');
    await expect(infoPanel).toContainText('Capital:');
  });
});