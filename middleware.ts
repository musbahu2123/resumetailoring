// middleware.ts
import { auth } from "./auth";

export const config = {
  matcher: ["/documents", "/settings"],
};

export default auth;
