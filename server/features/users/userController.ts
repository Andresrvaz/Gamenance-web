import { User } from "../../models/User";
import { reqType, resType } from "../../config/types";

interface UserInfo {
    name: string,
    lastName: string,
    email: string,
    password: string,
}

export const registerUser = async (req: reqType, res: resType) => {

    const userInfo: UserInfo = req.body?.userInfo;


    console.log('%c⧭ userInfo', 'color: #917399', userInfo);

    console.log('%c⧭', 'color: #00bf00', 'hello the request is getting here');

    await User.upsert({
        userInfo,
        where: { email: userInfo?.email }
    });
}