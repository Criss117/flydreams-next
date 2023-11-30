import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const currentPage = request.nextUrl.pathname;
  if (currentPage === "/") {
    const url = "http://localhost:3000/account/login";
    return NextResponse.redirect(url);
  }
  if (currentPage === "/dashboard/vuelos") {
    const url = "http://localhost:3000/dashboard/vuelos/1";
    return NextResponse.redirect(url);
  }
  if (currentPage === "/dashboard/p/azafatas") {
    const url = "http://localhost:3000/dashboard/p/azafatas/1";
    return NextResponse.redirect(url);
  }
}
