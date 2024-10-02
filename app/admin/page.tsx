"use client";
import Products from "@components/Products";
import Users from "@components/Users";
import { Button } from "@components/ui/button";
import { ProductModel } from "@models/product";
import { User } from "@models/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddAdminForm from "./_components/AddAdminForm";

const AdminPage = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/products`);
      const products: ProductModel[] = await response.json();
      setProducts(products);
      const response2 = await fetch(`/api/users/admin`);
      const users: User[] = await response2.json();
      setUsers(users);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex mt-5 items-center justify-between">
        <Button color="#333">
          <Link href="/admin/products/new" className="black_btn nav-link">
            Create Product
          </Link>
        </Button>
      </div>
      <h1 className="mt-5">Products</h1>
      <Products products={products} isAdmin={true} />
      <h1 className="mt-5">Admin Users</h1>
      <AddAdminForm />

      <Users users={users} />
    </div>
  );
};

export default AdminPage;
