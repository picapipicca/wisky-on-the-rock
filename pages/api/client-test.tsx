// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../libraries/client'
type Data = {
  name: string
  ok:boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   await client.user.create({
        data:{
            email:"hi",
            name:"dd"
            }
        });
    res.status(200).json({ok:true , name: 'John nao' })
}
