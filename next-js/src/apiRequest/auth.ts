import http from "~/lib/http";
import {
  LoginSchemaType,
  LoginResponseType,
  RegisterSchemaType,
  RegisterResponseType,
} from "~/schema-validation/auth-schema";
import { MessageResType } from "~/schema-validation/commonSchema";

const authApiRequest = {
  login: (body: LoginSchemaType) =>
    http.post<LoginResponseType>("auth/login", body),
  register: (body: RegisterSchemaType) =>
    http.post<RegisterResponseType>("auth/register", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  logoutFromNextServer: (sessionToken: string) =>
    http.post<MessageResType>(
      "auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  logoutFromNextClientToNextServer: (force: boolean | undefined) =>
    http.post<MessageResType>(
      "/api/auth/logout",
      {
        force,
      },
      {
        baseUrl: "",
        headers: {
          setCookie: "sessionToken=; path=/; HttpOnly",
        },
      }
    ),
};

export default authApiRequest;
