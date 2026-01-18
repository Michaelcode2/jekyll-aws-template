# AWS CloudFront + S3 OAC Setup Guide

This guide explains how to set up **CloudFront** with **S3 Origin Access Control (OAC)** for hosting your Jekyll site. This is the most secure and cost-effective way to host static sites on AWS.

## 🚀 Why this setup?

- **Security**: Your S3 bucket remains **private**. No direct public access.
- **HTTPS**: Free SSL certificates via AWS Certificate Manager (ACM).
- **Cost**: CloudFront caching reduces S3 "GET" request costs.
- **Performance**: Global delivery via AWS edge locations.

---

## 🛠️ Step 1: Create the CloudFront Function

Jekyll uses "pretty URLs" (e.g., `/about/` instead of `/about.html`). S3 REST API (OAC) doesn't automatically map `/about/` to `/about/index.html`. We use a **CloudFront Function** to fix this.

1.  In the AWS Console, go to **CloudFront** -> **Functions**.
2.  Click **Create function**.
3.  Name it `JekyllIndexHandler`.
4.  Paste the following code into the **Function code** tab:

```javascript
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    
    // 1. Append index.html to directory requests (e.g., /about/ -> /about/index.html)
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } 
    // 2. Append index.html to paths without extensions (e.g., /about -> /about/index.html)
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    
    return request;
}
```

5.  Click **Save changes**.
6.  Go to the **Publish** tab and click **Publish function**.

---

## 🔗 Step 2: Associate the Function

Now you must tell your CloudFront Distribution to use this function.

1.  Go to **CloudFront** -> **Distributions**.
2.  Select your distribution.
3.  Go to the **Behaviors** tab.
4.  Select the **Default (*)** behavior and click **Edit**.
5.  Scroll down to the **Function associations** section.
6.  For **Viewer request**:
    - **Function type**: Select `CloudFront Function`.
    - **Function ARN/Name**: Select `JekyllIndexHandler`.
7.  Click **Save changes**.

---

## 🔒 Step 3: S3 Origin Access Control (OAC)

Ensure your S3 bucket is private and only accessible by CloudFront.

1.  In your CloudFront distribution, go to the **Origins** tab.
2.  Select your S3 origin and click **Edit**.
3.  Ensure **Origin access** is set to **Origin access control settings (recommended)**.
4.  If you haven't created one, click **Create control setting** and use the default settings.
5.  **CRITICAL**: Copy the **Policy** provided by CloudFront.
6.  Go to your **S3 Bucket** -> **Permissions** -> **Bucket policy**.
7.  Paste the policy. It should look like this:

```json
{
    "Version": "2012-10-17",
    "Statement": {
        "Sid": "AllowCloudFrontServicePrincipalReadOnly",
        "Effect": "Allow",
        "Principal": {
            "Service": "cloudfront.amazonaws.com"
        },
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::your-bucket-name/*",
        "Condition": {
            "StringEquals": {
                "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
            }
        }
    }
}
```

8.  Ensure **Block all public access** is turned **ON** for your S3 bucket.

---

## 🧪 Step 4: Verification

1.  Wait for the CloudFront distribution to finish deploying (Status: `Enabled`).
2.  Clear your browser cache or use Incognito mode.
3.  Visit your CloudFront domain (e.g., `https://dxxxxx.cloudfront.net`).
4.  Test internal links like `/about/` or `/products/`. They should now load correctly without a 403 error.


---

## 🚫 Step 5: Custom Error Pages (404)

Since this is a Single Page Application (SPA) / Static Site, errors are handled by CloudFront. You need to tell CloudFront to serve your `404.html` when a page is missing.

1.  Go to your **CloudFront Distribution** -> **Error pages** tab.
2.  Click **Create custom error response**.
3.  **HTTP error code**: Select `403: Forbidden` (S3 returns 403 for missing private files) **AND/OR** `404: Not Found` (if configured differently). A safe bet is to configure both separately.
    *   **Recommendation**: S3 often returns 403 for missing objects when effectively private.
4.  **Customize error response**: Select **Yes**.
5.  **Response page path**: `/404.html`
6.  **HTTP Response Code**: `404: Not Found`
7.  Click **Create custom error response**.

*Repeat for both 403 and 404 error codes if you want to be sure.*
