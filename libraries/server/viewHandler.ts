import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

const viewHandler = (
  method: "GET" | "POST" | "DELETE",
  handlerFn: NextApiHandler
): NextApiHandler => {
  return async (req, res) => {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await handlerFn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
};

export default viewHandler;
