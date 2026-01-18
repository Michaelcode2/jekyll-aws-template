# Template Setup Checklist

Use this checklist to ensure you've properly configured the template for your project.

## ✅ Initial Setup

### 1. Clone and Initialize
- [ ] Clone this template repository
- [ ] Remove existing `.git` folder
- [ ] Initialize new git repository
- [ ] Create initial commit

### 2. Configuration Files

#### _config.yml
- [ ] Update `title` with your company name
- [ ] Update `description` with your site description
- [ ] Update `tagline` with your tagline
- [ ] Update `url` with your production domain
- [ ] Update `lang` (e.g., `en-US`, `uk-UA`)
- [ ] Update company information:
  - [ ] `company.name`
  - [ ] `company.phone`
  - [ ] `company.phone2`
  - [ ] `company.email`
  - [ ] `company.address`
- [ ] Update social media links:
  - [ ] `social.facebook`
  - [ ] `social.telegram`
  - [ ] `social.linkedin`

#### _config_dev.yml
- [ ] Update `url` with your development URL

### 3. Content Files

#### Navigation (_data/navigation.yml)
- [ ] Customize menu items
- [ ] Update URLs to match your pages
- [ ] Add/remove menu items as needed

#### Features (_data/features.yml)
- [ ] Replace sample features with your actual features
- [ ] Update descriptions
- [ ] Verify icon names

#### Testimonials (_data/testimonials.yml)
- [ ] Add real customer testimonials
- [ ] Update author names and positions
- [ ] Remove sample testimonials

### 4. Pages

- [ ] Update `index.html` with your homepage content
- [ ] Update `about.html` with your company information
- [ ] Update `contact.html`:
  - [ ] Replace Formspree form ID (or use your form service)
  - [ ] Update business hours
  - [ ] Verify contact information displays correctly
- [ ] Update `support.html` with your support information
- [ ] Update `terms.html` with your terms and conditions
- [ ] Update `privacy.html` with your privacy policy
- [ ] Update `products.html` if needed

### 5. Products

- [ ] Delete sample product (`_products/sample-product.md`)
- [ ] Create your actual product pages
- [ ] Add product images to `assets/images/products/`
- [ ] Verify product front matter (title, price, category, etc.)

### 6. Images

- [ ] Replace `favicon.png` with your site icon
- [ ] Add `hero-default.jpg` or hero banner image
- [ ] Add `about-team.jpg` for About page
- [ ] Add product images to `assets/images/products/`
- [ ] Delete `.gitkeep` file after adding images
- [ ] Optimize all images (WebP format recommended)

### 7. Styling (Optional)

- [ ] Update colors in `_sass/_variables.scss`
- [ ] Update fonts if needed
- [ ] Customize component styles
- [ ] Test responsive design on mobile devices

## ☁️ AWS Setup

### 1. S3 Buckets
- [ ] Create development S3 bucket
- [ ] Create production S3 bucket
- [ ] Enable static website hosting on both buckets
- [ ] Configure bucket policies (after CloudFront setup)

### 2. CloudFront Distributions
- [ ] Create development CloudFront distribution
- [ ] Create production CloudFront distribution
- [ ] Configure Origin Access Control (OAC)
- [ ] Set up CloudFront Function for index.html handling
- [ ] Update S3 bucket policies to allow CloudFront access
- [ ] (Optional) Add custom domain and SSL certificate

### 3. IAM Role for GitHub Actions
- [ ] Create OIDC provider in AWS (if not exists)
- [ ] Update `aws_setup/github-trust-policy.json`:
  - [ ] Replace `YOUR_AWS_ACCOUNT_ID`
  - [ ] Replace `YOUR_GITHUB_USERNAME`
  - [ ] Replace `YOUR_REPOSITORY_NAME`
- [ ] Update `aws_setup/github-permissions-policy.json`:
  - [ ] Replace `YOUR_DEV_BUCKET`
  - [ ] Replace `YOUR_PROD_BUCKET`
- [ ] Create IAM role with trust policy
- [ ] Attach permissions policy to role
- [ ] Copy Role ARN for GitHub configuration

