import { cookies } from "next/headers";
import authApiRequest from "~/apiRequest/auth";
import { HttpError } from "~/lib/http";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;
  if (force) {
    return Response.json(
      {
        message: "Logout success",
      },
      {
        status: 200,
        headers: {
          "set-cookie": `sessionToken=; path=/; HttpOnly`,
        },
      }
    );
  }
  const token = cookies().get("sessionToken");
  if (!token) {
    return Response.json(
      {
        message: "Token not found",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const result = await authApiRequest.logoutFromNextServer(token.value);
    if (result.status !== 200) {
      return Response.json(
        {
          message: "Logout failed",
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(result.payload, {
      status: 200,
      headers: {
        "set-cookie": `sessionToken=; path=/; HttpOnly`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    }
    return Response.json(
      {
        message: "Logout failed",
      },
      {
        status: 500,
      }
    );
  }
}
