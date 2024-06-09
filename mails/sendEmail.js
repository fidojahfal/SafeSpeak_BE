import transporter from '../mails/config.js';
import templateMailSiswa from '../mails/templateSiswa.js';
import templateMailDosen from './templateDosen.js';

async function sendEmail({ role, email, status = 0, name = '' }) {
  let message;
  role
    ? (message = {
        from: '"SafeSpeak" <noreply@safespeak.my.id>',
        to: email,
        subject: 'Your reports',
        html: name ? templateMailDosen(name) : templateMailDosen(),
      })
    : (message = {
        from: '"SafeSpeak" <noreply@safespeak.my.id>',
        to: email,
        subject: 'Your reports',
        html: templateMailSiswa(status),
      });
  try {
    await transporter.sendMail(message);
  } catch (error) {
    return res.status(500).json({ message: 'Could not send report email!' });
  }
}

export default sendEmail;
