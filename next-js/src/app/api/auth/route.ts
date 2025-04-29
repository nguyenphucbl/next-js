import { decodeJWT } from "~/lib/utils";

type PayloadJWT = {
  iat: number;
  exp: number;
  tokenType: string;
  userId: number;
};

export async function POST(request: Request) {
  const res = await request.json();
  const token = res.sessionToken as string;
  if (!token) {
    return Response.json({
      message: "Token not found",
    });
  }
  const payload = decodeJWT<PayloadJWT>(token);
  const expiresDate = new Date(payload.exp * 1000).toUTCString();
  return Response.json(res, {
    status: 200,
    headers: {
      "set-cookie": `sessionToken=${token} ; path=/; HttpOnly; expires=${expiresDate};SameSite=Lax; Secure`,
    },
  });
}
