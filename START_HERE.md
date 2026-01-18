# 👋 START HERE

Welcome to the Jekyll AWS Deployment Template!

## 🎯 What is This?

This is a **production-ready Jekyll template** configured for deployment to AWS S3 with CloudFront CDN and automated GitHub Actions CI/CD.

Perfect for:
- Business websites
- Product landing pages
- Company portfolios
- Professional services sites
- Marketing sites

## 🚦 Choose Your Path

### 🏃 I Want to Deploy Fast (30 minutes)
→ Read **[QUICKSTART.md](QUICKSTART.md)**

Quick 5-step process to get your site live on AWS.

### 📖 I Want Detailed Instructions
→ Read **[TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)**

Comprehensive setup guide with explanations.

### ✅ I Want a Checklist
→ Read **[CHECKLIST.md](CHECKLIST.md)**

Complete checklist to track your progress.

### 🤔 I Want to Understand Everything
→ Read **[README.md](README.md)**

Full documentation with all features and options.

## 📚 Documentation Overview

| Document | Purpose | Time |
|----------|---------|------|
| **QUICKSTART.md** | Fast deployment guide | 30 min |
| **TEMPLATE_SETUP.md** | Detailed setup instructions | 1 hour |
| **CHECKLIST.md** | Setup checklist | - |
| **README.md** | Complete documentation | - |
| **DEPLOYMENT_GUIDE.md** | CI/CD workflow details | - |
| **AWS_OIDC_SETUP.md** | AWS authentication setup | 15 min |
| **CLOUDFRONT_SETUP.md** | CDN configuration | 20 min |

## 🎯 What You'll Get

After setup, you'll have:
- ✅ Professional Jekyll website
- ✅ Hosted on AWS S3 + CloudFront
- ✅ Automated deployments via GitHub Actions
- ✅ Separate dev and production environments
- ✅ HTTPS with SSL certificate (optional)
- ✅ Custom domain support (optional)
- ✅ Fast global CDN delivery

## 💰 Estimated AWS Costs

For a typical small business site:
- **S3 Storage**: ~$0.50/month
- **CloudFront**: ~$1-5/month (depends on traffic)
- **Total**: ~$2-6/month

*First 12 months may be free under AWS Free Tier*

## 🛠️ Prerequisites

Before you start, make sure you have:
- [ ] Ruby 3.0+ installed
- [ ] Git installed
- [ ] AWS Account (with admin access)
- [ ] GitHub Account
- [ ] Basic command line knowledge
- [ ] Text editor (VS Code, Sublime, etc.)

## 🚀 Quick Commands

```bash
# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Clean build cache
bundle exec jekyll clean
```

## 📁 Key Files to Customize

1. **_config.yml** - Site configuration (company info, social links)
2. **_data/navigation.yml** - Menu items
3. **_data/features.yml** - Homepage features
4. **_data/testimonials.yml** - Customer reviews
5. **index.html** - Homepage content
6. **about.html** - About page
7. **contact.html** - Contact page
8. **_products/** - Your products/services

## 🎨 Customization

### Quick Customizations (10 minutes)
- Update company name and contact info
- Change navigation menu
- Update homepage content
- Add your logo

### Full Customizations (1-2 hours)
- Add products/services
- Update all pages
- Replace images
- Customize colors and fonts
- Add custom pages

## 🆘 Need Help?

### Common Issues
1. **Build fails**: Run `bundle exec jekyll clean && bundle update`
2. **Deployment fails**: Check GitHub Actions logs
3. **CloudFront 403**: Verify CloudFront Function is configured
4. **Images not showing**: Check file paths and names

### Documentation
- [Jekyll Docs](https://jekyllrb.com/docs/)
- [AWS S3 Docs](https://docs.aws.amazon.com/s3/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

### Template Issues
- Review [DEPLOYMENT_GUIDE.md](.github/DEPLOYMENT_GUIDE.md)
- Open an issue on GitHub

## 🎯 Recommended Workflow

1. **Day 1: Setup** (1 hour)
   - Clone template
   - Configure AWS
   - Set up GitHub
   - Deploy to dev

2. **Day 2-3: Customize** (2-4 hours)
   - Update content
   - Add products
   - Replace images
   - Test on dev

3. **Day 4: Launch** (1 hour)
   - Final review
   - Deploy to production
   - Configure custom domain (optional)
   - Announce launch!

## ✨ Pro Tips

1. **Always test on dev first** before deploying to production
2. **Use branches** for new features
3. **Commit often** with clear messages
4. **Optimize images** before uploading (use WebP)
5. **Monitor AWS costs** in the billing dashboard
6. **Keep dependencies updated** with `bundle update`

## 🎉 Ready to Start?

Choose your path above and let's get your site deployed!

**Recommended for beginners**: Start with [QUICKSTART.md](QUICKSTART.md)

**Recommended for experienced users**: Jump to [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)

---

**Questions?** Check the documentation or open an issue on GitHub.

**Good luck!** 🚀

