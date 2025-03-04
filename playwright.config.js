import { settings } from './config/settings.js';

export default {
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: settings.baseUrl,
    headless: true,
    actionTimeout: settings.timeout,
  },
};
