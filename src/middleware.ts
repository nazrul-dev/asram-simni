export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/aparatur/:path*",
    "/dokumen/:path*",
    "/jabatan/:path*",
    "/pekerjaan/:path*",
    "/pekerjaan/:path*",
  ],
};
