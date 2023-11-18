import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const currentPage = request.nextUrl.pathname;
  if (currentPage === "/") {
    const url = "http://localhost:3000/account/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
