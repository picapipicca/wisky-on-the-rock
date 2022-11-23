import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import twilio from "twilio";
import mail from "@sendgrid/mail";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
mail.setApiKey(process.env.SENDGRID_API_KEY!);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { phoneNum, email } = req.body;
  const user = phoneNum ? { phoneNum } : email ? { email } : null;

  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "익명",
            ...user,
          },
        },
      },
    },
  });

  if (phoneNum) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
    //   to: process.env.MY_PHONE_NUMBER!,
    //   body: `1회용 비밀번호는 ${payload} 입니다.`,
    // });
  } else if (email) {
    // const email = mail.send({
    //   to: "haewon0910@naver.com", // Change to your recipient
    //   from: "haewon09106@gmail.com", // Change to your verified sender
    //   subject: "위스키 온더락 이메일 인증 입니다",
    //   text: `이메일 인증번호를 정확히 입력해주세요. ${payload}`,
    //   html: `<strong>이메일 인증 번호를 정확히 입력해주세요 ${payload}</strong>`,
    // });
    // console.log(email);
  }

  //upsert :bring data from database ,mainly used at update or create data
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

  return res.json({
    ok: true,
  });
};

export default viewHandler({ methods: ["POST"], handler, isLoggedIn: false });
