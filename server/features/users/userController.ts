/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../models/User";
import { reqType, resType } from "../../config/types";
import { UnverifiedAccount } from "../../models/unverifiedAccounts";
import { Email, emailSender } from "../../utils/mailgun/emailSender";
import { encryption } from "../../utils/encryption";

interface UserInfo {
  name: string;
  secondaryName?: string;
  lastName: string;
  secondaryLastName?: string;
  email: string;
}

interface VerificationData {
  registerId: string;
  password: string;
}

export const registerUser = async (
  req: reqType,
  res: resType,
): Promise<any> => {
  const userInfo: UserInfo = req.body?.userInfo;

  try {
    const existingUserInfo = await User.findOne({
      where: { email: userInfo.email },
    });

    const existsUnverified = await UnverifiedAccount.findOne({
      where: { email: userInfo.email },
    });

    if (!existingUserInfo && !existsUnverified) {
      await UnverifiedAccount.upsert({
        ...userInfo,
        where: { email: userInfo?.email },
      });

      const unverifiedAccount = await UnverifiedAccount.findOne({
        where: { email: userInfo.email },
      });

      if (unverifiedAccount) {
        const email: Email = {
          recipients: [unverifiedAccount?.email],
          subject: "Validate your email",
          text: `Please verify your email and create your password in the next link localhost:3000/api/v1/user-verify?=${unverifiedAccount.registerId}`,
          html: "",
        };

        try {
          await emailSender(email);
        } catch (e: any) {
          await UnverifiedAccount.destroy({
            where: { email: unverifiedAccount?.email },
            force: true,
          });
          throw Error(`Error in sending email: ${e.message}`);
        }
      }
    } else {
      throw new Error("User already exists");
    }
    return res.status(200).json({ message: "User registered successfully" });
  } catch (e) {
    const error = e as Error;
    return res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req: reqType, res: resType) => {
  const verificationData = req.body as VerificationData;
  const { registerId, password: unhashedPassword } = verificationData;

  try {
    const userInfo = await UnverifiedAccount.findOne({
      where: {
        registerId,
      },
    });

    if (!userInfo) throw Error(`Invalid verify token`);

    const { firstName, secondaryName, lastName, secondaryLastName, email } =
      userInfo;

    const hashedPassword = await encryption(unhashedPassword);

    try {
      const userCreateResponse = await User.create({
        firstName,
        secondaryName,
        lastName,
        secondaryLastName,
        email,
        password: hashedPassword,
      });

      if (userCreateResponse) {
        await UnverifiedAccount.destroy({
          where: { email: userCreateResponse.email },
          force: true,
        });
      }

      res.status(200).json({ message: "User verified succesffuly" });
    } catch (e) {
      const error = e as any;
      throw Error(error.message);
    }
  } catch (e) {
    const error = e as Error;
    res
      .status(500)
      .json({ message: `Unable to verify user: ${error.message}` });
  }
};
