"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import productImg from "../../../public/assets/images/product-img.png";
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
import { useEffect, useState } from "react";
import { storage } from "../../../lib/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useGlobal } from "@app/context/GlobalContext";
import Image from "next/image";
import { useProduct } from "@app/context/ProductContext";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 2 characters.",
  }),
  price: z.coerce.number().int().min(1),
  productImageurl: z.string(),
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
  const { openAlert } = useGlobal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.details || "",
      price: product?.price || 1,
      productImageurl: "",
    },
  });

  const [image, setImage] = useState<File>();
  const [isFileUploadProgess, setIsFileUploadProgress] = useState(false);
  const [productImageUrl, setProductImgUrl] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [downloadURL, setDownloadURL] = useState<string>("");
  const { fetchProducts } = useProduct();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      const storageRef = ref(
        storage,
        `tempImages/${form.getValues().name}/product.png`
      );
      const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          setIsFileUploadProgress(true);
          const progressPercent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercent);
        },
        (error: any) => {
          console.error("Error uploading file:", error);
        },
        async () => {
          const dwnURL = await getDownloadURL(uploadTask.snapshot.ref);
          setProductImgUrl(dwnURL);
          setIsFileUploadProgress(false);
          setProgress(0);
          // setDownloadURL(downloadURL);
        }
      );
    }
  };
  useEffect(() => {
    if (isEdit) {
      setProductImgUrl(product?.productImageUrl!);
    }
  }, []);
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
              name="productImageurl"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Product image</FormLabel>
                  <FormControl>
                    <Input {...field} type="file" onChange={handleFileChange} />
                  </FormControl>
                  <FormMessage />
                  <Image
                    className="edit-product-image"
                    src={productImageUrl}
                    alt="admin-product"
                    width={200}
                    height={200}
                  />
                  {isFileUploadProgess && <Progress value={progress} />}
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
    try {
      const storageRef = ref(
        storage,
        `tempImages/${form.getValues().name}/product.png`
      );
      const uploadTask = uploadBytesResumable(storageRef, image!);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          const progressPercent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPercent);
        },
        (error: any) => {
          console.error("Error uploading file:", error);
        },
        async () => {
          const dwnURL = await getDownloadURL(uploadTask.snapshot.ref);
          await fetch("/api/products", {
            method: isEdit ? "PUT" : "POST",
            body: JSON.stringify({
              ...values,
              productImageUrl: `${dwnURL}`,
              id: isEdit ? product?._id : null,
            }),
          });

          fetchProducts();
        }
      );

      openAlert(`Product has been ${isEdit ? "updated" : "created"}`);
      router.push("/admin");
    } catch (error: any) {
      openAlert(error.message);
    }
  }
}

export default ProductForm;
