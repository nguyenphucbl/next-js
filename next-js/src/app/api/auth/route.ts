export async function POST(request: Request) {
  const res = await request.json();
  const token = res?.data?.token;
  if (!token) {
    return Response.json({
      message: "Token not found",
    });
  }
  return Response.json(res.data, {
    status: 200,
    headers: {
      "set-cookie": `sessionToken=${token} ; path=/; HttpOnly`,
    },
  });
}
