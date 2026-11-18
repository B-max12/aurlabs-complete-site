import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Redirect /products/slug -> /slug
  const match = path.match(/^\/products\/([a-z0-9-]+)$/);
  if (match) {
    url.pathname = `/${match[1]}`;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/products/:slug+",
};
