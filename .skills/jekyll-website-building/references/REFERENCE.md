# Jekyll Technical Reference

Detailed technical reference for Jekyll website development.

## Configuration Deep Dive

### _config.yml Structure

```yaml
# Site settings
title: "Site Title"
tagline: "Site tagline"
description: "SEO description (150-160 chars)"
url: "https://example.com"      # Production URL
baseurl: ""                      # Subpath (e.g., /blog)

# Build settings
markdown: kramdown
highlighter: rouge
permalink: pretty               # /:categories/:year/:month/:day/:title/

# Sass processing
sass:
  style: compressed             # compressed | expanded
  sass_dir: _sass

# Collections
collections:
  products:
    output: true                # Generate pages
    permalink: /products/:path/
  team:
    output: false               # Data only, no pages

# Default front matter
defaults:
  - scope:
      path: ""
      type: "pages"
    values:
      layout: "page"
  - scope:
      path: ""
      type: "products"
    values:
      layout: "product"

# Plugins
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-feed

# Exclude from build
exclude:
  - Gemfile
  - Gemfile.lock
  - README.md
  - node_modules/
  - .git/
```

### Environment Variables

```bash
# Production build
JEKYLL_ENV=production bundle exec jekyll build

# Access in templates
{% if jekyll.environment == "production" %}
  <!-- Analytics code -->
{% endif %}
```

## Liquid Advanced Patterns

### Conditional Logic

```liquid
{% if page.featured %}
  <span class="badge">Featured</span>
{% elsif page.new %}
  <span class="badge">New</span>
{% endif %}

{% unless page.hidden %}
  <!-- Show content -->
{% endunless %}

{% case page.category %}
  {% when "software" %}
    <i class="icon-software"></i>
  {% when "hardware" %}
    <i class="icon-hardware"></i>
  {% else %}
    <i class="icon-default"></i>
{% endcase %}
```

### Loop Controls

```liquid
{% for product in site.products limit:6 offset:2 %}
  {% if forloop.first %}
    <div class="featured">
  {% endif %}
  
  <div class="product">
    {{ product.title }}
    Index: {{ forloop.index }}      <!-- 1-based -->
    Index0: {{ forloop.index0 }}    <!-- 0-based -->
    Remaining: {{ forloop.rindex }}
    Length: {{ forloop.length }}
  </div>
  
  {% if forloop.last %}
    </div>
  {% endif %}
{% endfor %}
```

### Variable Assignment

```liquid
{% assign featured = site.products | where: "featured", true | sort: "order" %}
{% assign total_price = 0 %}

{% capture product_list %}
  {% for p in site.products %}
    {{ p.title }}{% unless forloop.last %}, {% endunless %}
  {% endfor %}
{% endcapture %}

{{ product_list | strip }}
```

### Array Operations

```liquid
{% assign all_tags = "" | split: "" %}
{% for product in site.products %}
  {% assign all_tags = all_tags | concat: product.tags %}
{% endfor %}
{% assign unique_tags = all_tags | uniq | sort %}
```

## Include Parameters

### Passing Data to Includes

```liquid
{% include card.html 
   title=product.title 
   image=product.image 
   url=product.url 
   class="featured"
%}
```

### In the Include File

```html
<!-- _includes/card.html -->
<div class="card {{ include.class }}">
  <img src="{{ include.image }}" alt="{{ include.title }}">
  <h3>{{ include.title }}</h3>
  <a href="{{ include.url }}">Learn more</a>
</div>
```

### Include with Content Block

```liquid
{% capture card_content %}
  <p>Custom content here</p>
{% endcapture %}

{% include card.html content=card_content %}
```

## Data Files

### YAML Data (_data/navigation.yml)

```yaml
main:
  - title: "Home"
    url: /
    icon: home
  - title: "Products"
    url: /products.html
    icon: box
    children:
      - title: "Software"
        url: /products.html?category=software
      - title: "Hardware"
        url: /products.html?category=hardware
```

### Accessing Nested Data

```liquid
{% for item in site.data.navigation.main %}
  <a href="{{ item.url }}">{{ item.title }}</a>
  {% if item.children %}
    <ul>
      {% for child in item.children %}
        <li><a href="{{ child.url }}">{{ child.title }}</a></li>
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}
```

### Multiple Data Files

```
_data/
├── navigation.yml
├── products/
│   ├── software.yml
│   └── hardware.yml
└── i18n/
    ├── en.yml
    └── uk.yml
```

