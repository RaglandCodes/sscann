const fastify = require('fastify')({ logger: true });
const puppeteer = require('puppeteer');

// Declare a route
fastify.get('/', async (request, reply) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
  })();

  return { hello: 'world' };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
