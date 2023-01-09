import {
  NextRequest,
  NextFetchEvent,
  userAgent,
  NextResponse,
} from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { isBot } = userAgent(req);
  if (isBot) {
    //errorpage redirection 필요
  }
  if (!req.url.includes("/api")) {
    if (
      !req.url.includes("/enter") &&
      !req.cookies.has("wiskyontherocksession")
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/enter";
      return NextResponse.redirect(url);
    //   return NextResponse.redirect("/enter");
    }
  }
}

//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     // This logic is only applied to /dashboard
//   }
