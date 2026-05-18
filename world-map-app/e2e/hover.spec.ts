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
        const panel = page.locator('app-country-info');
        await expect(panel).toContainText('Country Name: Germany');
        await expect(panel).toContainText('Capital: Berlin');
        await expect(panel).toContainText('Region: Europe & Central Asia');
        await expect(panel).toContainText('Income Level: High income');
    });

    
});