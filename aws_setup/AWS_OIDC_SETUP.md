# AWS OIDC Setup Guide for GitHub Actions

This guide explains how to set up AWS OIDC authentication for GitHub Actions, eliminating the need for long-lived AWS access keys.

## 🔐 Why OIDC?

- **No access keys in GitHub secrets** - more secure
- **Temporary credentials** - auto-expiring sessions
- **Fine-grained permissions** - specific to your repository
- **Audit trail** - better tracking in AWS CloudTrail

## 📋 Prerequisites

- AWS Account with admin access
- GitHub repository: `Jekyll-intellect-prro`
- AWS CLI installed (for setup)

## 🚀 Setup Steps

### 1. Create GitHub OIDC Provider in AWS

If you haven't already created a GitHub OIDC provider in your AWS account:

```bash
# This only needs to be done once per AWS account
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

**Note:** The thumbprint above is the current GitHub OIDC thumbprint. Verify it's still current.

### 2. Update Trust Policy

Edit `github-trust-policy.json` and replace:
- `YOUR_AWS_ACCOUNT_ID` - your AWS account ID
- `YOUR_GITHUB_USERNAME` - your GitHub username (e.g., `Michaelcode2`)

Example:
```json
"Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
"token.actions.githubusercontent.com:sub": "repo:Michaelcode2/Jekyll-intellect-prro:*"
```

### 3. Update Permissions Policy

Edit `github-permissions-policy.json` and replace:
- `YOUR_DEV_BUCKET` - name of your dev S3 bucket
- `YOUR_PROD_BUCKET` - name of your prod S3 bucket

Example:
```json
"arn:aws:s3:::intellect-prro-dev"
"arn:aws:s3:::intellect-prro-prod"
```

### 4. Create IAM Role

Create the IAM role with the trust policy:

```bash
# Create the role
aws iam create-role \
  --role-name GitHubActions-Jekyll-PRRO \
  --assume-role-policy-document file://github-trust-policy.json \
  --description "Role for GitHub Actions to deploy Jekyll site"

# Attach the permissions policy
aws iam put-role-policy \
  --role-name GitHubActions-Jekyll-PRRO \
  --policy-name GitHubActionsDeploymentPolicy \
  --policy-document file://github-permissions-policy.json
```

### 5. Get the Role ARN

```bash
aws iam get-role \
  --role-name GitHubActions-Jekyll-PRRO \
  --query 'Role.Arn' \
  --output text
```

This will output something like:
```
arn:aws:iam::123456789012:role/GitHubActions-Jekyll-PRRO
```

### 6. Configure GitHub Secrets and Variables

In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**.

#### Required Secrets:

Add these under the **Secrets** tab:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `AWS_ROLE_ARN` | `arn:aws:iam::YOUR_ACCOUNT:role/GitHubActions-Jekyll-PRRO` | IAM Role ARN from step 5 |

#### Required Variables:

Add these under the **Variables** tab:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `S3_BUCKET_DEV` | `intellect-prro-dev` | Development S3 bucket name |
| `S3_BUCKET_PROD` | `intellect-prro-prod` | Production S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID_DEV` | `E1234EXAMPLE` | Dev CloudFront distribution ID |
| `CLOUDFRONT_DISTRIBUTION_ID_PROD` | `E5678EXAMPLE` | Prod CloudFront distribution ID |

**Note:** You no longer need `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, or `AWS_REGION` (region is in workflow).

### 7. Create GitHub Environments (Optional but Recommended)

For better security, create environments in GitHub:

1. Go to **Settings** → **Environments**
2. Create `development` environment
3. Create `production` environment
4. For production, add protection rules:
   - Required reviewers
   - Deployment branches: only `main`

## 🧪 Testing

Test the setup with a manual workflow run:

```bash
# Push to develop branch
git checkout develop
git push origin develop

# Or trigger manually from GitHub Actions UI
```

## 🔍 Verification

Check that the deployment works:

1. Go to **Actions** tab in GitHub
2. View the workflow run
3. Check for successful authentication:
   ```
   ✅ Configured AWS credentials
   ✅ Deployed to S3
   ✅ Invalidated CloudFront
   ```

## 🛠️ Troubleshooting

### Error: "Not authorized to perform sts:AssumeRoleWithWebIdentity"

**Solution:** Check that:
- OIDC provider exists in IAM
- Trust policy has correct repository name
- Role ARN is correct in GitHub secrets

### Error: "Access Denied" when syncing to S3

**Solution:** Verify:
- Permissions policy includes correct bucket ARNs
- Bucket names in GitHub secrets match policy
- Role has the permissions policy attached

### Error: "InvalidClientTokenId"

**Solution:**
- Ensure `permissions.id-token: write` is in workflow
- Check that OIDC provider thumbprint is correct

## 📚 Additional Resources

- [AWS OIDC with GitHub Actions](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [AWS IAM OIDC Providers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)

## 🔒 Security Best Practices

1. **Use separate roles** for dev and prod if needed
2. **Restrict permissions** to only what's needed
3. **Enable CloudTrail** to audit role usage
4. **Use environments** in GitHub for production approvals
5. **Rotate OIDC thumbprints** if GitHub updates them

---

✅ Once configured, your workflows will use temporary credentials and no long-lived access keys!

