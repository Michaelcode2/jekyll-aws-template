---
name: jekyll-website-building
description: Build and maintain Jekyll static websites. Use when creating pages, editing layouts, managing collections, configuring site settings, working with Liquid templates, or styling with SCSS. Covers content management, navigation, SEO, and local development.
license: MIT
compatibility: Requires Ruby 3.0+, Bundler, and Jekyll 4.x. Works with any Jekyll project.
metadata:
  author: Michael Vaynagiy
  version: "1.0"
allowed-tools: Bash(bundle:*) Bash(jekyll:*) Read Write Edit Glob Grep
---

# Jekyll Website Building Skill

This skill enables building and maintaining Jekyll static websites, including content management, templating, styling, and configuration.

## Project Structure

Standard Jekyll project layout:

```
project/
├── _config.yml        # Site configuration
├── _data/             # Data files (YAML, JSON, CSV)
├── _includes/         # Reusable components
├── _layouts/          # Page templates
├── _posts/            # Blog posts (YYYY-MM-DD-title.md)
├── _sass/             # SCSS partials
├── _site/             # Generated output (don't edit)
├── assets/            # Static files (CSS, JS, images)
├── Gemfile            # Ruby dependencies
└── index.html         # Homepage
```

Custom collections are defined in `_config.yml` and stored in `_collectionname/` directories.

## Core Concepts

### Front Matter

Every content file starts with YAML front matter between `---` delimiters:

```yaml
---
layout: page
title: "Page Title"
description: "SEO description"
permalink: /custom-url/
---
```

### Liquid Templating

Jekyll uses Liquid for dynamic content:

- **Output**: `{{ variable }}` - renders content
- **Tags**: `{% if condition %}...{% endif %}` - logic
- **Filters**: `{{ "text" | upcase }}` - transformations

Common patterns:

```liquid
{% for item in site.collection %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}

{% include component.html param="value" %}

{{ page.content | markdownify }}
{{ page.date | date: "%B %d, %Y" }}
{{ "/path" | relative_url }}
```

### Layouts

Layouts in `_layouts/` define page structure. They can inherit:

```html
<!-- _layouts/page.html -->
---
layout: default
---
<article>
  <h1>{{ page.title }}</h1>
  {{ content }}
</article>
```

### Includes

Reusable components in `_includes/`:

```liquid
{% include header.html %}
{% include icon.html name="check" class="success" %}
```

## Common Tasks

### Creating a New Page

1. Create file at root or in subdirectory
2. Add front matter with `layout`, `title`, `description`
3. Add content in Markdown or HTML

```yaml
---
layout: page
title: "About Us"
description: "Learn about our company"
---

Content here...
```

### Adding to a Collection

1. Create file in collection directory (e.g., `_products/`)
2. Include required front matter fields
3. Check `_config.yml` for collection settings

```yaml
---
layout: product
title: "Product Name"
excerpt: "Short description"
price: "100"
image: /assets/images/products/product.png
order: 1
---

Full description...
```

### Modifying Navigation

Edit `_data/navigation.yml`:

```yaml
main:
  - title: "Home"
    url: /
  - title: "Products"
    url: /products.html
```

Use in templates:

```liquid
{% for item in site.data.navigation.main %}
  <a href="{{ item.url }}">{{ item.title }}</a>
{% endfor %}
```

### Adding Styles

1. Create SCSS partial in `_sass/` (e.g., `_sass/_component.scss`)
2. Import in main stylesheet: `@import "component";`

Variables go in `_sass/_variables.scss`:

```scss
$color-primary: #2563eb;
$font-family: 'Inter', sans-serif;
```

### Configuration Changes

Edit `_config.yml` for site-wide settings:

```yaml
title: "Site Title"
description: "Site description"
url: "https://example.com"
baseurl: ""

collections:
  products:
    output: true
    permalink: /products/:path/

defaults:
  - scope:
      path: ""
      type: "products"
    values:
      layout: "product"
```

**Important**: Restart `jekyll serve` after config changes.

## Development Commands

```bash
# Install dependencies
bundle install

# Start dev server with live reload
bundle exec jekyll serve --livereload

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Include draft posts
bundle exec jekyll serve --drafts

# Clean build cache
bundle exec jekyll clean

# Check for issues
bundle exec jekyll doctor
```

## File Naming Conventions

- **Pages**: `name.html` or `name.md`
- **Posts**: `YYYY-MM-DD-title.md`
- **Collections**: `item-name.md` (use hyphens)
- **Includes**: `component-name.html`
- **Layouts**: `layout-name.html`
- **SCSS**: `_partial-name.scss` (underscore prefix)

## Common Liquid Filters

| Filter | Example | Result |
|--------|---------|--------|
| `relative_url` | `{{ "/page" \| relative_url }}` | `/baseurl/page` |
| `absolute_url` | `{{ "/page" \| absolute_url }}` | `https://site.com/page` |
| `date` | `{{ page.date \| date: "%Y-%m-%d" }}` | `2026-01-22` |
| `where` | `{{ site.products \| where: "featured", true }}` | Filtered array |
| `sort` | `{{ site.products \| sort: "order" }}` | Sorted array |
| `markdownify` | `{{ page.excerpt \| markdownify }}` | HTML from Markdown |
| `slugify` | `{{ "Page Title" \| slugify }}` | `page-title` |
| `truncate` | `{{ content \| truncate: 100 }}` | First 100 chars |

## SEO Checklist

1. Add `jekyll-seo-tag` plugin
2. Include `{% seo %}` in `<head>`
3. Set `title` and `description` in front matter
4. Configure `url` and social links in `_config.yml`
5. Add `image` for Open Graph previews

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Changes not appearing | Restart server (config changes require restart) |
| Build errors | Check YAML syntax, ensure proper indentation |
| Missing styles | Verify `@import` in main.scss, check file paths |
| 404 on pages | Check `permalink` and `baseurl` settings |
| Liquid errors | Escape with `{% raw %}...{% endraw %}` if needed |

## References

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Liquid Reference](https://shopify.github.io/liquid/)
- [Jekyll SEO Tag](https://github.com/jekyll/jekyll-seo-tag)
