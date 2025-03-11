"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  registerSchema,
  RegisterSchemaType,
} from "~/schema-validation/auth-schema";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver<RegisterSchemaType>(registerSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw result;
      }
      const resultFromNextServer = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(result),
      });
      const resultJson = await resultFromNextServer.json();
      if (!resultJson.token) {
        throw new Error("Token not found");
      }
      router.push("/me");
    } catch (error) {
      console.log(error);
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
        <Button type="submit" className="mt-12 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
