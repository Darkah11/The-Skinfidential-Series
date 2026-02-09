import AdminHeader from "@/components/AdminHeader";
import OrdersTable from "@/components/OrdersTable";
import ProductsTable from "@/components/ProductsTable";
import { getOrders, getProducts } from "@/utils/firebase";
import React from "react";

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Orders" />
      <div className=" w-full flex-1 bg-app-card overflow-x-auto px-5 py-10">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
