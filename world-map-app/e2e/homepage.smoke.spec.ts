import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://psycodelicfox.github.io/interactive-world-map/worldmap');
  // your existing assertion here
});