import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
type method = "GET" | "POST" | "DELETE";

interface ConfigProps {
  methods: method[];
  handler: NextApiHandler;
  isLoggedIn?: boolean;
}

const viewHandler = ({
  methods,
  isLoggedIn = true,
  handler,
}: ConfigProps): NextApiHandler => {
  return async (req, res) => {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    if (isLoggedIn && !req.session.user) {
      return res.status(401).json({ ok: false });
    }
    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
};

export default viewHandler;
