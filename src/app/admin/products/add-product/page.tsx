import AddProduct from "@/components/AddProduct";
import AdminHeader from "@/components/AdminHeader";
import { getCategories } from "@/utils/firebase";
import React from "react";

export default async function AddProductPage() {
  const categories = await getCategories();
  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Products" />
      <div className=" w-full flex-1 bg-app-card overflow-x-auto px-5 py-10">
        <AddProduct categories={categories} />
      </div>
    </div>
  );
}
