import AddCategories from "@/components/AddCategories";
import AdminHeader from "@/components/AdminHeader";
import { getCategoryById } from "@/utils/firebase";
import React from "react";

interface MyComponentProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params }: MyComponentProps) {
  const category = await getCategoryById(params.id);
  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Products" />
      <div className=" w-full flex-1 bg-app-card overflow-x-auto px-5 py-10">
        <AddCategories category={category} />
      </div>
    </div>
  );
}

