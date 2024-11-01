import Mailgun from "mailgun.js";
import FormData from "form-data";
import "dotenv/config";
const mailgunAPI = process.env.MAILGUN_API as string;
const mailgunKey = process.env.MAILGUN_KEY as string;

const mailgun = new Mailgun(FormData);
export const mgService = mailgun.client({
  username: mailgunAPI,
  key: mailgunKey,
});
