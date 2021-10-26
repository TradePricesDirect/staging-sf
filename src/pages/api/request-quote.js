import nodemailer from "nodemailer";
import emailTemplate from "emails/quoteSubmission.mjml";

const handler = async (req, res) => {
  switch (req.method) {
    // Send a quote submission
    case "POST":
      const { email } = req.body;

      if (!email) {
        res.status(400).end();
        return;
      }

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });

      // send mail with defined transport object
      try {
        await transporter.sendMail({
          to: process.env.ADMIN_EMAIL,
          from: process.env.EMAIL_FROM,
          subject: "Trade Prices Direct - Request a Quote",
          html: html(req.body),
        });

        res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);

        res.status(400).end();
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

const html = (data) => {
  let template = emailTemplate;

  template = template.replace("[firstName]", data.firstName);
  template = template.replace("[lastName]", data.lastName);
  template = template.replace("[email]", data.email);
  template = template.replace("[phone]", data.phone);

  template = template.replace("[type]", data.type);
  template = template.replace("[timeframe]", data.timeframe);
  template = template.replace("[finance]", data.finance);

  return template;
};
