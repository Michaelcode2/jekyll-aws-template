# Jekyll AWS Deployment Template

A professional Jekyll static site template configured for AWS S3 deployment with CloudFront CDN, GitHub Actions CI/CD, and modern business features.

## 🌟 Features

- **Jekyll 4.x** — Modern static site generator
- **Responsive Design** — Mobile-first, professional layout
- **AWS S3 + CloudFront** — Scalable, fast hosting with CDN
- **GitHub Actions CI/CD** — Automated deployment pipeline
- **OIDC Authentication** — Secure AWS access without keys
- **Dual Environments** — Separate dev and production workflows
- **SEO Optimized** — Built-in SEO tags and sitemap
- **Product Showcase** — Ready-to-use product/service pages
- **Contact Forms Ready** — Template pages for customer engagement

## 🚀 Quick Start

**New to this template?** Start with [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) for detailed setup instructions.

### Prerequisites

- Ruby 3.0+
- Bundler 2.x
- Git
- AWS Account
- GitHub Account

### Local Development

```bash
# Clone this template
git clone https://github.com/your-username/jekyll-aws-template.git my-site
cd my-site

# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve --livereload

# Open http://localhost:4000
```

### Production Build

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

## 📁 Project Structure

```
├── _config.yml          # Main Jekyll configuration
├── _config_dev.yml      # Development environment config
├── _data/               # Site data (navigation, features, testimonials)
├── _includes/           # Reusable components (header, footer, hero)
├── _layouts/            # Page templates (default, home, page, product)
├── _products/           # Product/service collection
├── _sass/               # SCSS stylesheets
├── assets/
│   ├── css/            # Compiled CSS
│   ├── js/             # JavaScript
│   └── images/         # Images and media
├── .github/workflows/   # CI/CD workflows
├── aws_setup/          # AWS configuration guides
│   ├── AWS_OIDC_SETUP.md
│   ├── CLOUDFRONT_SETUP.md
│   ├── github-trust-policy.json
│   └── github-permissions-policy.json
├── index.html          # Homepage
├── products.html       # Products catalog
├── about.html          # About page
├── contact.html        # Contact page
├── support.html        # Support page
├── terms.html          # Terms and conditions
├── privacy.html        # Privacy policy
└── robots.txt          # Search engine directives
```

## 🌍 Deployment Environments

### Development (`develop` branch)
- **Trigger**: Push to `develop` branch
- **URL**: CloudFront URL or custom dev subdomain
- **SEO**: Disabled (robots.txt blocks crawlers)
- **Purpose**: Testing and preview

### Production (`main` branch)
- **Trigger**: Push to `main` branch
- **URL**: Your production domain
- **SEO**: Enabled for search engines
- **Purpose**: Live public site

## 🔐 AWS Setup Overview

This template uses modern AWS OIDC authentication (no access keys needed).

### Required AWS Resources:

1. **S3 Buckets** (2)
   - Development bucket
   - Production bucket

2. **CloudFront Distributions** (2)
   - Development distribution
   - Production distribution

3. **IAM Role**
   - OIDC trust relationship with GitHub
   - Permissions to deploy to S3 and invalidate CloudFront

### Setup Guides:

- **[TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)** — Complete setup guide for this template
- **[aws_setup/AWS_OIDC_SETUP.md](aws_setup/AWS_OIDC_SETUP.md)** — GitHub OIDC authentication
- **[aws_setup/CLOUDFRONT_SETUP.md](aws_setup/CLOUDFRONT_SETUP.md)** — CloudFront + S3 configuration

## ⚙️ GitHub Configuration

### Required Secrets:
| Secret Name | Description |
|------------|-------------|
| `AWS_ROLE_ARN` | IAM Role ARN for OIDC authentication |

### Required Variables:
| Variable Name | Description |
|--------------|-------------|
| `S3_BUCKET_DEV` | Development S3 bucket name |
| `S3_BUCKET_PROD` | Production S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID_DEV` | Dev CloudFront distribution ID |
| `CLOUDFRONT_DISTRIBUTION_ID_PROD` | Prod CloudFront distribution ID |

## 📝 Customization

### Site Configuration

Edit `_config.yml`:
```yaml
title: "Your Company Name"
description: "Your site description"
company:
  name: "Your Company"
  phone: "+1 234 567 8900"
  email: "info@yourcompany.com"
