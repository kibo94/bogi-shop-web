"use client";
import { User } from "@models/user";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks/hooks";
import { fetchProducts } from "@store/actions";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { Button } from "@components/ui/button";
import { TabsContent, TabsTrigger } from "@components/ui/tabs";
import ProductForm from "./_components/CreateProductForm";
import Products from "@components/Products";
import AddAdminForm from "./_components/AddAdminForm";
import Users from "@components/Users";
const AdminPage = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("products");
  // Access products, loading status, and error from the Redux store
  const {
    items: products,
    loading,
    error,
  } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
    }
  };

  function productCreated() {
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
          {loading ? (
            <h2>Loading products ...</h2>
          ) : (
            <Products products={products} isAdmin={true} />
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
