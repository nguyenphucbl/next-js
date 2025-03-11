/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppContext } from "~/app/appProvider";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import envConfig from "~/config";
import { loginSchema, LoginSchemaType } from "~/schema-validation/auth-schema";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver<LoginSchemaType>(loginSchema),
  });
  const { setSessionToken } = useAppContext();
  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof loginSchema>) => {
      try {
        const res = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await res.json();
        const payload = {
          status: res.status,
          result,
        };
        if (!res.ok) {
          throw payload;
        }
        toast.success("Login successful", {
          position: "top-right",
        });
        const resultFromNextServer = await fetch("/api/auth", {
          method: "POST",
          body: JSON.stringify(result),
        });
        const resultJson = await resultFromNextServer.json();

        if (!resultJson.token) {
          throw new Error("Token not found");
        }
        setSessionToken(resultJson.token);
        router.push("/me");
      } catch (error: any) {
        console.log(error);
        const errors = error.result.errors as {
          field: string;
          message: string;
        }[];
        const status = error.status as number;
        if (status === 422) {
          errors.forEach((error) => {
            form.setError("root", {
              type: "server",
              message: error.message,
            });
          });
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-2 max-w-[400px] mx-auto">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        <Button type="submit" className="mt-12 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
