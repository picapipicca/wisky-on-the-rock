import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libraries/server/sessionLayout";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });
    res.json({
      ok: true,
      profile,
    });
  }
  if (req.method === "POST") {
    const {
      body: { email, phoneNum },
      session: { user },
    } = req;
    console.log(req.body)
    if (email) {
      const isUserEmail = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      if (isUserEmail) {
        res.json({
          ok: false,
          error: "이 이메일은 이미 사용중인 이메일입니다.",
        });
      }
      await client.user.update({
        where: { id: user?.id },
        data: email,
      });
      res.json({ ok: true });
    } else if (phoneNum) {
      const isUserPhone = Boolean(
        await client.user.findUnique({
          where: {
            phoneNum,
          },
          select: {
            id: true,
          },
        })
      );
      if (isUserPhone) {
        res.json({
          ok: false,
          error: "이 전화번호는 이미 사용중인 번호입니다.",
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: phoneNum,
      });
      res.json({ok:true})
    }
  }
};

export default withApiSession(
  viewHandler({ methods: ["GET", "POST"], handler })
);
