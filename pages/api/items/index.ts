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

  if (req.method === "GET") {
    const items = await client.item.findMany({
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      items,
    });
  }

  if (req.method === "POST") {
    const {
      body: { name, price, description },
      session: { user },
    } = req;
    const item = await client.item.create({
      data: {
        name,
        price: +price,
        description,
        imageUrl: "xxx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      item,
    });
  }
};

export default withApiSession(
  viewHandler({ methods: ["POST", "GET"], handler })
);
