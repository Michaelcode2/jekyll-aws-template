# Contact Form Configuration Walkthrough

Updated the contact form on `contact.html` to support Formspree with a modern AJAX-based submission flow.

## What Changed
- **Updated Form Action**: Pointed the form to Formspree service.
- **Added JavaScript**: Now the form submits without reloading the page. It shows a success or error message directly below the button.
- **Validation**: Added a check to alert you if you forget to replace the placeholder ID.

## Implementation Steps (REQUIRED)

1. Go to [https://formspree.io](https://formspree.io) and register/login.
2. Click **+ New Form**.
3. Name it "Company Website Contact" and add your company email (`{{ site.company.email }}`).
4. You will get a unique Endpoint URL, e.g., `https://formspree.io/f/mqkvojzb`.
5. Copy the 8-character code at the end (e.g., `mqkvojzb`).
6. Open `contact.html` and find line 61:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
7. Replace `YOUR_FORM_ID` with your actual code.

## Verification
Once deployed:
1. Open the contact page.
2. Fill out the form.
3. Click send.
4. You should see "Дякуємо! Ваше повідомлення успішно надіслано." in green.
5. Check your email inbox for the submission.
