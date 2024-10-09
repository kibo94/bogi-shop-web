"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
function AddAdminForm() {
  const formSchema = z.object({
    email: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Add User</Button>
      </form>
    </Form>
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("/api/users/admin/new", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
      }),
    });
  }
}

export default AddAdminForm;
