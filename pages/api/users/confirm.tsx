import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { confirmToken } = req.body;
  console.log(confirmToken);
  res.status(200).end();
};

export default viewHandler("POST", handler);
