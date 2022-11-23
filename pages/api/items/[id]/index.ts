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
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  });
  const searchTerms = item?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedItems = await client.item.findMany({
    where: {
      OR: searchTerms,
      AND: {
        id: {
          not: item?.id,
        },
      },
    },
  });
  const isLike = Boolean(
    await client.like.findFirst({
      where: {
        itemId: item?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, item, relatedItems, isLike });
};

export default withApiSession(viewHandler({ methods: ["GET"], handler }));
