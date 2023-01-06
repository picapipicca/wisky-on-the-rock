import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libraries/server/sessionLayout";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    body: { name, price, description },
    session: { user },
  } = req;

  if (req.method === "GET") {
    const streams = await client.stream.findMany({
      take:10, 
      skip:10,
    });
    res.json({ ok: true, streams });
  }

  else if (req.method === "POST") {
    const {result:{uid,rtmps:{url,streamKey}}} = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,{
  method:"POST",
  headers:{
    "Authorization": `Bearer ${process.env.CF_STREAM_TOKEN}`,
  },
  body:`{"meta": {"name":"${name}"},"recording": { "mode": "automatic","timeoutSeconds":10 }}`
})).json();

    const stream = await client.stream.create({
      data: {
        cloudFlareId:uid,
        cloudFlareKey:streamKey,
        cloudFlareUrl:url,
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  }
};

export default withApiSession(
  viewHandler({ methods: ["POST", "GET"], handler })
);
