# PDF Export Guide

The treatment page is optimized for PDF export via Google Chrome with the full color scheme preserved.

## Color Scheme — Album Concept: Ambiance (preserved in PDF)
- **Jade dark** `#2d4338` — background
- **Muted jade** `#3d5a4a` — secondary
- **Paper** `#f8f6f2` — body text
- **Cream** `#e8e4dc` — subtitle, accents
- **Vibrant red** `#b83d3d` — Visual Language accent
- **Gold** `#c9a227` — act labels

## How to Export as PDF (Chrome)

### Option 1: Chrome Print Dialog (recommended)
1. Open `treatment.html` in **Google Chrome**
2. **File → Print** (or ⌘P)
3. **Destination:** Save as PDF
4. **More settings** → enable **Background graphics** (required for colors)
5. **Margins:** None
6. **Scale:** 100%
7. Save

### Option 2: Chrome Headless
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="Shelby-Carter-Micro-Drama-Treatments.pdf" \
  "file:///Users/samuel/Desktop/shelby%20project/treatment.html"
```

### Option 3: Puppeteer / Playwright
Use `page.pdf()` with `printBackground: true` to preserve colors.

## Print Styles Applied
- Keynote 16:9 aspect ratio (16 × 9 in) — landscape presentation format
- 0.5in–0.6in content padding
- Fixed font sizes (no viewport units)
- `print-color-adjust: exact` — preserves backgrounds when "Background graphics" is enabled
- Page-break control — one logical page per sheet; long sections flow to next page
