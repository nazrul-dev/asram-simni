/* eslint-disable import/no-anonymous-default-export */
import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authConfig } from "@/config/auth";
const nextAuthOptions: any = (req: NextApiRequest, res: NextApiResponse) => (authConfig)
export default (req: NextApiRequest, res: NextApiResponse) => {


  return NextAuth(req, res, nextAuthOptions(req, res));
};
