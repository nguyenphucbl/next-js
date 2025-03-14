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
import {
  registerSchema,
  RegisterSchemaType,
} from "~/schema-validation/auth-schema";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver<RegisterSchemaType>(registerSchema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setLoading(true);
    try {
      const res = await authApiRequest.register(data);
      toast.success("Register successful", {
        position: "top-right",
      });
      await authApiRequest.auth({
        sessionToken: res.payload.data.token,
      });
      router.push("/me");
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[400px] mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ConfirmPassword</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-12 w-full" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
