
import { createServer } from 'vite';

async function test() {
  try {
    const server = await createServer({ configFile: './vite.config.ts' });
    await server.close();
  } catch(e) {
    console.log('Caught:', e.message);
  }
}
test();
