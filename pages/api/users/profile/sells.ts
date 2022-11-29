import client from "@libraries/server/client";
import viewHandler, { ResponseType } from "@libraries/server/viewHandler";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withApiSession } from "@libraries/server/sessionLayout";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {

  const {
    session: { user },
  } = req;

  //record를 쓴다면 
// client.record.findMany({
//     where:{
//         userId:user?.id,
//         kind:"Like",..
//     }
// })
  const sell = await client.sell.findMany({
    where:{
        userId:user?.id
      },
      include:{
        item:{
          include:{
            _count:{
              select:{
                likes:true,
              }
            }
          }
        }
      }
  })
  res.json({
    ok: true,sell
  });
};

export default withApiSession(viewHandler({ methods: ["GET"], handler }));
