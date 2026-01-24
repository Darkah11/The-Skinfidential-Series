"use client";
import React, { useEffect, useState } from "react";
// import cards from "@/public/payment-cards.png";
// import { PaystackButton } from "react-paystack";
// import { useSession } from "next-auth/react";
import AccordionItem from "./AccordionItem";
import { DeliveryWithId } from "@/types/delivery";
import { formatPrice } from "@/utils/formatters";
import { useDispatch } from "react-redux";
import { updateDeliveryOption } from "@/redux/slices/cartSlice";

// const PaystackCheckout = dynamic(() => import("./PaystackCheckout"), {
//   ssr: false,
// });

interface MyComponentProps {
  deliveryOptions: DeliveryWithId[];
}

const DeliveryMethod = ({ deliveryOptions }: MyComponentProps) => {
  // const cart = useAppSelector((state) => state.cart);
  const [openItem, setOpenItem] = useState<number>(0); // Default open item
  // const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateDeliveryOption(deliveryOptions[openItem]));
  }, [openItem]);

  const handleToggle = (index: number) => {
    setOpenItem(index);
  };

  return (
    <>
      <div className=" mt-5">
        <h3 className=" text-gray-600 font-semibold text-lg mb-5 lg:text-2xl">
          Delivery Option
        </h3>
      </div>
      <div className="mx-auto bg-white border border-gray-300 rounded-md overflow-hidden">
        {deliveryOptions &&
          deliveryOptions.map((option, index) => (
            <AccordionItem
              key={option.id}
              title={option.name}
              isOpen={openItem === index}
              onToggle={() => handleToggle(index)}
              text={`₦${formatPrice(option.price)}`}
            >
              <p className="text-gray-700 bg-[#F9FAFB] text-xs p-[15px]">
                {option.description}
              </p>
            </AccordionItem>
          ))}
      </div>
      {/* <PaystackCheckout cartItems={cart} customerEmail={session?.user?.email} /> */}
    </>
  );
};

export default DeliveryMethod;
