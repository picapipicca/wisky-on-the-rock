import client from "@libraries/server/client";
import viewHandler from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

//upsert :bring data from database ,mainly used at update or create data

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phoneNum, email } = req.body;
  const payload = phoneNum ? { phoneNum: +phoneNum } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "익명",
      ...payload,
    },
    update: {},
  });
  console.log(user);
  // if (email) {
  //   user = await client.user.findUnique({
  //     where: { email },
  //   });
  //   if (user) {
  //     console.log("유저정보 있어요!");
  //   }
  //   if (!user) {
  //     console.log("유저정보를 찾지못해서 생성하였습니다");
  //     user = await client.user.create({
  //       data: {
  //         name: "익명",
  //         email,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }

  // if (phoneNum) {
  //   user = await client.user.findUnique({
  //     where: { phoneNum: +phoneNum },
  //   });
  //   if (user) {
  //     console.log("유저 phoneNum 정보 있어요!");
  //   }
  //   if (!user) {
  //     console.log("유저 phoneNum 정보를 찾지못해서 생성하였습니다");
  //     user = await client.user.create({
  //       data: {
  //         name: "익명",
  //         phoneNum: +phoneNum,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  return res.status(200).end();
};

export default viewHandler("POST", handler);
