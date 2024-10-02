"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ProductModel } from "@models/product";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 2 characters.",
  }),
  price: z.coerce.number().int().min(1),
});
interface ProductFormProps {
  type: string;
  isEdit?: boolean;
  product?: ProductModel;
}
export function ProductForm({
  type,
  isEdit = false,
  product,
}: ProductFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.details || "",
      price: product?.price || 1,
    },
  });
  // useEffect(() => {
  //   form.setValue('aaa',product?.details,product?.price)
  // },[product])
  return (
    <>
      <h1 className="text-2xl mb-5">{type} product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit"> {isEdit ? "Update" : type} Product</Button>
        </form>
      </Form>
    </>
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let val = values;

    await fetch("/api/products", {
      method: isEdit ? "PUT" : "POST",
      body: JSON.stringify({
        ...values,
        id: isEdit ? product?._id : null,
      }),
    });

    router.push("/admin");
  }
}

export default ProductForm;
