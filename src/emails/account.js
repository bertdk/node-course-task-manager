const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const from = "bertdk10@gmail.com";
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from,
    subject: "Thanks for joining",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const cancelationMail = (email, name) => {
  sgMail.send({
    to: email,
    from,
    subject: "Goodbye",
    text: `Bye bye ${name}`,
  });
};

module.exports = {
  sendWelcomeEmail,
  cancelationMail,
};
