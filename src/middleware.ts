export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/users/me",
    "/users/likes",
    "/hospitals/new",
    "/hospitals/:id/edit",
  ],
};
