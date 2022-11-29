import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libraries/server/sessionLayout";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    session: { user },
  } = req;
  const review = await client.review.findMany({
    where: {
      writtenAtId: user?.id,
    },
    include: {
      writtenBy: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    review,
  });
};

export default withApiSession(viewHandler({ methods: ["GET"], handler }));
