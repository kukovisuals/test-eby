// import { test, expect } from '@playwright/test';

// test('Hello World Test', async ({ page }) => {
//   // Navigate to a website
//   await page.goto('https://example.com');

//   // Assert that the page title is correct
//   const title = await page.title();
//   console.log(`Page title: ${title}`);
//   expect(title).toBe('Example Domain');
// });


import { products } from '../../config/products.js';
import { settings } from '../../config/settings.js';
import { fetchCart } from '../../helpers/api.js';
import { selectors } from '../../helpers/selectors.js';

import { test, expect } from '@playwright/test';

test.describe('Bras Tests', () => {
  test('Add a bra and make sure the line item prop Shipping Option exist', async ({ page }) => {
    for (const product of products.bras) {
      // Navigate to product page
      await page.goto(`${settings.baseUrl}${product.url}`);

      // Select size and add to cart
      await page.locator(selectors.sizeSelector).nth(1).click();

      await Promise.all([
        page.waitForResponse((response) => 
          response.url().includes('/update.js') && response.status() === 200
        ),
        page.locator(selectors.addToCartButton).nth(0).click(),
      ]);
      // Fetch and validate cart
      const cart = await fetchCart(page);
      const cartItem = cart.items.find((item) => item.product_title === product.name);

      // Check if cartItem exists
      if (!cartItem) {
        console.error(`Cart item not found for product: ${product.name}`);
        console.error('Cart contents:', cart.items);
        throw new Error(`No cart item matches the product`, product);
      }

      // Check if properties exist
      if (!cartItem.properties) {
        console.error(`Properties not found for cart item: ${cartItem.product_title}`);
        throw new Error('Cart item properties are undefined.');
      }

      // Check if the expected property exists
      if (!(product.expectedProperty in cartItem.properties)) {
        console.error(`Expected property "${product.expectedProperty}" not found.  ${cartItem}`);
        console.error('Available properties:', Object.keys(cartItem.properties));
        throw new Error(
          `Property "${product.expectedProperty}" does not exist on cart item.`
        );
      }

      expect(product).toBeTruthy();
      expect(cartItem.properties).toBeTruthy();
      expect(cartItem.properties[product.expectedProperty]).toBe(product.expectedValue);
    }
  });
});
