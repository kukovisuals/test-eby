import axios from 'axios';
import { settings } from '../config/settings.js';

export async function fetchCart() {
  const response = await axios.get(`${settings.baseUrl}${settings.cartApi}`);
  return response.data;
}

export async function clearCart() {
  await axios.post(`${settings.baseUrl}/cart/clear.js`);
}
