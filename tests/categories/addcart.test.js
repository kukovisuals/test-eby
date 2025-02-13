import { products } from '../../config/products.js';
import { settings } from '../../config/settings.js';
import { fetchCart } from '../../helpers/api.js';
import { selectors } from '../../helpers/selectors.js';

import { test, expect } from '@playwright/test';

test.describe('Bras Tests', () => {
  test('Nude Support adds to cart a MD size', async ({ page }) => {
    for (const product of products.mainBras) {
      // Navigate to product page
      await page.goto(`${settings.baseUrl}${product.url}`);

      // Select size and add to cart
      await page.locator(selectors.sizeSelector).click();

      await Promise.all([
        page.waitForResponse((response) => 
          response.url().includes('/update.js') && response.status() === 200
        ),
        page.locator(selectors.addToCartButton).nth(0).click(),
      ]);
      // Fetch and validate cart
      const cart = await fetchCart(page);
      const cartItem = cart.items.find((item) => item.product_title.includes(product.name));

      // Check if cartItem exists
      if (!cartItem) {
        console.error(`Cart item not found for product: ${product.name}`);
        console.error('Cart contents:', cart.items);
        throw new Error(`No cart item matches the product`, product);
      }

      expect(product).toBeTruthy();

    }
  });

  test('Nude Support adds to cart a MD size from new select element', async ({ page }) => {
    for (const product of products.mainBras) {
      await page.goto(`${settings.baseUrl}${product.url}`);

      await page.selectOption('[id="190910-select-0"]', "41294597062700");
      await Promise.all([
        page.waitForResponse((response) => 
          response.url().includes('/update.js') && response.status() === 200
        ),
        page.locator(".rebuy-custom-button[js-rebuy-add]").nth(0).click(),,
      ]);

      const cart = await fetchCart(page);
      const cartItem = cart.items.find((item) => item.product_title.includes("Nude Relief Bra"));

      if (!cartItem) {
        console.error(`Cart item not found for product: ${product.name}`);
        console.error('Cart contents:', cart.items);
        throw new Error(`No cart item matches the product`, product);
      }

      expect(product).toBeTruthy();
    }
  });
});
