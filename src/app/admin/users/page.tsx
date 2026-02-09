import AdminHeader from "@/components/AdminHeader";
import OrdersTable from "@/components/OrdersTable";
import UsersTable from "@/components/UsersTable";
import { getOrders, getProducts } from "@/utils/firebase";
import { getAllUsers } from "@/utils/users";
import React from "react";

export default async function UsersPage() {
  const { users } = await getAllUsers();
  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Users" />
      <div className=" w-full flex-1 bg-app-card px-5 py-10">
        <UsersTable users={users} />
      </div>
    </div>
  );
}
