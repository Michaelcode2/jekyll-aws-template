# Images Directory

This directory contains all image assets for your Jekyll site.

## Required Images

Replace the placeholder `favicon.png` with your own images:

### Site Identity
- **favicon.png** (32x32 or 64x64 px) — Your site icon that appears in browser tabs
- **logo.png** or **logo.svg** (optional) — Your company logo for the header

### Homepage
- **hero-default.jpg** or **hero-banner.webp** (1920x1080 px recommended) — Main hero/banner image
- **about-team.jpg** (800x600 px) — Team photo for the About section

### Products Directory
Place your product images in the `products/` subdirectory:
- Product images should be 800x800 px (1:1 aspect ratio)
- Format: WebP for best compression, or JPG/PNG
- Name them descriptively (e.g., `product-name.webp`)

## Image Optimization Tips

1. **Use WebP format** when possible for better compression
2. **Optimize file sizes** — aim for under 200KB per image
3. **Use appropriate dimensions** — don't upload oversized images
4. **Add alt text** — always include descriptive alt attributes for accessibility
5. **Lazy loading** — use `loading="lazy"` for images below the fold

## Image Tools

- [TinyPNG](https://tinypng.com/) — Compress PNG and JPG images
- [Squoosh](https://squoosh.app/) — Convert and optimize images
- [CloudConvert](https://cloudconvert.com/) — Convert images to WebP

## Folder Structure

```
assets/images/
├── favicon.png           # Site icon
├── logo.png             # Company logo (optional)
├── hero-default.jpg     # Hero banner
├── about-team.jpg       # About page team photo
├── products/            # Product images
│   ├── product-1.webp
│   ├── product-2.webp
│   └── ...
└── README.md           # This file
```

## Usage in Jekyll

### In Markdown
```markdown
![Alt text](/assets/images/your-image.jpg)
```

### In HTML
```html
<img src="/assets/images/your-image.jpg" alt="Description" loading="lazy">
```

### In Front Matter (for SEO)
```yaml
---
image: /assets/images/your-image.jpg
---
```

## Notes

- Keep original images in a separate backup location
- Use descriptive filenames (e.g., `team-photo-2024.jpg` instead of `IMG_1234.jpg`)
- Test images on different devices and screen sizes
- Ensure images are properly licensed for your use

