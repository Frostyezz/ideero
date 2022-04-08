import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

export default async function middleware(req) {
  const { cookies } = req;

  const jwt = cookies.IdeeROJWT;

  const protectedURLS = ["/feed", "/admin"];
  const publicURLS = ["/", "/signup", "/signin"];

  const url = req.nextUrl.clone();

  if (protectedURLS.includes(url.pathname)) {
    if (jwt === undefined) {
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }

    try {
      await jwtVerify(jwt, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch (error) {
      url.pathname = "/";
      return NextResponse.rewrite(url);
    }
  } else if (publicURLS.includes(url.pathname)) {
    if (jwt) {
      try {
        await jwtVerify(jwt, new TextEncoder().encode(secret));
        url.pathname = "/feed";
        return NextResponse.rewrite(url);
      } catch (error) {
        return NextResponse.next();
      }
    } else return NextResponse.next();
  }

  return NextResponse.next();
}
