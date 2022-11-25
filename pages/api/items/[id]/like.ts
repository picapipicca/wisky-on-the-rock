import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libraries/server/sessionLayout";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    query: { id },
    session: { user },
  } = req;
  const item = await client.item.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
    },
  });
  if(!item) return res.status(404);
  
  const isAlreadyLike = await client.like.findFirst({
    where: {
      itemId: Number(id),
      userId: user?.id,
    },
  });
  if (isAlreadyLike) {
    await client.like.delete({
      where: {
        id: isAlreadyLike.id,
      },
    });
  } else {
    await client.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        item: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({
    ok: true,
  });
};

export default withApiSession(viewHandler({ methods: ["POST"], handler }));
