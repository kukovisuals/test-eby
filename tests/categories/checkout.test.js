import { products } from '../../config/products.js';
import { settings } from '../../config/settings.js';
import { fetchCart } from '../../helpers/api.js';
import { selectors } from '../../helpers/selectors.js';
import { test, expect } from '@playwright/test';

test.describe('Checkout Test', () => {
    test('Nude Support adds to cart a MD size', async ({ page }) => {
        for (const product of products.mainBras) {
            console.log(`Testing product: ${product.url}`);

            // Navigate to product page
            await page.goto(`${settings.baseUrl}${product.url}`, { waitUntil: 'domcontentloaded' });

            // Select size and add to cart
            await page.waitForSelector(selectors.sizeSelector, { state: 'visible' });
            await page.locator(selectors.sizeSelector).click();

            // Wait for Add to Cart response
            await Promise.all([
                page.waitForResponse((response) =>
                    response.url().includes('/update.js') && response.status() === 200
                ),
                page.locator(selectors.addToCartButton).nth(0).click(),
            ]);

            // Close any success pop-up
            await page.locator(".toast.ebyAtcAlert").waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            await page.locator(".toast.ebyAtcAlert").click().catch(() => {});

            // Proceed to checkout
            console.log("Proceeding to checkout...");
            await page.locator(".btnCheckout").waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            await page.locator(".btnCheckout").click();
            await page.waitForTimeout(5000);

            // ✅ Check for "Out of Stock" message  
            const outOfStockExists = await page.locator("text=out of stock").count();
            expect(outOfStockExists).toBe(0); // Passes if "Out of Stock" is not found


            console.log(`✅ Checkout test passed for product: ${product.url}`);
        }
    });
});
