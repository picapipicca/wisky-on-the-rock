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

  const stream = await client.stream.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      chats: {
        select: {
          message: true,
          id:true,
          user: {
            select: {
              avatarUrl: true,
              id:true
            },
          },
        },
      },
    },
  
  });
  const isMe = stream?.userId === user?.id
  if(stream && !isMe){
    stream.cloudFlareKey = "unknown";
    stream.cloudFlareUrl = "unknown"
  }
  res.json({ ok: true, stream });
  if (!stream) {
    res.status(404).json({ ok: false });
  }
};

export default withApiSession(viewHandler({ methods: ["GET"], handler }));
