import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libraries/server/sessionLayout";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
const response = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_IMAGE_ID}/images/v2/direct_upload`,{
  method:"POST",
  headers:{
    "Content-Type" :"application/json",
    "Authorization": `Bearer ${process.env.CF_IMAGE_TOKEN}`,
  },
})).json();
console.log(response);
  res.json({
    ok: true,
    ...response.result
  });
};

export default withApiSession(viewHandler({ methods: ["GET"], handler }));
