import AddCategories from "@/components/AddCategories";
import AdminHeader from "@/components/AdminHeader";
import React from "react";

export default function page() {
  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Products" />
      <div className=" w-full flex-1 bg-app-card overflow-x-auto px-5 py-10">
        <AddCategories />
      </div>
    </div>
  );
}
