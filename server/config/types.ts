import express from "express";

export type reqType = express.Request;
export type resType = express.Response;
export type nextType = express.NextFunction;

export interface Error {
  message: string;
}
