"use client"
import { useRouter } from "next/navigation";
import React from "react";

export default function Maintenance() {
  const router = useRouter();
  const handleRedirect = () => {
    router.refresh();
    router.replace("/");
  };
  return (
    <div className=" px-3 h-screen flex flex-col items-center justify-center gap-y-3">
      <h2 className=" text-center text-primary-100 text-4xl md:text-6xl font-bold">
        <span className=" text-accent">Sorry! </span> We are currently under
        maintenace.
      </h2>
      <button
        onClick={handleRedirect}
        className=" font-semibold text-sm rounded-md bg-accent w-[130px] text-center text-white py-2"
      >
        Go Home
      </button>
    </div>
  );
}
