"use client";
import Products from "@components/Products";
import Users from "@components/Users";
import { Button } from "@components/ui/button";
import { ProductModel } from "@models/product";
import { User } from "@models/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddAdminForm from "./_components/AddAdminForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ProductForm from "./_components/CreateProductForm";
import { useProduct } from "@app/context/ProductContext";

const AdminPage = () => {
  const { products } = useProduct();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response2 = await fetch(`/api/users/admin`);
      const users: User[] = await response2.json();
      setUsers(users);
    };
    fetchPosts();
  }, []);
  return (
    <div className="h-full">
      <Tabs defaultValue="account" className="mt-5">
        <TabsList className="gap-3 flex">
          <TabsTrigger value="account">
            <Button color="#333">Products</Button>
          </TabsTrigger>
          <TabsTrigger value="create-product">
            <Button color="#333">Create Product</Button>
          </TabsTrigger>
          <TabsTrigger value="password">
            <Button color="#333">Users</Button>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Products products={products.data} isAdmin={true} />
        </TabsContent>
        <TabsContent value="create-product">
          <ProductForm type="Create" />
        </TabsContent>
        <TabsContent value="password">
          <AddAdminForm />
          <Users users={users} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
