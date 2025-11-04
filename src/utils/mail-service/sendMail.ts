import nodemailer from 'nodemailer';
import { join } from 'path';
import { renderFile } from 'twig';

/**
 * Sends an email using Twig template
 * @param to Recipient email
 * @param subject Email subject
 * @param templateName Name of the twig template (without extension)
 * @param context parameters to pass into template
 */

export async function sendMail(
  from: string,
  to: string,
  subject: string,
  templateName: string,
  context: Record<string, any>,
) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: +(process.env.MAIL_PORT || 465),
    secure: true,
    auth: {
      user: process.env.MAIL_USER || 'default-user',
      pass: process.env.MAIL_PASS || 'default-pass',
    },
  });

  const templatePath = join(__dirname, 'templates', `${templateName}.twig`);

  const html = await new Promise<string>((resolve, reject) => {
    renderFile(templatePath, context, (err, result) => {
      if (err) return reject(err);
      resolve(result || '');
    });
  });

  const info = await transporter.sendMail({
    from: `${from} ${process.env.MAIL_USER}`,
    to,
    subject,
    html,
  });

  console.log(`Mail sent: ${info.messageId}`);
}
