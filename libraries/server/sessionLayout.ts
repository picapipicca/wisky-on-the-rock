import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
const cookieOptions = {
  cookieName: "wiskyontherocksession",
  password: process.env.IRON_SESSION_PW!,
};

const withApiSession = (handler: any) => {
  return withIronSessionApiRoute(handler, cookieOptions);
};

const withSsrSession = (handler: any) => {
  return withIronSessionSsr(handler, cookieOptions);
};

export { withApiSession, withSsrSession };