## 🔧 GitHub Setup

### 1. Repository
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Create `develop` branch
- [ ] Set `main` as default branch

### 2. Secrets
Go to **Settings** → **Secrets and variables** → **Actions** → **Secrets**:
- [ ] Add `AWS_ROLE_ARN` (IAM Role ARN from AWS)

### 3. Variables
Go to **Settings** → **Secrets and variables** → **Actions** → **Variables**:
- [ ] Add `S3_BUCKET_DEV` (dev bucket name)
- [ ] Add `S3_BUCKET_PROD` (prod bucket name)
- [ ] Add `CLOUDFRONT_DISTRIBUTION_ID_DEV` (dev CloudFront ID)
- [ ] Add `CLOUDFRONT_DISTRIBUTION_ID_PROD` (prod CloudFront ID)

### 4. Environments (Recommended)
Go to **Settings** → **Environments**:
- [ ] Create `development` environment
- [ ] Create `production` environment
- [ ] Add protection rules to production:
  - [ ] Required reviewers
  - [ ] Deployment branches: `main` only

## 🧪 Testing

### 1. Local Testing
- [ ] Run `bundle install`
- [ ] Run `bundle exec jekyll serve`
- [ ] Test site at `http://localhost:4000`
- [ ] Verify all pages load correctly
- [ ] Test navigation
- [ ] Check responsive design
- [ ] Verify images display correctly

### 2. Development Deployment
- [ ] Push to `develop` branch
- [ ] Check GitHub Actions workflow runs successfully
- [ ] Verify site deploys to dev S3 bucket
- [ ] Check CloudFront invalidation completes
- [ ] Visit dev URL and test site
- [ ] Verify robots.txt blocks search engines

### 3. Production Deployment
- [ ] Merge `develop` to `main`
- [ ] Check GitHub Actions workflow runs successfully
- [ ] Verify site deploys to prod S3 bucket
- [ ] Check CloudFront invalidation completes
- [ ] Visit production URL and test site
- [ ] Verify robots.txt allows search engines
- [ ] Test all functionality

## 📝 Documentation

- [ ] Update README.md with project-specific information
- [ ] Remove template references from README
- [ ] Document any custom configurations
- [ ] Add project-specific setup instructions
- [ ] Update contact information in documentation

## 🔒 Security

- [ ] Verify AWS credentials are not in code
- [ ] Check that `.env` files are in `.gitignore`
- [ ] Ensure S3 buckets are not publicly accessible (only via CloudFront)
- [ ] Verify HTTPS is enforced
- [ ] Review IAM role permissions (principle of least privilege)

## 🌐 Domain & SSL (Optional)

- [ ] Register domain name
- [ ] Request SSL certificate in AWS Certificate Manager
- [ ] Add certificate to CloudFront distributions
- [ ] Configure custom domain in CloudFront
- [ ] Update DNS records:
  - [ ] Production: CNAME/ALIAS to CloudFront
  - [ ] Development: CNAME to dev CloudFront
- [ ] Update `_config.yml` with production domain
- [ ] Update `_config_dev.yml` with dev domain

## 📊 Analytics & Monitoring (Optional)

- [ ] Add Google Analytics or similar
- [ ] Set up AWS CloudWatch alarms
- [ ] Configure S3 access logging
- [ ] Enable CloudFront logging
- [ ] Set up uptime monitoring

## 🎉 Launch

- [ ] Final content review
- [ ] Spell check and grammar check
- [ ] Test all forms and interactive elements
- [ ] Verify all links work
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Deploy to production
- [ ] Announce launch!

## 📋 Post-Launch

- [ ] Submit sitemap to search engines
- [ ] Set up Google Search Console
- [ ] Monitor site performance
- [ ] Review analytics
- [ ] Gather user feedback
- [ ] Plan content updates

---

**Tip**: Check off items as you complete them. You can copy this checklist to a GitHub issue or project board for better tracking.

✅ **Ready to deploy?** Make sure all critical items are checked before going live!

