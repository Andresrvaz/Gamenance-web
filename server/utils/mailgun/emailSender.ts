/* eslint-disable @typescript-eslint/no-explicit-any */
import { mgService } from "./config";

export interface Email {
  recipients: string[];
  subject: string;
  text: string;
  html: string;
}

export const emailSender = async (email: Email) => {
  try {
    await mgService.messages.create(
      "sandbox92efb03e170b498ea4990e8376c927da.mailgun.org",
      {
        from: "Gamenance <gamenance@info.com>",
        to: email.recipients,
        subject: email.subject,
        text: email.text,
        html: email.html,
      },
    );
    return true;
  } catch (err) {
    throw Error(err as unknown as any);
  }
};
