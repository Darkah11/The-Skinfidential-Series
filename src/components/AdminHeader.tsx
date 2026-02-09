import { Bell } from "lucide-react";
import React from "react";

interface MyComponentProps {
  title: string;
}

export default function AdminHeader({ title }: MyComponentProps) {
  return (
    <div className=" pl-[65px] lg:pl-5 px-5 py-3 flex justify-between items-center shadow-md ">
      <h2 className=" text-3xl font-semibold">{title}</h2>
      <div className=" flex items-center gap-3">
        <button>
          <Bell />
        </button>
        <button className=" w-10 aspect-square rounded-full bg-primary-100 font-medium text-white">H</button>
      </div>
    </div>
  );
}
