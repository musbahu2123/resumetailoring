// middleware.ts
import { auth } from "./auth";

export const config = {
  matcher: ["/documents", "/profile"],
};

export default auth;
