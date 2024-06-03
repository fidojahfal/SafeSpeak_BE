import transporter from '../mails/config.js';
import templateMail from '../mails/template.js';

async function sendEmail(role, email) {
  let message;
  role
    ? (message = {
        from: '<safespeakteams>@gmail.com',
        to: email,
        subject: 'Your reports',
        html: templateMail,
      })
    : (message = {
        from: '<safespeakteams>@gmail.com',
        to: email,
        subject: 'Your reports',
        html: templateMail,
      });
  try {
    await transporter.sendMail(message);
  } catch (error) {
    return res.status(500).json({ message: 'Could not send report email!' });
  }
}

export default sendEmail;
