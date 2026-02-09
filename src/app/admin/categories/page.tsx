import AdminHeader from "@/components/AdminHeader";
import CategoriesTable from "@/components/CategoriesTable";
import { getCategories } from "@/utils/firebase";
import React from "react";

export default async function AdminCategories() {
  const categories = await getCategories();
  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Categories" />
      <div className=" w-full flex-1 bg-app-card overflow-x-auto px-5 py-10">
        <CategoriesTable categories={categories} />
      </div>
    </div>
  );
}
