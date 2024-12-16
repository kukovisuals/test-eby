import axios from 'axios';
import { settings } from '../config/settings.js';

export async function fetchCart(page) {
  return await page.evaluate(async (url) => {
    // Introduce a delay
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 1 second
    const response = await fetch(url, {method: 'GET'});
    return await response.json();
  }, `${settings.baseUrl}${settings.cartApi}`)
}

export async function clearCart() {
  await axios.post(`${settings.baseUrl}/cart/clear.js`);
}
