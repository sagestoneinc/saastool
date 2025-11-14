# Email Notification Setup Guide

This guide explains how to set up email notifications for the Sagestone SaaS platform.

## Overview

The application includes a flexible email service that supports multiple email providers:
- **SendGrid** (recommended for most users)
- **AWS SES** (recommended for AWS infrastructure)
- **Mailgun** (alternative option)
- **Console Logger** (development mode - no configuration needed)

## Email Features

Currently, the following email notifications are implemented:
- **Welcome Email**: Sent automatically when a user signs up

## Development Mode (No Configuration Required)

If you don't configure an email service, emails will be logged to the console. This is perfect for development and testing.

Example console output:
```
=== EMAIL WOULD BE SENT ===
To: user@example.com
Subject: Welcome to Sagestone!
HTML: <html>...</html>
===========================
```

## Production Setup

### Option 1: SendGrid (Recommended)

SendGrid is easy to set up and has a generous free tier (100 emails/day).

1. **Sign up for SendGrid**:
   - Visit [https://sendgrid.com](https://sendgrid.com)
   - Create a free account

2. **Create an API Key**:
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Give it a name (e.g., "Sagestone Production")
   - Select "Full Access" or "Restricted Access" with Mail Send permission
   - Copy the API key (you won't be able to see it again)

3. **Verify Sender Email** (important!):
   - Go to Settings → Sender Authentication
   - Verify a single sender email address OR
   - Set up domain authentication for better deliverability

4. **Add to your `.env` file**:
   ```env
   EMAIL_SERVICE="sendgrid"
   SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   EMAIL_FROM="noreply@yourdomain.com"
   EMAIL_FROM_NAME="Your Company Name"
   ```

### Option 2: AWS SES

AWS Simple Email Service is cost-effective and integrates well with AWS infrastructure.

1. **Set up AWS SES**:
   - Log in to AWS Console
   - Navigate to Amazon SES
   - Verify your sender email or domain
   - Request production access (initially in sandbox mode)

2. **Create IAM credentials**:
   - Go to IAM → Users → Create User
   - Attach policy: `AmazonSESFullAccess` (or create custom policy)
   - Create access key
   - Save the Access Key ID and Secret Access Key

3. **Add to your `.env` file**:
   ```env
   EMAIL_SERVICE="ses"
   AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
   AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
   AWS_REGION="us-east-1"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

### Option 3: Mailgun

Mailgun offers reliable email delivery with a pay-as-you-go model.

1. **Sign up for Mailgun**:
   - Visit [https://mailgun.com](https://mailgun.com)
   - Create an account

2. **Get API credentials**:
   - Go to Settings → API Keys
   - Copy your Private API Key
   - Note your sandbox domain or add your own domain

3. **Add to your `.env` file**:
   ```env
   EMAIL_SERVICE="mailgun"
   MAILGUN_API_KEY="your-api-key-here"
   MAILGUN_DOMAIN="mg.yourdomain.com"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

## Digital Ocean Deployment

When deploying to Digital Ocean:

1. Go to your app → Settings → Environment Variables
2. Add the email service variables as environment variables
3. Mark sensitive values (like API keys) as "Secret"
4. Redeploy your app for changes to take effect

## Vercel Deployment

When deploying to Vercel:

1. Go to your project → Settings → Environment Variables
2. Add the email service variables
3. Select the appropriate environments (Production, Preview, Development)
4. Redeploy your app

## Testing Email Setup

After configuring your email service:

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Test the signup flow**:
   - Navigate to `http://localhost:3000/auth/signup`
   - Create a test account
   - Check your email inbox for the welcome email

3. **Check logs**:
   - If using console logger, check your terminal
   - If using a real service, check the provider's dashboard for delivery status

## Troubleshooting

### Emails not sending with SendGrid
- Verify your sender email address in SendGrid settings
- Check that your API key has "Mail Send" permission
- Look for error messages in your application logs
- Check SendGrid's Activity Feed for failed sends

### Emails not sending with AWS SES
- Ensure you're out of sandbox mode (or sending to verified email addresses)
- Check IAM permissions for your access key
- Verify your sender email or domain in SES
- Check your AWS SES sending limits

### Emails not sending with Mailgun
- Verify your domain in Mailgun settings
- If using sandbox domain, add authorized recipients
- Check your API key is correct
- Look at Mailgun's logs for failed sends

### General troubleshooting
- Check application logs for error messages
- Verify environment variables are set correctly
- Make sure you've restarted the app after adding env variables
- Test with a verified email address first

## Email Templates

The welcome email template is located in `lib/email.ts` in the `getWelcomeEmailTemplate` function. You can customize:
- Subject line
- HTML content
- Plain text content
- Branding and styling

To modify the template, edit the function and restart your application.

## Future Email Features

Planned email notifications:
- Password reset emails
- Workspace invitation emails
- Campaign notifications
- Activity digests
- Billing notifications

## Support

For additional help:
- Check the main README.md for general setup instructions
- Review the .env.example file for configuration examples
- Contact support: support@sagestone.dev
