export async function POST(request: Request) {
  const res = await request.json();
  console.log("🚀 ~ POST ~ res:", res);
  const token = res.sessionToken as string;
  if (!token) {
    return Response.json({
      message: "Token not found",
    });
  }
  return Response.json(res, {
    status: 200,
    headers: {
      "set-cookie": `sessionToken=${token} ; path=/; HttpOnly`,
    },
  });
}
