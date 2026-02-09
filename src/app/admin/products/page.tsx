import AdminHeader from "@/components/AdminHeader";
import AdminProductsPage from "@/components/AdminProductPage";
import ProductsTable from "@/components/ProductsTable";
import { getProducts } from "@/utils/firebase";
import React from "react";

export default async function ProductPage() {
  const products = await getProducts();
  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Products" />
      <div className=" w-full flex-1 bg-app-card overflow-x-auto px-5 py-10">
        {/* <AdminProductsPage products={products} /> */}
        <ProductsTable products={products} />
      </div>
    </div>
  );
}
