// Email service that supports multiple providers

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  fromName?: string
}

interface EmailService {
  sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }>
}

// SendGrid implementation
class SendGridService implements EmailService {
  private apiKey: string
  private fromEmail: string
  private fromName: string

  constructor(apiKey: string, fromEmail: string, fromName: string) {
    this.apiKey = apiKey
    this.fromEmail = fromEmail
    this.fromName = fromName
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: Array.isArray(options.to)
                ? options.to.map(email => ({ email }))
                : [{ email: options.to }],
            },
          ],
          from: {
            email: options.from || this.fromEmail,
            name: options.fromName || this.fromName,
          },
          subject: options.subject,
          content: [
            {
              type: 'text/html',
              value: options.html,
            },
          ],
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error('SendGrid error:', error)
        return { success: false, error: 'Failed to send email' }
      }

      return { success: true }
    } catch (error) {
      console.error('SendGrid error:', error)
      return { success: false, error: 'Failed to send email' }
    }
  }
}

// AWS SES implementation
class SESService implements EmailService {
  private accessKeyId: string
  private secretAccessKey: string
  private region: string
  private fromEmail: string

  constructor(accessKeyId: string, secretAccessKey: string, region: string, fromEmail: string) {
    this.accessKeyId = accessKeyId
    this.secretAccessKey = secretAccessKey
    this.region = region
    this.fromEmail = fromEmail
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
    // Note: This is a simplified implementation. For production, use AWS SDK
    console.log('AWS SES would send email:', options)
    return { success: false, error: 'AWS SES implementation requires AWS SDK' }
  }
}

// Mailgun implementation
class MailgunService implements EmailService {
  private apiKey: string
  private domain: string
  private fromEmail: string

  constructor(apiKey: string, domain: string, fromEmail: string) {
    this.apiKey = apiKey
    this.domain = domain
    this.fromEmail = fromEmail
  }

  async sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
    try {
      const formData = new FormData()
      formData.append('from', `${options.fromName || 'Sagestone'} <${options.from || this.fromEmail}>`)
      
      const recipients = Array.isArray(options.to) ? options.to : [options.to]
      recipients.forEach(email => formData.append('to', email))
      
      formData.append('subject', options.subject)
      formData.append('html', options.html)
      if (options.text) {
        formData.append('text', options.text)
      }

      const response = await fetch(
        `https://api.mailgun.net/v3/${this.domain}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(`api:${this.apiKey}`).toString('base64')}`,
          },
          body: formData,
        }
      )

      if (!response.ok) {
        const error = await response.text()
        console.error('Mailgun error:', error)
        return { success: false, error: 'Failed to send email' }
      }

      return { success: true }
    } catch (error) {
      console.error('Mailgun error:', error)
      return { success: false, error: 'Failed to send email' }
    }
  }
}

// Console logger for development
class ConsoleEmailService implements EmailService {
  async sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
    console.log('=== EMAIL WOULD BE SENT ===')
    console.log('To:', options.to)
    console.log('Subject:', options.subject)
    console.log('HTML:', options.html)
    console.log('Text:', options.text || '(none)')
    console.log('===========================')
    return { success: true }
  }
}

// Email service factory
function createEmailService(): EmailService {
  const emailService = process.env.EMAIL_SERVICE?.toLowerCase()
  
  switch (emailService) {
    case 'sendgrid':
      if (!process.env.SENDGRID_API_KEY) {
        console.warn('SENDGRID_API_KEY not set, using console logger')
        return new ConsoleEmailService()
      }
      return new SendGridService(
        process.env.SENDGRID_API_KEY,
        process.env.EMAIL_FROM || 'noreply@sagestone.app',
        process.env.EMAIL_FROM_NAME || 'Sagestone'
      )
    
    case 'ses':
      if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        console.warn('AWS credentials not set, using console logger')
        return new ConsoleEmailService()
      }
      return new SESService(
        process.env.AWS_ACCESS_KEY_ID,
        process.env.AWS_SECRET_ACCESS_KEY,
        process.env.AWS_REGION || 'us-east-1',
        process.env.EMAIL_FROM || 'noreply@sagestone.app'
      )
    
    case 'mailgun':
      if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.warn('Mailgun credentials not set, using console logger')
        return new ConsoleEmailService()
      }
      return new MailgunService(
        process.env.MAILGUN_API_KEY,
        process.env.MAILGUN_DOMAIN,
        process.env.EMAIL_FROM || 'noreply@sagestone.app'
      )
    
    default:
      console.log('No email service configured, using console logger')
      return new ConsoleEmailService()
  }
}

// Email templates
export function getWelcomeEmailTemplate(firstName: string): { subject: string; html: string; text: string } {
  return {
    subject: 'Welcome to Sagestone!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Sagestone</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: #2563eb; margin: 0; font-size: 28px;">Welcome to Sagestone! 🎉</h1>
          </div>
          
          <div style="padding: 20px 0;">
            <p style="font-size: 16px; margin-bottom: 20px;">Hi ${firstName},</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thank you for signing up for Sagestone! We're excited to have you on board.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              You now have access to powerful marketing automation and CRM tools to help grow your business:
            </p>
            
            <ul style="font-size: 16px; margin-bottom: 20px; line-height: 1.8;">
              <li>Contact Management & CRM</li>
              <li>Email & SMS Campaigns</li>
              <li>Marketing Automation</li>
              <li>Landing Pages & Funnels</li>
              <li>Custom Forms</li>
              <li>Sales Pipelines</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
                 style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
                Go to Dashboard
              </a>
            </div>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              If you have any questions or need help getting started, feel free to reach out to our support team.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 10px;">
              Best regards,<br>
              <strong>The Sagestone Team</strong>
            </p>
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; font-size: 14px; color: #6b7280; text-align: center;">
            <p>© ${new Date().getFullYear()} Sagestone. All rights reserved.</p>
            <p>
              <a href="${process.env.NEXT_PUBLIC_MARKETING_URL || 'http://localhost:3000'}" style="color: #2563eb; text-decoration: none;">Visit our website</a>
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Welcome to Sagestone! 🎉

Hi ${firstName},

Thank you for signing up for Sagestone! We're excited to have you on board.

You now have access to powerful marketing automation and CRM tools to help grow your business:

- Contact Management & CRM
- Email & SMS Campaigns
- Marketing Automation
- Landing Pages & Funnels
- Custom Forms
- Sales Pipelines

Get started by visiting your dashboard: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard

If you have any questions or need help getting started, feel free to reach out to our support team.

Best regards,
The Sagestone Team

© ${new Date().getFullYear()} Sagestone. All rights reserved.
Visit our website: ${process.env.NEXT_PUBLIC_MARKETING_URL || 'http://localhost:3000'}
    `.trim(),
  }
}

// Main email sending function
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  const emailService = createEmailService()
  return emailService.sendEmail(options)
}

// Convenience function to send welcome email
export async function sendWelcomeEmail(email: string, firstName: string): Promise<{ success: boolean; error?: string }> {
  const template = getWelcomeEmailTemplate(firstName)
  return sendEmail({
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  })
}
