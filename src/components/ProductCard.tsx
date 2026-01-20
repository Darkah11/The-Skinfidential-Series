import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AddToCartBtn } from "./Button";
import { ProductWithId } from "@/types/products";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
// import { useAppSelector } from "@/redux/hooks";
import { formatPrice } from "@/utils/formatters";

interface MyComponentProps {
  product: ProductWithId;
}

export default function ProductCard({ product }: MyComponentProps) {
  const dispatch = useDispatch();
  // const cart = useAppSelector((state) => state.cart);
  return (
    <Link href={`/product/${product.slug}`}>
      <div className=" flex flex-col h-full group transition-all duration-500 group shadow-lg rounded-lg overflow-hidden">
        <div>
          <Image
            src={`${product.imageUrl}`}
            width={300}
            height={500}
            alt="product image"
            className=" w-full aspect-[3/4] group-hover:w-[150%]"
          />
        </div>
        <div className=" relative  flex flex-col flex-grow justify-between px-3 py-5  bg-white">
          {/* <AddToCartBtn style=" absolute right-3 -top-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500" /> */}
          <p className=" capitalize text-black text-sm font-medium transition-all duration-300">
            {product.name}
          </p>
          <div className=" flex justify-between items-center mt-[5px]">
            <p className=" font-bold text-sm">₦{formatPrice(product.price)}</p>
            <div className=" absolute md:relative md:top-0 md:right-0 -top-[15px] right-3">
              <AddToCartBtn
                handleClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addToCart({
                      ...product,
                      quantity: 1,
                      subtotal: product.price,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
