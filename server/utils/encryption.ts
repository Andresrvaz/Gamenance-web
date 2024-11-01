/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";

export const encryption = async (dataToEncrypt: string) => {
  try {
    const hash = await bcrypt.hash(dataToEncrypt, 10);
    return hash;
  } catch (err: any) {
    throw new Error(err);
  }
};
