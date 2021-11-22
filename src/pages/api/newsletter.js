const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const LIST_ID = "9801fc6a8d";

const handler = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await mailchimp.lists.addListMember(LIST_ID, {
      email_address: email,
      status: "subscribed",
    });

    res.json(response);
  } catch (error) {
    res.status(200).end();
  }
};

export default handler;
