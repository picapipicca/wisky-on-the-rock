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

  const post = await client.post.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
    },
  });
  if (!post) return res.status(404);
  
  const isClicked = await client.sameQuestion.findFirst({
    where: {
      postId: Number(id),
      userId: user?.id,
    },
  });
  if (isClicked) {
    await client.sameQuestion.delete({
      where: {
        id: isClicked.id,
      },
    });
  } else {
    await client.sameQuestion.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
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
