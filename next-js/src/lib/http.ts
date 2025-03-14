import envConfig from "~/config";
import { LoginResponseType } from "~/schema-validation/auth-schema";

type CustomOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  baseUrl?: string;
};
const ENTITY_ERROR_STATUS = 422;
type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: unknown }) {
    super("HTTP Error");
    this.status = status;
    this.payload = payload as { message: string; [key: string]: unknown };
  }
}
export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = ENTITY_ERROR_STATUS;
    this.payload = payload;
  }
}
class SessionToken {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set session token on the server");
    }
    this.token = token;
  }
}
export const clientSessionToken = new SessionToken();
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const headers = {
    "Content-Type": "application/json",
    Authorization: clientSessionToken.value
      ? `Bearer ${clientSessionToken.value}`
      : "",
    ...options?.headers,
  };
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    method,
    body,
    headers,
  });
  const payload: Response = await response.json();
  const data = { status: response.status, payload };
  if (!response.ok) {
    if (response.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    }
    throw new HttpError(data);
  }
  if (["auth/login", "auth/register"].includes(url)) {
    clientSessionToken.value = (payload as LoginResponseType).data.token;
  }
  if ("auth/logout".includes(url)) {
    clientSessionToken.value = "";
  }
  return data;
};

const http = {
  get: <Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) => request<Response>("GET", url, options),
  post: <Response>(
    url: string,
    body: unknown,
    options?: CustomOptions | undefined
  ) => request<Response>("POST", url, { ...options, body }),
  put: <Response>(
    url: string,
    body: unknown,
    options?: CustomOptions | undefined
  ) => request<Response>("PUT", url, { ...options, body }),
  delete: <Response>(
    url: string,
    body: unknown,
    options?: CustomOptions | undefined
  ) => request<Response>("DELETE", url, { ...options, body }),
};

export default http;
