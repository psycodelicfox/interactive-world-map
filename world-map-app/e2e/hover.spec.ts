import { test, expect } from '@playwright/test';

test.describe('Country hover interactions', () => {
    test('hovering Germany loads country data into the info panel', async ({ page }) => {
        await page.goto('/worldmap');

        /* Wait for the SVG to be injected - the component fectches it via HTTP
        and only attaches event listeners after the SVG is in the DOM */
        const germany = page.locator('path#de');
        await expect(germany).toBeAttached({ timeout: 10_000 });

        // Trigger mouseenter (component listens for this specifically, not click)
        await germany.hover();

        // The panel updates after two API calls complete (country info, then population)
        const panel = page.locator('app-countryinfo');
        await expect(panel).toContainText('Country Name: Germany');
        await expect(panel).toContainText('Capital: Berlin');
        await expect(panel).toContainText('Region: Europe & Central Asia');
        await expect(panel).toContainText('Income Level: High income');
    });

    test('hovering a second country replaces the first country data', async ({ page }) => {
    await page.goto('/worldmap');

    const germany = page.locator('path#de');
    const japan = page.locator('path#jp');
    await expect(germany).toBeAttached({ timeout: 10_000 });

    // Hover Germany first, wait for its data to load
    await germany.hover();
    const panel = page.locator('app-countryinfo');
    await expect(panel).toContainText('Country Name: Germany');

    // Hover Japan, panel should swap
    await japan.hover();
    await expect(panel).toContainText('Country Name: Japan');
    await expect(panel).toContainText('Capital: Tokyo');
    // Germany's data should no longer be present
    await expect(panel).not.toContainText('Berlin');
  });
});