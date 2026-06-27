const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outputDir = path.join(__dirname, 'screenshots');
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  const urls = [
    'https://faketube2.netlify.app/',
    'https://net-flic.netlify.app/',
    'https://teslalandingpageproject.netlify.app/',
    'https://odd-jobs-marketplace-ntsika-ngilane-devs-projects.vercel.app/',
    'https://ntsika-ngilane-dev.github.io/NoirFlow/',
    'https://ntsika-ngilane-dev.github.io/Snake/',
    'https://ntsika-ngilane-dev.github.io/Health-app-for-private/',
    'https://ntsika-ngilane-dev.github.io/LINQ/',
    'https://ntsika-ngilane-dev.github.io/NeighWatch/',
    'https://ntsika-ngilane-dev.github.io/To-Do-App-JavaScript/',
    'https://ntsika-ngilane-dev.github.io/Bookstore_Inventory_Manager_OpenLibrary/'
  ];

  for (const [index, url] of urls.entries()) {
    const safeName = url
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '')
      .replace(/[^a-zA-Z0-9]+/g, '_');
    const filename = `${index + 1}_${safeName}.png`;
    const filePath = path.join(outputDir, filename);

    console.log(`Capturing ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Saved ${filename}`);
  }

  await browser.close();
})();
