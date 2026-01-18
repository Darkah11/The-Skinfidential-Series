import { useAppSelector } from "@/redux/hooks";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import { Trash2, X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "./Button";
import { formatPrice } from "@/utils/formatters";

interface ChildProps {
  onUpdate: () => void;
}

export default function CartMenu({ onUpdate }: ChildProps) {
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const cart = useAppSelector((state) => state.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const handleClose = () => {
    onUpdate();
  };
  useEffect(() => {
    const total = cart.reduce(
      (sum, product) => sum + Number(product.price) * product.quantity,
      0
    );
    setSubtotalPrice(total);
  }, [cart]);

  return (
    <div className=" text-primary-100 fixed top-0 right-0 h-screen w-full z-50">
      <div
        onClick={handleClose}
        className=" absolute w-full h-full top-0 right-0"
      />

      {/* <div className=" bg-white max-w-[300px] h-[50px] relative ml-auto right-5 top-[80px] shadow-xl"> */}
      <div className=" bg-white max-w-[380px] md:top-[75px] md:h-[calc(100vh-75px)] flex flex-col justify-between ml-auto relative h-full top-0 md:border md:rounded-3xl md:border-gray-200  md:right-5 shadow-xl px-5 pt-10">
        <button
          onClick={handleClose}
          className=" absolute top-3 left-3 md:hidden"
        >
          <X />
        </button>
        <div className=" flex justify-between items-center border-b border-gold pb-3">
          <h3 className=" text-2xl font-semibold">My Cart ({cart.length})</h3>
          <button
            onClick={() => dispatch(clearCart())}
            className=" text-accent underline hover:no-underline transition-all duration-300"
          >
            clear cart
          </button>
        </div>
        <div className=" flex flex-col flex-1 ">
          {cart &&
            cart.map((item) => (
              <div
                key={item.id}
                className=" flex items-center gap-x-3 py-3 border-b border-gold"
              >
                <div>
                  <Image
                    src={`${item.imageUrl}`}
                    width={300}
                    height={500}
                    alt="product image"
                    className=" w-[60px] aspect-[4/5] object-cover rounded-md"
                  />
                </div>
                <div className=" flex-1 flex flex-col gap-y-3">
                  <div className=" flex justify-between">
                    <p className=" text-sm font-medium capitalize text-black">
                      {item.name}
                    </p>
                    <button onClick={() => dispatch(removeFromCart(item.id))}>
                      <Trash2 className=" w-5 text-accent" />{" "}
                    </button>
                  </div>
                  <div className=" flex justify-between ">
                    <p className=" text-sm font-bold capitalize">
                      ₦{formatPrice(item.price)}
                    </p>
                    <div className=" flex items-center">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className=" w-[20px] h-[20px] border border-gray-300 flex justify-center items-center"
                      >
                        <Minus className=" w-3" />
                      </button>
                      <span className="text-[10px] w-[20px] h-[20px] border-y border-gray-300 flex justify-center items-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className=" w-[20px] h-[20px] border border-gray-300 flex justify-center items-center"
                      >
                        <Plus className=" w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className=" w-full">
          <div className=" flex flex-col gap-y-2 py-3  border-t border-gold">
            <div className=" flex items-center justify-between">
              <p className=" text-gray-600 text-sm">Subtotal</p>
              <p className="  text-sm font-semibold">
                ₦{formatPrice(subtotalPrice)}
              </p>
            </div>
            <div className=" flex items-center justify-between">
              <p className=" text-gray-600 text-sm">Delivery Fee</p>
              <p className="  text-sm font-semibold">
                ₦{cart.length > 0 ? formatPrice(5000) : formatPrice(0)}
              </p>
            </div>
          </div>
          <div className=" flex flex-col gap-y-4 py-3  border-t border-gold">
            <div className=" flex items-center justify-between">
              <p className=" font-medium">Total</p>
              <p className=" text-lg font-semibold">
                ₦
                {cart.length > 0
                  ? formatPrice(subtotalPrice + 5000)
                  : formatPrice(0)}
              </p>
            </div>
            <PrimaryButton
              text="Procced to Checkout"
              style=" bg-primary-100 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
