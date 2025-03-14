import http from "~/lib/http";
import {
  LoginSchemaType,
  LoginResponseType,
  RegisterSchemaType,
  RegisterResponseType,
} from "~/schema-validation/auth-schema";

const authApiRequest = {
  login: (body: LoginSchemaType) =>
    http.post<LoginResponseType>("auth/login", body),
  register: (body: RegisterSchemaType) =>
    http.post<RegisterResponseType>("auth/register", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
};

export default authApiRequest;
