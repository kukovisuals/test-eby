import { test, expect } from '@playwright/test';

test('Hello World Test', async ({ page }) => {
  // Navigate to a website
  await page.goto('https://example.com');

  // Assert that the page title is correct
  const title = await page.title();
  console.log(`Page title: ${title}`);
  expect(title).toBe('Example Domain');
});


// import { bras } from '../../config/products.js';
// import { settings } from '../../config/settings.js';
// import { fetchCart } from '../../helpers/api.js';
// import { selectors } from '../../helpers/selectors.js';

// import { test, expect } from '@playwright/test';

// test.describe('Bras Tests', () => {
//   test('Add bras to cart and validate properties', async ({ page }) => {
//     for (const product of bras) {
//       // Navigate to product page
//       await page.goto(`${settings.baseUrl}${product.url}`);

//       // Select size and add to cart
//       await page.selectOption(selectors.sizeSelector, product.size);
//       await page.click(selectors.addToCartButton);

//       // Fetch and validate cart
//       const cart = await fetchCart();
//       const cartItem = cart.items.find((item) => item.title === product.name);

//       expect(cartItem).toBeTruthy();
//       expect(cartItem.properties[product.expectedProperty]).toBeDefined();
//     }
//   });
// });
