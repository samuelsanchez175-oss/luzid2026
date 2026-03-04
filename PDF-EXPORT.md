# PDF Export Guide

The treatment page is pre-planned for PDF export with the full color scheme preserved.

## Color Scheme — Album Concept: Ambiance (preserved in PDF)
- **Jade dark** `#2d4338` — background
- **Muted jade** `#3d5a4a` — secondary
- **Paper** `#f8f6f2` — body text
- **Cream** `#e8e4dc` — subtitle, accents
- **Vibrant red** `#b83d3d` — Visual Language accent
- **Gold** `#c9a227` — act labels

## How to Export as PDF

### Option 1: Browser Print (recommended)
1. Open `treatment.html` in Chrome or Safari
2. **File → Print** (or ⌘P)
3. Set **Destination** to **Save as PDF**
4. Enable **Background graphics** (Chrome) or **Print backgrounds** (Safari)
5. Margins: Default or None
6. Save

### Option 2: Chrome Headless
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --disable-gpu --print-to-pdf="treatment.pdf" \
  --print-to-pdf-no-header \
  file:///path/to/treatment.html
```

### Option 3: Puppeteer / Playwright
Use `page.pdf()` with `printBackground: true` to preserve colors.

## Print Styles Applied
- Letter size (8.5 × 11 in)
- 0.75in margins
- Fixed pt sizes (no viewport units)
- `print-color-adjust: exact` — forces background/color to print
- Page-break control — sections stay together where possible
