import nodemailer from "nodemailer";

export async function sendActivationLink(recipient, activationLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipient,
    subject: "Account activation (recipes app)",
    text: "",
    html: `
    <div>
        <h1>Click this link to activate your account</h1>
        <a href="${activationLink}">${activationLink}</a>
    </div>
`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
