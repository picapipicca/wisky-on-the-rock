import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libraries/server/sessionLayout";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method === "GET") {
    const { latitude, longitude } = req.query;
    const parsedLatitude = parseFloat(String(latitude));
    const parsedLongitude = parseFloat(String(longitude));
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            sameQuestions: true,
            comments: true,
          },
        },
      },
      where: {
        latitude: {
          gte: parsedLatitude - 0.01,
          lte: parsedLatitude + 0.01,
        },
        longitude: {
          gte: parsedLongitude - 0.01,
          lte: parsedLongitude + 0.01,
        },
      },
    });
    res.json({ ok: true, posts });
  }
  if (req.method === "POST") {
    const {
      body: { title, question, latitude, longitude },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        title,
        question,
        latitude,
        longitude,
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

export default withApiSession(
  viewHandler({ methods: ["POST", "GET"], handler })
);
