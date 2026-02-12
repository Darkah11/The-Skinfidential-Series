import AdminHeader from "@/components/AdminHeader";
import React from "react";

export default async function Dashboard() {

  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Dashboard" />
      <div className=" w-full flex-1 bg-app-card overflow-x-auto px-5 py-10 flex justify-center items-center">
       <h2 className=" text-center text-5xl font-semibold text-primary-100 my-auto">Welcome to Admin!</h2>
      </div>
    </div>
  );
}
