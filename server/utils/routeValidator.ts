/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkSchema, validationResult } from "express-validator";
import { nextType, reqType, resType } from "../config/types";

function routeValidator(req: reqType, res: resType, next: nextType) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
}

export default function (schema: any) {
  return [checkSchema(schema) as any, routeValidator];
}