```

### Navigation

Edit `_data/navigation.yml`:
```yaml
main:
  - title: "Home"
    url: "/"
  - title: "Products"
    url: "/products/"
```

### Homepage Features

Edit `_data/features.yml` to showcase your key benefits.

### Testimonials

Edit `_data/testimonials.yml` to add customer reviews.

### Adding Products

Create a new file in `_products/`:

```markdown
---
title: "Product Name"
excerpt: "Brief description"
category: software
price: "$99/month"
image: /assets/images/products/product.jpg
---

Product description...
```

### Adding Pages

Create a new HTML or Markdown file:

```yaml
---
layout: page
title: "Page Title"
description: "SEO description"
---

Page content...
```

## 🎨 Styling

Styles are in `_sass/`:
- `_variables.scss` — Colors, fonts, sizes
- `_base.scss` — Base styles
- `_components.scss` — Buttons, forms, cards
- `_header.scss` — Site header
- `_footer.scss` — Site footer
- `_hero.scss` — Hero banner
- `_sections.scss` — Homepage sections
- `_product.scss` — Product pages

## 🔧 Useful Commands

```bash
# Check Jekyll configuration
bundle exec jekyll doctor

# Clear build cache
bundle exec jekyll clean

# Build with verbose output
bundle exec jekyll build --verbose

# Update dependencies
bundle update

# Serve with drafts
bundle exec jekyll serve --drafts
```

## 🧪 Testing

The template includes a build test workflow that runs on pull requests:

```bash
# Manually trigger a build test
git checkout -b test-branch
# Make changes
git push origin test-branch
# Create pull request on GitHub
```

## 📦 What's Included

- ✅ Responsive, professional design
- ✅ Product/service showcase system
- ✅ Contact form template
- ✅ SEO optimization with jekyll-seo-tag
- ✅ Sitemap generation
- ✅ RSS feed
- ✅ Social media integration
- ✅ 404 error page
- ✅ Privacy policy and terms pages
- ✅ Support page template
- ✅ Icon system
- ✅ Mobile-optimized navigation
- ✅ Fast CloudFront CDN delivery
- ✅ Secure OIDC authentication
- ✅ Automated deployments
- ✅ Environment-specific configurations

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

The site is adapted for:
- 📱 Mobile devices (< 640px)
- 📱 Tablets (768px - 1024px)
- 💻 Laptops (1024px - 1280px)
- 🖥️ Desktops (> 1280px)

## 📚 Documentation

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [AWS S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS CloudFront](https://docs.aws.amazon.com/cloudfront/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🆘 Troubleshooting

### Build Errors

```bash
bundle exec jekyll clean
bundle update
bundle exec jekyll build --verbose
```

### Deployment Issues

1. Check GitHub Actions logs
2. Verify AWS permissions
3. Confirm S3 bucket names in GitHub variables
4. Check CloudFront distribution IDs

### CloudFront 403 Errors

Ensure CloudFront Function is configured for index.html handling (see CLOUDFRONT_SETUP.md).

## 🔒 Security

- No AWS access keys stored in GitHub
- OIDC-based temporary credentials
- S3 bucket access restricted to CloudFront
- HTTPS enforced via CloudFront
- Security headers configurable in CloudFront

## 📄 License

This template is provided as-is for use in your projects. Customize and deploy as needed.

## 🤝 Contributing

This is a template repository. Feel free to fork and customize for your needs.

## 📞 Support

For template issues, please check:
1. [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) — Setup guide
2. [AWS_OIDC_SETUP.md](aws_setup/AWS_OIDC_SETUP.md) — Authentication guide
3. [CLOUDFRONT_SETUP.md](aws_setup/CLOUDFRONT_SETUP.md) — CDN setup guide

---

**Ready to deploy?** Follow the [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) guide to get started!

Built with Jekyll 💎 | Deployed on AWS ☁️ | Automated with GitHub Actions 🚀


🇺🇦 Made in Ukraine
