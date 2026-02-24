import { User } from "@/types/user";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface ChildProps {
  onUpdate: () => void;
  user: User | null;
}

export default function UserMenu({ onUpdate, user }: ChildProps) {
  console.log(user);

  const router = useRouter();
  const handleClose = () => {
    onUpdate();
  };

  const handleLogout = async () => {
    onUpdate();
    try {
      const response = await fetch("/api/logout", {
        // Replace with your actual route path
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to clear session:", error);
    }
  };

  return (
    <div className=" text-primary-100 fixed top-0 right-0 h-screen w-full z-50">
      <div
        onClick={handleClose}
        className=" absolute w-full h-full top-0 right-0"
      />

      {/* <div className=" bg-white max-w-[300px] h-[50px] relative ml-auto right-5 top-[80px] shadow-xl"> */}
      <div className=" bg-white w-[250px] right-3 absolute top-[85px] rounded-md shadow-xl">
        <div className=" flex items-center gap-x-2 px-3 border-b border-gold py-3">
          <div className=" flex justify-center items-center w-10 aspect-square rounded-full bg-primary-100 font-medium text-white">
            {user?.name?.substring(0, 1)}
          </div>
          <div>
            <p className=" text-sm font-semibold">{user?.name}</p>
            <p className=" text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
        <Link
          href={""}
          className=" flex font-semibold items-center gap-x-2 px-3 border-b border-gold py-3"
        >
          My Orders
        </Link>
        <button
          onClick={handleLogout}
          className=" text-red-600 flex w-full font-semibold items-center gap-x-2 px-3 py-3"
        >
          Logout <LogOut className=" w-5" />
        </button>
      </div>
    </div>
  );
}
