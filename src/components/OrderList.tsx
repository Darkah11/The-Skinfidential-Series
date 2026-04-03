"use client";
import { OrderWithId } from "@/types/order";
import { formatDate, formatPrice } from "@/utils/formatters";
import React, { useState } from "react";
import orderImg from "../../public/order.png";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import ViewOrder from "./ViewOrder";

interface MyComponentsProps {
  orders: OrderWithId[];
}

export default function OrderList({ orders }: MyComponentsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <div className=" space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => {
              setIsModalOpen(true);
              setSelectedId(order.id);
            }}
            className=" cursor-pointer flex justify-between items-center border border-gray-300 rounded-md px-3 py-4"
          >
            <div>
              <div className=" flex items-center gap-3">
                <p
                  className={` ${order.status === "cancelled" ? "text-red-600" : order.status === "completed" ? "text-green-600" : "text-orange-600"} flex items-center gap-1 bg-gray-200 py-1 px-3 rounded-full w-fit text-xs`}
                >
                  <span
                    className={`${order.status === "cancelled" ? "bg-red-600" : order.status === "completed" ? "bg-green-600" : "bg-orange-600"} rounded-full w-[5px] h-[5px]`}
                  />{" "}
                  <span>
                    {order.status === "paid" ? "in progress" : order.status}
                  </span>
                </p>
                <p>-</p>
                <p className=" text-xs text-gray-600">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div className=" flex items-center gap-2 mt-3">
                <div className=" bg-accent text-white w-fit p-1 md:p-2 rounded-md">
                  <Image
                    src={orderImg}
                    alt="receipt icon"
                    className=" object-cover w-8 md:w-10"
                  />
                </div>
                <div>
                  <p className=" text-sm font-bold">
                    Order Number: {order.orderNumber}
                  </p>
                  <p className=" text-gray-600 font-semibold mt-2 text-sm">
                    ₦{formatPrice(order.amount)}
                  </p>
                </div>
              </div>
            </div>
            <ChevronRight />
          </div>
        ))}
      </div>
      <ViewOrder
        isOpen={selectedId !== null && isModalOpen}
        onClose={() => setSelectedId(null)}
        orderId={selectedId}
        isUser
      />
    </>
  );
}
