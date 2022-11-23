import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libraries/server/sessionLayout";
import { useEffect } from 'react';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  
  const { confirmToken } = req.body;
  const isToken = await client.token.findUnique({
    where: { payload: confirmToken },
    // include: { user: true }, 유저정보도 같이 보내주고 싶다면
  });
// console.log(isToken)
  //로그인까지 이어지지 않고 인증번호 발급만 여러번 될 경우 삭제로직
  // const isTokenMany = await client.token.count({
  //   where: {
  //     userId: isToken?.userId,
  //   },
  // });
  // if (isTokenMany > 2) {
  //   await client.token.deleteMany({
  //     where: {
  //       userId: isToken?.userId,
  //       AND: {
  //         id: {
  //           not: isToken?.id,
  //         },
  //       },
  //     },
  //   });
  // }

  if (!isToken) return res.status(404).end();
  req.session.user = {
    id: isToken.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: isToken.userId,
    },
  });
  res.json({
    ok: true,
  });

};

export default withApiSession(
  viewHandler({ methods: ["POST"], handler, isLoggedIn: false })
);