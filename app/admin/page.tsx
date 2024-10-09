"use client";
import Products from "@components/Products";
import Users from "@components/Users";
import { Button } from "@components/ui/button";
import { User } from "@models/user";
import React, { useEffect, useState } from "react";
import AddAdminForm from "./_components/AddAdminForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ProductForm from "./_components/CreateProductForm";
import useFetchData from "@hooks/useProducts";
const AdminPage = () => {
  const [products, fetchProducts] = useFetchData("/api/products");
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("products");
  useEffect(() => {
    const fetchPosts = async () => {
      const response2 = await fetch(`/api/users/admin`);
      const users: User[] = await response2.json();
      setUsers(users);
    };
    fetchPosts();
  }, []);

  const handleTabChange = (value: any) => {
    setActiveTab(value);
    if (value == "products") {
      fetchProducts();
    }
  };

  function deleteProductHandler() {
    fetchProducts();
  }
  function productCreated() {
    fetchProducts();
    setActiveTab("products");
  }

  return (
    <div className="h-full">
      <Tabs value={activeTab} className="mt-5" onValueChange={handleTabChange}>
        <TabsList className="gap-3 flex">
          <TabsTrigger value="products">
            <Button color="#333">Products</Button>
          </TabsTrigger>
          <TabsTrigger value="create-product">
            <Button color="#333">Create Product</Button>
          </TabsTrigger>
          <TabsTrigger value="users">
            <Button color="#333">Users</Button>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          {products.loading ? (
            <h2>Loading products ...</h2>
          ) : (
            <Products
              products={products.data}
              isAdmin={true}
              deleteProduct={deleteProductHandler}
            />
          )}
        </TabsContent>
        <TabsContent value="create-product">
          <ProductForm type="Create" productCreated={productCreated} />
        </TabsContent>
        <TabsContent value="users">
          <AddAdminForm />
          <Users users={users} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
