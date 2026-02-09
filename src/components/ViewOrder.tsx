"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { getOrderById, updateOrder } from "@/utils/firebase";
import { OrderWithId } from "@/types/order";
import { formatDate, formatPrice } from "@/utils/formatters";
import Image from "next/image";
import { PrimaryButton } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

export default function ViewOrder({ isOpen, onClose, orderId }: ModalProps) {
  const [order, setOrder] = useState<OrderWithId | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cartSubtotal =
    order &&
    order.cart.reduce((accumulator, product) => {
      return accumulator + product.subtotal;
    }, 0);

  const handleUpdateOrder = async (
    e: React.MouseEvent<HTMLButtonElement>,
    status: string,
  ) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (order) {
        await updateOrder(order.id, status);
      }
    } catch {}
  };

  useEffect(() => {
    if (!isOpen || !orderId) return;

    const fetchOrder = async () => {
      setLoading(true);
      setError(null);

      try {
        const order = await getOrderById(orderId);
        setOrder(order);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [isOpen, orderId]);

  // const handleCreateBoard = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   if (boardName === "") {
  //     console.log("Input board name");
  //   } else {
  //     const boardId = await createBoard(boardName, userId);
  //   //   console.log(boardId);
  //     setBoardName("");
  //     onClose();
  //   }
  // };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : order === null ? (
          <p>Order unavailable</p>
        ) : (
          <div>
            <div className=" border-b py-5">
              <h2 className="text-xl font-semibold">
                <span className=" text-gray-600">Order Number:</span>{" "}
                {order.orderNumber}
              </h2>
              <p
                className={` ${order.status === "cancelled" ? "text-red-600" : order.status === "completed" ? "text-green-600" : "text-blue-600"} bg-gray-200 py-1 capitalize px-3 mt-2 rounded-md w-fit text-sm`}
              >
                {order.status}
              </p>
              <p className=" text-sm text-gray-600 mt-2">
                {formatDate(order.createdAt)} from{" "}
                {order.billing.last_name + " " + order.billing.first_name}
              </p>
              <div className=" flex gap-3 mt-5">
                {order.status === "paid" && (
                  <PrimaryButton
                    text="Accept"
                    style=" bg-primary-100 w-[100px] rounded-md"
                    handleClick={(e) => handleUpdateOrder(e, "completed")}
                  />
                )}
                {order.status !== "cancelled" && (
                  <PrimaryButton
                    text="Cancel"
                    style=" bg-accent w-[100px] rounded-md"
                    handleClick={(e) => handleUpdateOrder(e, "cancelled")}
                  />
                )}
                {order.status === 'cancelled' && <p className=" text-red-600 text-sm">This order has been cancelled </p>}
              </div>
            </div>
            <div className=" border-b py-5">
              <h2 className="text-xl font-semibold">Order Items</h2>
              <div className="flex flex-col gap-y-5 mt-3">
                {order.cart.map((item) => (
                  <div key={item.id} className=" flex items-center gap-x-5">
                    <div className="relative">
                      <Image
                        src={`${item.imageUrl}`}
                        width={300}
                        height={500}
                        alt="product image"
                        className=" w-[50px] object-cover aspect-[3/4]"
                      />
                      <p className=" bg-accent absolute -top-[7px] -right-[11px] text-[10px] text-white leading-normal w-[23px] rounded-sm font-medium text-center">
                        × {item.quantity}
                      </p>
                    </div>
                    <div className="">
                      <p className=" capitalize text-primary-100 text-sm font-semibold">
                        {item.name}
                      </p>
                      <p className=" text-sm text-gray-600  mt-2">
                        ₦{formatPrice(item.price)} X {item.quantity} ={" "}
                        <span className="font-semibold ">
                          ₦{formatPrice(item.price * item.quantity)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" border-b py-5">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className=" py-4 border-b border-gold px-2">
                <div className=" text-xs flex items-center text-primary-100 justify-between">
                  <p className=" font-semibold text-gray-600">SUBTOTAL:</p>
                  <p className=" text-sm font-semibold">
                    {cartSubtotal && `₦${formatPrice(cartSubtotal)}`}
                  </p>
                </div>
                <div className=" text-xs flex items-center text-primary-100 justify-between mt-4">
                  <p className=" font-semibold text-gray-600">
                    {order.deliveryMethod}:
                  </p>
                  <p className="text-sm font-semibold">
                    ₦{formatPrice(order.deliveryPrice)}
                  </p>
                </div>
                <div className=" text-xs flex items-center text-primary-100 justify-between mt-4">
                  <p className=" font-semibold text-gray-600">TAX(7.5%):</p>
                  <p className="text-sm font-semibold">
                    {cartSubtotal &&
                      `₦${formatPrice((7.5 / 100) * cartSubtotal)}`}
                  </p>
                </div>
              </div>
              <div className=" text-xs flex items-center px-2 text-primary-100 justify-between py-3">
                <p className=" font-semibold text-gray-600">TOTAL:</p>
                <p className=" text-sm font-semibold">
                  {cartSubtotal && `₦${formatPrice(order.amount)}`}
                </p>
              </div>
            </div>
            <div className=" border-b py-5">
              <h2 className="text-xl font-semibold">Customer Details</h2>
              <div className=" text-sm text-gray-600 font-medium flex flex-col gap-y-2 mt-3">
                <p>
                  Customer ID:{" "}
                  <span className=" font-semibold text-primary-100">
                    {order.userId}
                  </span>
                </p>
                <p>
                  Customer Email:{" "}
                  <span className=" font-semibold text-primary-100">
                    {order.email}
                  </span>
                </p>
              </div>
            </div>
            <div className=" py-5">
              <h2 className="text-xl font-semibold">Billing Address</h2>
              <div className=" text-sm text-gray-600 font-medium flex flex-col gap-y-3 mt-3">
                <p>
                  Full Name:{" "}
                  <span className=" font-semibold text-primary-100">
                    {order.billing.last_name + " " + order.billing.first_name}
                  </span>
                </p>
                <p>
                  Email:{" "}
                  <span className=" font-semibold text-primary-100">
                    {order.billing.email}
                  </span>
                </p>
                <p>
                  Phone:{" "}
                  <span className=" font-semibold text-primary-100">
                    {order.billing.phone}
                  </span>
                </p>
                <p>
                  Address:{" "}
                  <span className=" font-semibold text-primary-100">
                    {order.billing.address_1}
                  </span>
                </p>
                <p>
                  City:{" "}
                  <span className=" font-semibold text-primary-100">
                    {order.billing.city}
                  </span>
                </p>
                <p>
                  State:{" "}
                  <span className=" font-semibold text-primary-100">
                    {order.billing.state}
                  </span>
                </p>
                <p>
                  Country:{" "}
                  <span className=" font-semibold text-primary-100">
                    {order.billing.country}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
