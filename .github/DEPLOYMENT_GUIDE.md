# Deployment Guide

This guide explains how the CI/CD deployment pipeline works in this Jekyll template.

## 🔄 Workflow Overview

This template includes three GitHub Actions workflows:

### 1. Build Test (`build-test.yml`)
- **Triggers**: Pull requests to `main` or `develop`, pushes to feature branches
- **Purpose**: Validates that the site builds correctly
- **Actions**: 
  - Installs dependencies
  - Builds Jekyll site
  - Runs basic link checks
  - Verifies HTML structure

### 2. Development Deployment (`deploy-dev.yml`)
- **Triggers**: Pushes to `develop` branch
- **Purpose**: Deploys to development environment
- **Actions**:
  - Builds site with dev configuration
  - Deploys to dev S3 bucket
  - Invalidates dev CloudFront cache
- **Environment**: `development`

### 3. Production Deployment (`deploy-prod.yml`)
- **Triggers**: Pushes to `main` branch
- **Purpose**: Deploys to production environment
- **Actions**:
  - Builds optimized production site
  - Deploys to production S3 bucket with optimized caching
  - Invalidates production CloudFront cache
- **Environment**: `production`

## 🔐 Authentication

All workflows use AWS OIDC authentication (OpenID Connect):
- No long-lived AWS access keys required
- Temporary credentials issued per deployment
- More secure than storing access keys in GitHub secrets

## 📦 Deployment Process

### Development Deployment

```bash
# Make changes on develop branch
git checkout develop
git add .
git commit -m "Your changes"
git push origin develop
```

This will:
1. ✅ Trigger the deploy-dev workflow
2. 🏗️ Build the site with development config
3. ☁️ Upload to dev S3 bucket
4. ♻️ Invalidate CloudFront cache
5. 🌐 Site available at your dev URL

### Production Deployment

```bash
# Merge to main when ready
git checkout main
git merge develop
git push origin main
```

This will:
1. ✅ Trigger the deploy-prod workflow
2. 🏗️ Build optimized production site
3. ☁️ Upload to prod S3 bucket
4. ♻️ Invalidate CloudFront cache
5. 🌐 Site available at your production domain

## 🎯 Deployment Strategy

### Cache Control

**Development:**
- All files: `max-age=3600` (1 hour)
- Quick updates for testing

**Production:**
- Static assets (CSS, JS, images): `max-age=31536000, immutable` (1 year)
- HTML/XML/JSON: `max-age=3600, must-revalidate` (1 hour)
- Optimized for performance

### Build Environments

**Development (`JEKYLL_ENV=development`):**
- Expanded CSS (not minified)
- Verbose output
- Draft posts enabled
- Future posts enabled

**Production (`JEKYLL_ENV=production`):**
- Minified CSS
- Optimized assets
- No drafts
- No future posts

## 🔧 Configuration

### Required GitHub Secrets

| Secret | Description | Example |
|--------|-------------|---------|
| `AWS_ROLE_ARN` | IAM Role ARN for OIDC | `arn:aws:iam::123456789012:role/GitHubActions-Jekyll-Deploy` |

### Required GitHub Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `S3_BUCKET_DEV` | Dev S3 bucket name | `mycompany-dev` |
| `S3_BUCKET_PROD` | Prod S3 bucket name | `mycompany-prod` |
| `CLOUDFRONT_DISTRIBUTION_ID_DEV` | Dev CloudFront ID | `E1234EXAMPLE` |
| `CLOUDFRONT_DISTRIBUTION_ID_PROD` | Prod CloudFront ID | `E5678EXAMPLE` |

### Environment Settings (Optional but Recommended)

Create GitHub environments for additional security:

**Development Environment:**
- No protection rules (auto-deploy)
- Can be accessed from `develop` branch

**Production Environment:**
- Required reviewers (recommended)
- Deployment branch limited to `main`
- Approval required before deployment

## 📊 Monitoring Deployments

### View Deployment Status

1. Go to **Actions** tab in GitHub
2. Select the workflow run
3. View detailed logs for each step

### Successful Deployment Indicators

- ✅ Green checkmark on workflow
- 📦 Files synced to S3
- ♻️ CloudFront invalidation created
- 📊 Deployment summary with details

### Troubleshooting Failed Deployments

**Build Fails:**
```bash
# Test locally first
bundle exec jekyll build --verbose
```

**Authentication Fails:**
- Verify `AWS_ROLE_ARN` is correct
- Check trust policy includes your repository
- Ensure OIDC provider exists in AWS

**S3 Sync Fails:**
- Verify bucket names in GitHub variables
- Check IAM role has S3 permissions
- Ensure buckets exist

**CloudFront Invalidation Fails:**
- Verify distribution IDs are correct
- Check IAM role has CloudFront permissions
- Ensure distributions are deployed

## 🚀 Manual Deployment (If Needed)

If you need to deploy manually:

```bash
# Build the site
JEKYLL_ENV=production bundle exec jekyll build

# Configure AWS CLI
aws configure

# Sync to S3
aws s3 sync _site/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## 🔄 Rollback Procedure

If you need to rollback a deployment:

1. **Quick rollback**: Revert the commit and push
```bash
git revert HEAD
git push origin main
```

2. **Full rollback**: Reset to previous commit
```bash
git reset --hard HEAD^
git push --force origin main  # Use with caution!
```

3. **Manual rollback**: Deploy previous version manually

## 📝 Best Practices

1. **Always test on dev first** before deploying to production
2. **Use pull requests** for code review
3. **Tag releases** for production deployments
4. **Monitor CloudWatch** for S3 and CloudFront metrics
5. **Check deployment logs** after each deployment
6. **Keep dependencies updated** with `bundle update`
7. **Test builds locally** before pushing

## 🆘 Getting Help

- Review workflow logs in GitHub Actions
- Check [AWS_OIDC_SETUP.md](../aws_setup/AWS_OIDC_SETUP.md) for auth issues
- Check [CLOUDFRONT_SETUP.md](../aws_setup/CLOUDFRONT_SETUP.md) for CDN issues
- Verify all secrets and variables are set correctly

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/)
- [Jekyll Build Documentation](https://jekyllrb.com/docs/configuration/)

---

✅ With this setup, you have a fully automated, secure, and efficient deployment pipeline!

