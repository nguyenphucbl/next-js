import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const privatePaths = ["/me", "/logout"];
const publicPaths = ["/login", "/register"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const isValidatePath = (path: string[]) => path.some((p) => p === pathName);
  if (isValidatePath(privatePaths) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isValidatePath(publicPaths) && sessionToken) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  // return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/me:pathname*",
    "/login:pathname*",
    "/register:pathname*",
    "/logout",
  ],
};
