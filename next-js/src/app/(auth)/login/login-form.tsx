/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import authApiRequest from "~/apiRequest/auth";
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
import { handleErrorApi } from "~/lib/utils";
import { loginSchema, LoginSchemaType } from "~/schema-validation/auth-schema";

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver<LoginSchemaType>(loginSchema),
  });
  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof loginSchema>) => {
      setLoading(true);
      try {
        const res = await authApiRequest.login(data);
        toast.success("Login successful", {
          position: "top-right",
        });
        await authApiRequest.auth({
          sessionToken: res.payload.data.token,
        });
        router.push("/me");
      } catch (error: any) {
        handleErrorApi({
          error,
          setError: form.setError,
          duration: 2000,
        });
      } finally {
        setLoading(false);
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
        <Button type="submit" className="mt-12 w-full" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
