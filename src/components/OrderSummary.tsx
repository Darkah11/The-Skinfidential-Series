"use client";
import { useAppSelector } from "@/redux/hooks";
import { formatPrice } from "@/utils/formatters";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import dropdown from "../../public/dropdown.svg";
import { updateTotal } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";

interface MyComponentProps {
  tax: number | undefined;
}

export default function OrderSummary({ tax }: MyComponentProps) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const cart = useAppSelector((state) => state.cart);
  const total = useAppSelector((state) => state.total);
  const deliveryOption = useAppSelector((state) => state.deliveryOption);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const total = cart.reduce(
      (sum, product) => sum + Number(product.price) * product.quantity,
      0,
    );
    setSubtotalPrice(total);
  }, [cart]);
  useEffect(() => {
    const safeTax: number = tax ?? 0;
    dispatch(
      updateTotal(
        subtotalPrice + (safeTax / 100) * subtotalPrice + deliveryOption.price,
      ),
    );
  }, [subtotalPrice, deliveryOption, cart, tax]);

  return (
    <>
      <div className="accordion-item block lg:hidden">
        <button
          className="accordion-title"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
        >
          <div className=" flex items-center gap-x-1">
            <span className=" text-gray-600 text-sm md:text-base">
              Show order summary
            </span>
            <Image
              src={dropdown}
              alt="dropdown icon"
              className={`w-4 h-4 transition-all duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
          <span className=" text-sm font-semibold text-primary-100">
            ₦{formatPrice(total)}
          </span>
        </button>
        <div
          ref={contentRef}
          className="accordion-content"
          style={{
            maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          }}
        >
          <div className="accordion-text ">
            <div className="flex flex-col gap-y-5 border-b pb-4 border-gold">
              {cart.map((item) => (
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
                    <p className=" text-gray-600 capitalize text-sm font-semibold">
                      {item.name}{" "}
                      {item.hasVariants &&
                        item.variants &&
                        `(${item.selectedVariant?.name})`}
                    </p>
                    <p className=" text-sm text-primary-100  font-semibold mt-2">
                      ₦{formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className=" py-4 border-b border-gold">
              <div className={`flex items-center justify-between gap-x-5`}>
                <input
                  placeholder="Coupon code"
                  type="text"
                  className=" px-3 bg-white h-10 border bg-transparent outline-none flex-1"
                />
                <button className=" h-10 font-semibold text-[13px] bg-gray-300 px-7">
                  APPLY
                </button>
              </div>
            </div>
            <div className=" py-4 border-b border-gold">
              <div className=" text-xs flex items-center text-primary-100 justify-between">
                <p className=" font-semibold text-gray-600">SUBTOTAL:</p>
                <p className=" text-sm font-semibold">
                  ₦{formatPrice(subtotalPrice)}
                </p>
              </div>
              <div className=" text-xs flex items-center text-primary-100 justify-between mt-4">
                <p className=" font-semibold text-gray-600">DELIVERY:</p>
                <p className="text-sm font-semibold">
                  ₦{formatPrice(deliveryOption.price)}
                </p>
              </div>
              <div className=" text-xs flex items-center text-primary-100 justify-between mt-4">
                <p className=" font-semibold text-gray-600">
                  TAX({tax ?? 0}%):
                </p>
                <p className="text-sm font-semibold">
                  ₦
                  {cart.length > 0
                    ? formatPrice(((tax ?? 0) / 100) * subtotalPrice)
                    : formatPrice(0)}
                </p>
              </div>
            </div>
            <div className=" py-7 border-b border-gold text-xs flex items-center text-primary-100 justify-between">
              <p className=" font-semibold text-gray-600">TOTAL:</p>
              <p className="  text-base font-bold">
                ₦{cart.length > 0 ? formatPrice(total) : formatPrice(0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-text hidden lg:block">
        <div className="flex flex-col gap-y-5 border-b pb-4 border-gold">
          {cart.map((item) => (
            <div key={item.id} className=" flex items-center gap-x-5">
              <div className=" relative">
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
              <div>
                <p className=" text-gray-600 capitalize text-sm font-semibold">
                  {item.name}{" "}
                  {item.hasVariants &&
                    item.variants &&
                    `(${item.selectedVariant?.name})`}
                </p>
                <p className=" text-sm text-primary-100 mt-2 font-semibold">
                  ₦{formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className=" py-4 border-b border-gold">
          <div className={`flex items-center justify-between gap-x-5`}>
            <input
              placeholder="Coupon code"
              type="text"
              className=" px-3 bg-white h-10 border bg-transparent outline-none flex-1"
            />
            <button className=" h-10 font-semibold text-[13px] bg-accent text-white px-7">
              APPLY
            </button>
          </div>
        </div>
        <div className=" py-4 border-b border-gold">
          <div className=" text-xs flex items-center text-primary-100 justify-between">
            <p className=" font-semibold text-gray-600">SUBTOTAL:</p>
            <p className=" text-sm font-semibold">
              ₦{formatPrice(subtotalPrice)}
            </p>
          </div>
          <div className=" text-xs flex items-center text-primary-100 justify-between mt-4">
            <p className=" font-semibold text-gray-600">DELIVERY:</p>
            <p className="text-sm font-semibold">
              ₦{formatPrice(deliveryOption.price)}
            </p>
          </div>
          <div className=" text-xs flex items-center text-primary-100 justify-between mt-4">
            <p className=" font-semibold text-gray-600">TAX({tax ?? 0}%):</p>
            <p className="text-sm font-semibold">
              ₦
              {cart.length > 0
                ? formatPrice(((tax ?? 0) / 100) * subtotalPrice)
                : formatPrice(0)}
            </p>
          </div>
        </div>
        <div className=" py-7 border-b border-gold text-xs flex items-center text-primary-100 justify-between">
          <p className=" font-semibold text-gray-600">TOTAL:</p>
          <p className="  text-base font-bold">
            ₦
            {cart.length > 0
              ? // ? formatPrice(subtotalPrice + ((7.5 / 100) * subtotalPrice) + deliveryOption.price)
                formatPrice(total)
              : formatPrice(0)}
          </p>
        </div>
      </div>
    </>
  );
}
