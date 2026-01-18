# Template Setup Guide

This is a Jekyll template configured for AWS S3 deployment with CloudFront CDN and GitHub Actions CI/CD.

## 🚀 Quick Start

### 1. Clone This Template

```bash
git clone https://github.com/your-username/jekyll-aws-template.git my-new-site
cd my-new-site
rm -rf .git
git init
git add .
git commit -m "Initial commit from template"
```

### 2. Customize Site Configuration

Edit `_config.yml` with your information:

```yaml
title: "Your Company Name"
description: "Your site description"
company:
  name: "Your Company Name"
  phone: "+1 234 567 8900"
  email: "info@yourcompany.com"
  address: "Your address"
social:
  facebook: "https://facebook.com/yourcompany"
  telegram: "https://t.me/yourcompany"
  linkedin: "https://linkedin.com/company/yourcompany"
```

Edit `_config_dev.yml`:

```yaml
url: "https://dev.yourcompany.com"  # Your dev URL
```

### 3. Customize Content

#### Navigation
Edit `_data/navigation.yml` to customize your site menu.

#### Features
Edit `_data/features.yml` to showcase your key features.

#### Testimonials
Edit `_data/testimonials.yml` to add customer reviews.

#### Products/Services
- Delete the sample product in `_products/`
- Create your own product pages following the same format
- Add product images to `assets/images/products/`

#### Pages
Update these HTML files with your content:
- `index.html` - Homepage
- `about.html` - About page
- `contact.html` - Contact page
- `support.html` - Support page
- `terms.html` - Terms and conditions
- `privacy.html` - Privacy policy

### 4. Update Images

Replace placeholder images in `assets/images/`:
- `favicon.png` - Your site icon (32x32 or 64x64 px)
- `hero-default.jpg` - Hero/banner image
- Delete old product images and add your own

### 5. AWS Setup

#### A. Create S3 Buckets

Create two S3 buckets (one for dev, one for prod):

```bash
# Development bucket
aws s3 mb s3://yourcompany-dev --region eu-central-1

# Production bucket
aws s3 mb s3://yourcompany-prod --region eu-central-1
```

Configure both buckets for static website hosting:

```bash
aws s3 website s3://yourcompany-dev \
  --index-document index.html \
  --error-document 404.html
```

#### B. Create CloudFront Distributions

Follow the detailed guide: [aws_setup/CLOUDFRONT_SETUP.md](aws_setup/CLOUDFRONT_SETUP.md)

Key steps:
1. Create CloudFront distribution pointing to S3 bucket
2. Configure Origin Access Control (OAC)
3. Set up CloudFront Function for index.html handling
4. Add custom domain and SSL certificate (optional)
5. Update S3 bucket policy to allow CloudFront access

#### C. Set Up GitHub OIDC Authentication

Follow the detailed guide: [aws_setup/AWS_OIDC_SETUP.md](aws_setup/AWS_OIDC_SETUP.md)

Quick steps:
1. Create OIDC provider in AWS (once per account)
2. Update `aws_setup/github-trust-policy.json` with your:
   - AWS Account ID
   - GitHub username/organization
   - Repository name
3. Update `aws_setup/github-permissions-policy.json` with your bucket names
4. Create IAM role with these policies:

```bash
# Create role
aws iam create-role \
  --role-name GitHubActions-Jekyll-Deploy \
  --assume-role-policy-document file://aws_setup/github-trust-policy.json

# Attach permissions
aws iam put-role-policy \
  --role-name GitHubActions-Jekyll-Deploy \
  --policy-name DeploymentPolicy \
  --policy-document file://aws_setup/github-permissions-policy.json
```

5. Get the Role ARN:

```bash
aws iam get-role \
  --role-name GitHubActions-Jekyll-Deploy \
  --query 'Role.Arn' \
  --output text
```

### 6. Configure GitHub Repository

#### A. Create GitHub Repository

```bash
gh repo create my-new-site --public --source=. --remote=origin
git push -u origin main
```

Or create manually on GitHub and push:

```bash
git remote add origin https://github.com/your-username/my-new-site.git
git push -u origin main
```

#### B. Create Branches

```bash
git checkout -b develop
git push -u origin develop
```

#### C. Configure GitHub Secrets

Go to **Settings** → **Secrets and variables** → **Actions**

Add the following SECRET:
- `AWS_ROLE_ARN` - The IAM Role ARN from step 5C

Add the following VARIABLES:
- `S3_BUCKET_DEV` - Your dev bucket name (e.g., `yourcompany-dev`)
- `S3_BUCKET_PROD` - Your prod bucket name (e.g., `yourcompany-prod`)
- `CLOUDFRONT_DISTRIBUTION_ID_DEV` - Dev CloudFront distribution ID
- `CLOUDFRONT_DISTRIBUTION_ID_PROD` - Prod CloudFront distribution ID

#### D. Set Up GitHub Environments (Recommended)

1. Go to **Settings** → **Environments**
2. Create `development` environment
3. Create `production` environment
   - Add protection rule: Required reviewers
   - Add protection rule: Deployment branches → `main` only

### 7. Test Deployment

Push to the develop branch to trigger a development deployment:

```bash
git checkout develop
# Make some changes
git add .
git commit -m "Test deployment"
git push origin develop
```

Check the **Actions** tab in GitHub to monitor the deployment.

### 8. Update README

After setup, update `README.md` with your project-specific information:
- Remove template references
- Add your project name and description
- Update URLs and contact information
- Add project-specific documentation

## 📝 Content Updates

### Adding a New Product

Create a new file in `_products/` directory:

```yaml
---
title: "Product Name"
excerpt: "Brief description"
category: software
price: "$99/month"
image: /assets/images/products/product-name.jpg
---

Product description in Markdown...
```

### Adding a New Page

Create a new HTML or Markdown file in the root:

```yaml
---
layout: page
title: "Page Title"
description: "SEO description"
---

Page content...
```

## 🔧 Local Development

Install dependencies:

```bash
bundle install
```

Run local server:

```bash
bundle exec jekyll serve --livereload
```

Build for production:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

## 🌐 Domain Configuration

To use a custom domain:

1. **Get SSL Certificate** from AWS Certificate Manager
2. **Update CloudFront Distribution** with custom domain and certificate
3. **Add DNS Records**:
   - Production: CNAME `www` → CloudFront domain
   - Production: ALIAS `@` → CloudFront domain
   - Development: CNAME `dev` → CloudFront domain

## 📚 Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [AWS S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS CloudFront](https://docs.aws.amazon.com/cloudfront/)
- [GitHub Actions OIDC with AWS](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

## 🆘 Troubleshooting

### Build Fails Locally

```bash
# Clear cache
bundle exec jekyll clean

# Update dependencies
bundle update

# Check for errors
bundle exec jekyll build --verbose
```

### Deployment Fails

1. Check GitHub Actions logs
2. Verify AWS credentials and permissions
3. Ensure S3 bucket names match in GitHub variables
4. Verify CloudFront distribution IDs

### CloudFront Not Serving index.html

Make sure you've configured the CloudFront Function as described in [CLOUDFRONT_SETUP.md](aws_setup/CLOUDFRONT_SETUP.md).

## 📞 Support

For issues with this template, please open an issue on GitHub.

---

✅ **Next Steps**: After completing this setup, you'll have a fully functional Jekyll site with automated deployments to AWS!

