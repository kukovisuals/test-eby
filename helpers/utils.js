export function log(message) {
    console.log(`[LOG]: ${message}`);
  }
  
  export async function retry(fn, retries = 3) {
    while (retries > 0) {
      try {
        return await fn();
      } catch (err) {
        retries--;
        if (retries === 0) throw new Error('Max retries reached');
      }
    }
  }
  