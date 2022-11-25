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
    body: { comment },
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

  const newComment = await client.comment.create({
    data: {
      user: {
        //session의 user를 connect
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: Number(id),
        },
      },
      comment,
    },
  });
  console.log(newComment);
  res.json({ ok: true ,comment:newComment});
};

export default withApiSession(viewHandler({ methods: ["POST"], handler }));
