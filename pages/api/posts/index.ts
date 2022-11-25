import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libraries/server/sessionLayout";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  //   const { name, price, description } = req.body;
  //   const { user } = req.session;

  if (req.method === "POST") {
    const {
      body: { title, question },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: {
        title,
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
};

export default withApiSession(viewHandler({ methods: ["POST"], handler }));
