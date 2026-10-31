const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'imovies_test@ethereal.email',
    pass: process.env.EMAIL_PASS || 'imovies_password'
  }
});

const verifyTransport = async () => {
  try {
    // Only verify if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'notifications@imovies.com') {
      await transporter.verify();
      console.log('📧 Mailer transport verified successfully');
    } else {
      console.log('📧 Mailer initialized in mock/development mode');
    }
  } catch (error) {
    console.warn('⚠️ Mailer transport connection warning:', error.message);
  }
};

const sendMail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  transporter,
  verifyTransport,
  sendMail
};
