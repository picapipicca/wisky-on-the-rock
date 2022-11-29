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
      body: { email, phoneNum, name },
      session: { user },
    } = req;
    const aboutCurrentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email && email !== aboutCurrentUser?.email) {
      const isEmailAlreadyTaken = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      if (isEmailAlreadyTaken) {
        res.json({
          ok: false,
          error: "이 이메일은 이미 사용중인 이메일입니다.",
        });
      }
      await client.user.update({
        where: { id: user?.id },
        data: { email },
      });
      res.json({ ok: true });
    }
    if (phoneNum && phoneNum !== aboutCurrentUser?.phoneNum) {
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
        data: { phoneNum },
      });
      res.json({ ok: true });
    }
    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: { name },
      });
    }
    res.json({
      ok: true,
    });
  }
};

export default withApiSession(
  viewHandler({ methods: ["GET", "POST"], handler })
);
