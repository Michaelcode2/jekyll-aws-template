# Quick Start Guide

Get your Jekyll site deployed to AWS in 30 minutes!

**🤖 Pro Tip**: This template works great with AI coding assistants like Cursor and Aider. Use them to speed up customization and content generation!

## 📋 Prerequisites

- Ruby 3.0+ installed
- Git installed
- AWS Account
- GitHub Account
- Basic command line knowledge

## 🚀 5-Step Quick Start

### Step 1: Clone and Customize (5 minutes)

```bash
# Clone this template
git clone https://github.com/your-username/jekyll-aws-template.git my-site
cd my-site

# Install dependencies
bundle install

# Start local server to preview
bundle exec jekyll serve
# Visit http://localhost:4000
```

**Quick customizations:**
- Edit `_config.yml` → Update company name, email, phone
- Edit `_data/navigation.yml` → Customize menu
- Edit `index.html` → Update homepage content

### Step 2: Create AWS Resources (10 minutes)

```bash
# Create S3 buckets
aws s3 mb s3://mycompany-dev --region eu-central-1
aws s3 mb s3://mycompany-prod --region eu-central-1

# Enable static website hosting
aws s3 website s3://mycompany-dev \
  --index-document index.html \
  --error-document 404.html

aws s3 website s3://mycompany-prod \
  --index-document index.html \
  --error-document 404.html
```

**Create CloudFront distributions:**
- Follow [aws_setup/CLOUDFRONT_SETUP.md](aws_setup/CLOUDFRONT_SETUP.md)
- Note the distribution IDs for later

### Step 3: Set Up GitHub OIDC (10 minutes)

```bash
# 1. Edit aws_setup/github-trust-policy.json
# Replace:
#   - YOUR_AWS_ACCOUNT_ID (e.g., 123456789012)
#   - YOUR_GITHUB_USERNAME (e.g., johndoe)
#   - YOUR_REPOSITORY_NAME (e.g., my-site)

# 2. Edit aws_setup/github-permissions-policy.json
# Replace:
#   - YOUR_DEV_BUCKET (e.g., mycompany-dev)
#   - YOUR_PROD_BUCKET (e.g., mycompany-prod)

# 3. Create IAM role
aws iam create-role \
  --role-name GitHubActions-Jekyll-Deploy \
  --assume-role-policy-document file://aws_setup/github-trust-policy.json

# 4. Attach permissions
aws iam put-role-policy \
  --role-name GitHubActions-Jekyll-Deploy \
  --policy-name DeploymentPolicy \
  --policy-document file://aws_setup/github-permissions-policy.json

# 5. Get Role ARN (save this!)
aws iam get-role \
  --role-name GitHubActions-Jekyll-Deploy \
  --query 'Role.Arn' \
  --output text
```

### Step 4: Configure GitHub (3 minutes)

```bash
# Create GitHub repository
gh repo create my-site --public --source=. --remote=origin
git push -u origin main

# Create develop branch
git checkout -b develop
git push -u origin develop
```

**Add GitHub Secrets and Variables:**

Go to **Settings** → **Secrets and variables** → **Actions**

**Add Secret:**
- `AWS_ROLE_ARN` = (Role ARN from Step 3)

**Add Variables:**
- `S3_BUCKET_DEV` = `mycompany-dev`
- `S3_BUCKET_PROD` = `mycompany-prod`
- `CLOUDFRONT_DISTRIBUTION_ID_DEV` = (Your dev CloudFront ID)
- `CLOUDFRONT_DISTRIBUTION_ID_PROD` = (Your prod CloudFront ID)

### Step 5: Deploy! (2 minutes)

```bash
# Deploy to development
git checkout develop
git add .
git commit -m "Initial deployment"
git push origin develop

# Watch deployment in GitHub Actions tab
# Visit your CloudFront URL to see the site!

# When ready, deploy to production
git checkout main
git merge develop
git push origin main
```

## 🎉 You're Live!

Your site is now deployed with:
- ✅ Automated CI/CD pipeline
- ✅ Development and production environments
- ✅ CloudFront CDN for fast delivery
- ✅ Secure OIDC authentication
- ✅ Automatic cache invalidation

## 📚 Next Steps

1. **Customize Content**
   - Update all pages with your content
   - Add your products/services
   - Replace placeholder images
   - Follow [CHECKLIST.md](CHECKLIST.md)

2. **Add Custom Domain** (Optional)
   - Get SSL certificate from AWS Certificate Manager
   - Add custom domain to CloudFront
   - Update DNS records
   - Update `_config.yml` with your domain

3. **Enhance Your Site**
   - Add Google Analytics
   - Set up contact form (Formspree or similar)
   - Customize styles in `_sass/`
   - Add more pages as needed

## 🆘 Troubleshooting

**Build fails locally?**
```bash
bundle exec jekyll clean
bundle update
bundle exec jekyll build --verbose
```

**Deployment fails?**
- Check GitHub Actions logs
- Verify all secrets/variables are set
- Ensure AWS resources exist
- Review [aws_setup/AWS_OIDC_SETUP.md](aws_setup/AWS_OIDC_SETUP.md)

**CloudFront shows 403 error?**
- Verify CloudFront Function is configured
- Check S3 bucket policy allows CloudFront
- Review [aws_setup/CLOUDFRONT_SETUP.md](aws_setup/CLOUDFRONT_SETUP.md)

## 📖 Documentation

- [README.md](README.md) — Full documentation
- [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) — Detailed setup guide
- [CHECKLIST.md](CHECKLIST.md) — Complete setup checklist
- [DEPLOYMENT_GUIDE.md](.github/DEPLOYMENT_GUIDE.md) — CI/CD details
- [AWS_OIDC_SETUP.md](aws_setup/AWS_OIDC_SETUP.md) — Authentication setup
- [CLOUDFRONT_SETUP.md](aws_setup/CLOUDFRONT_SETUP.md) — CDN configuration

## 💡 Tips

- Always test on `develop` branch first
- Use pull requests for code review
- Keep dependencies updated with `bundle update`
- Monitor AWS costs (S3 + CloudFront)
- Back up your content regularly

---

**Need help?** Check the documentation or open an issue on GitHub.

🚀 **Happy deploying!**

