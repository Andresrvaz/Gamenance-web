/* eslint-disable @typescript-eslint/no-explicit-any */
import routeValidator from "../../utils/routeValidator";

export default {
  register: routeValidator({
    userInfo: {
      isObject: {
        errorMessage: "userInfo must be an object",
      },
      exists: {
        errorMessage: "userInfo is required",
      },
      custom: {
        options: (value: any) => {
          if (!value.email) {
            throw new Error("Email is required");
          }
          return true;
        },
      },
    },
    "userInfo.email": {
      isEmail: {
        errorMessage: "Email must be a valid email",
      },
      normalizeEmail: true,
    },
    "userInfo.firstName": {
      exists: {
        errorMessage: "First name is required",
      },
      isString: {
        errorMessage: "Name must be a string",
      },
    },
    "userInfo.secondaryName": {
      custom: {
        options: (value: any) => {
          if (value) {
            if (!(typeof value === "string")) {
              throw new Error("secondary last name should be a string");
            }
            return true;
          }
          return true;
        },
      },
    },
    "userInfo.lastName": {
      exists: {
        errorMessage: "Last name is required",
      },
      isString: {
        errorMessage: "Last Name must be a string",
      },
    },
    "userInfo.secondaryLastName": {
      custom: {
        options: (value: any) => {
          if (value) {
            if (!(typeof value === "string")) {
              throw new Error("secondary last name should be a string");
            }
            return true;
          }
          return true;
        },
      },
    },
  }),
  verify: routeValidator({
    registerId: {
      exists: {
        errorMessage: "Verify token is required",
      },
      isString: {
        errorMessage: "Verify token must be a string",
      },
    },
    password: {
      exists: {
        errorMessage: "Password is required",
      },
      isLength: {
        options: { min: 6 },
        errorMessage: "Password must be at least 6 characters long",
      },
    },
  }),
};