Access: `site.data.products.software`, `site.data.i18n.uk`

## SCSS Organization

### Variables (_sass/_variables.scss)

```scss
// Colors
$color-primary: #2563eb;
$color-secondary: #64748b;
$color-success: #22c55e;
$color-warning: #f59e0b;
$color-danger: #ef4444;

$color-text: #1e293b;
$color-text-light: #64748b;
$color-background: #ffffff;
$color-surface: #f8fafc;

// Typography
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
$font-family-heading: 'Montserrat', sans-serif;
$font-family-mono: 'Fira Code', monospace;

$font-size-base: 1rem;
$font-size-sm: 0.875rem;
$font-size-lg: 1.125rem;
$font-size-xl: 1.25rem;

$line-height-base: 1.6;
$line-height-heading: 1.2;

// Spacing
$spacing-unit: 8px;
$spacing-xs: $spacing-unit * 0.5;   // 4px
$spacing-sm: $spacing-unit;          // 8px
$spacing-md: $spacing-unit * 2;      // 16px
$spacing-lg: $spacing-unit * 3;      // 24px
$spacing-xl: $spacing-unit * 4;      // 32px

// Layout
$max-width: 1200px;
$max-width-content: 800px;
$border-radius: 8px;
$border-radius-lg: 12px;

// Breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;

// Shadows
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

### Responsive Mixins

```scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: $breakpoint-sm) { @content; }
  } @else if $breakpoint == md {
    @media (min-width: $breakpoint-md) { @content; }
  } @else if $breakpoint == lg {
    @media (min-width: $breakpoint-lg) { @content; }
  } @else if $breakpoint == xl {
    @media (min-width: $breakpoint-xl) { @content; }
  }
}

// Usage
.container {
  padding: $spacing-md;
  
  @include respond-to(md) {
    padding: $spacing-lg;
  }
  
  @include respond-to(lg) {
    padding: $spacing-xl;
  }
}
```

## SEO Configuration

### jekyll-seo-tag Setup

```yaml
# _config.yml
title: "Site Title"
tagline: "Tagline for title separator"
description: "Default meta description"
url: "https://example.com"
author: "Company Name"

logo: /assets/images/logo.png
image: /assets/images/og-default.jpg

social:
  name: "Company Name"
  links:
    - https://facebook.com/company
    - https://twitter.com/company
    - https://linkedin.com/company/company

twitter:
  username: company
  card: summary_large_image

facebook:
  app_id: 123456789
  publisher: https://facebook.com/company
```

### Page-Level SEO

```yaml
---
title: "Page Title"
description: "Custom meta description for this page"
image: /assets/images/custom-og-image.jpg
author: "Author Name"
---
```

### In Layout Head

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  {% seo %}
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
</head>
```

## Pagination (jekyll-paginate-v2)

### Configuration

```yaml
# _config.yml
pagination:
  enabled: true
  per_page: 10
  permalink: '/page/:num/'
  title: ':title - Page :num'
  sort_field: 'date'
  sort_reverse: true
```

### In Template

```liquid
---
layout: default
pagination:
  enabled: true
  collection: products
---

{% for product in paginator.posts %}
  <div class="product-card">{{ product.title }}</div>
{% endfor %}

{% if paginator.total_pages > 1 %}
<nav class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path }}">Previous</a>
  {% endif %}
  
  <span>Page {{ paginator.page }} of {{ paginator.total_pages }}</span>
  
  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path }}">Next</a>
  {% endif %}
</nav>
{% endif %}
```

## Performance Optimization

### Image Optimization

```html
<!-- Lazy loading -->
<img src="{{ image }}" alt="{{ alt }}" loading="lazy" decoding="async">

<!-- Responsive images -->
<picture>
  <source srcset="{{ image | replace: '.jpg', '.webp' }}" type="image/webp">
  <img src="{{ image }}" alt="{{ alt }}" loading="lazy">
</picture>
```

### Asset Fingerprinting

```liquid
<link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}?v={{ site.time | date: '%s' }}">
```

### Conditional Loading

```liquid
{% if jekyll.environment == "production" %}
  <!-- Minified assets -->
  <script src="{{ '/assets/js/main.min.js' | relative_url }}"></script>
{% else %}
  <!-- Development assets -->
  <script src="{{ '/assets/js/main.js' | relative_url }}"></script>
{% endif %}
```
