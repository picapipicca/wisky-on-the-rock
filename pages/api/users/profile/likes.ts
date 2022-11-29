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
  const like = await client.like.findMany({
    where:{
      userId:user?.id
    },
    include:{
      item:{
        include:{
          _count:{
            select:{
              likes:true
            }
          }
        }
      }
    }
  })
  
  res.json({
    ok: true,like
  });
};

export default withApiSession(viewHandler({ methods: ["GET"], handler }));
