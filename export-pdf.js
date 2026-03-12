#!/usr/bin/env node
/**
 * Export treatment.html to PDF — screenshot-based for pixel-perfect match to browser.
 * Each page is captured exactly as it appears, then combined into a single PDF.
 *
 * Setup:  npm install
 * Run:    npm run export-pdf
 * Output: treatment.pdf
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const { PDFDocument } = require('pdf-lib');

const htmlPath = path.join(__dirname, 'treatment.html');
const pdfPath = path.join(__dirname, 'treatment.pdf');
const fileUrl = pathToFileURL(htmlPath).href;

// 16:9 viewport — matches deck aspect ratio
const PAGE_WIDTH = 1920;
const PAGE_HEIGHT = 1080;
const SCALE = 3;  // 3x for crisp PDF output

async function exportPdf() {
  if (!fs.existsSync(htmlPath)) {
    console.error('treatment.html not found at:', htmlPath);
    process.exit(1);
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Viewport matches 16:9 — vw/vh units scale correctly
    await page.setViewport({
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      deviceScaleFactor: SCALE,
    });

    console.log('Loading', htmlPath);
    await page.goto(fileUrl, {
      waitUntil: ['networkidle0', 'load'],
      timeout: 30000,
    });

    await page.evaluateHandle('document.fonts.ready');

    // Get all .page elements (direct children of .container)
    const pageElements = await page.$$('.container > .page');
    const pageCount = pageElements.length;
    console.log(`Found ${pageCount} pages. Capturing screenshots...`);

    const mergedPdf = await PDFDocument.create();
    // True 16:9 slide size in PDF points (16in x 9in at 72dpi)
    const PDF_WIDTH = 1152;
    const PDF_HEIGHT = 648;

    for (let i = 0; i < pageCount; i++) {
      const element = pageElements[i];

      await element.evaluate((el) => el.scrollIntoView({ block: 'start' }));
      await new Promise((r) => setTimeout(r, 150));

      const pngBuffer = await element.screenshot({
        type: 'png',
        omitBackground: false,
      });

      const pngImage = await mergedPdf.embedPng(pngBuffer);

      // Preserve exact browser composition inside a fixed 16:9 PDF page.
      const scale = Math.min(
        PDF_WIDTH / pngImage.width,
        PDF_HEIGHT / pngImage.height
      );
      const w = pngImage.width * scale;
      const h = pngImage.height * scale;
      const x = (PDF_WIDTH - w) / 2;
      const y = (PDF_HEIGHT - h) / 2;
      const pdfPage = mergedPdf.addPage([PDF_WIDTH, PDF_HEIGHT]);
      pdfPage.drawImage(pngImage, { x, y, width: w, height: h });

      process.stdout.write(`\r  Page ${i + 1}/${pageCount}`);
    }
    console.log('\n');

    const pdfBytes = await mergedPdf.save();
    fs.writeFileSync(pdfPath, pdfBytes);

    console.log('Done! PDF saved to:', pdfPath);
  } finally {
    await browser.close();
  }
}

exportPdf().catch((err) => {
  console.error('Export failed:', err);
  process.exit(1);
});
