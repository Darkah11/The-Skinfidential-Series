"use client";
import Container from "@/components/Container";
import { ProductWithId } from "@/types/products";
import { formatPrice } from "@/utils/formatters";
import { Ban, CircleCheckBig, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddToCartBtn } from "./Button";
import { addToCart } from "@/redux/slices/cartSlice";
import Link from "next/link";
import link from "../../public/link.png"
import facebook from "../../public/facebook.png"
import whatsapp from "../../public/whatsapp.png"
import xtwitter from "../../public/xtwitter.png"

interface MyComponentProps {
  product: ProductWithId;
}

export default function ProductDetails({ product }: MyComponentProps) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const handleIncrement = () =>
    setQty((prev) => (qty < product.stock ? prev + 1 : prev));
  const handleDecrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <section>
      <Container className=" relative  px-5 lg:px-12 xl:px-24 py-16">
        <div className=" flex flex-col md:flex-row gap-x-10 md:items-center">
          <div className=" md:w-1/2">
            <Image
              src={`${product.imageUrl}`}
              width={300}
              height={500}
              alt="product image"
              className=" w-full aspect-[3/4] max-w-[450px]"
            />
          </div>
          <div className=" mt-10 md:w-1/2 md:mt-0">
            <div className=" text-sm text-gray-600">
              <p className=" inline font-semibold">Categories: </p>
              <p className=" inline">
                {product.categories.map((category, index) =>
                  index === 0 ? category : `, ${category}`,
                )}
              </p>
            </div>
            <div className=" mt-3 text-primary-100">
              <h2 className=" capitalize  font-bold text-4xl lg:text-5xl">
                {product?.name}
              </h2>
              <p className=" text-xl font-semibold mt-2">
                ₦{formatPrice(product.price)}
              </p>
            </div>
            <div className=" mt-5">
              <p className=" font-semibold lg:text-lg">Description</p>
              <p className=" text-gray-600 text-sm lg:text-base">
                {product.description}
              </p>
            </div>
            <div className=" mt-5">
              <p className=" font-medium">
                {product.stock > 0 ? (
                  <CircleCheckBig className=" text-green-600 inline" />
                ) : (
                  <Ban className=" text-red-600 inline " />
                )}{" "}
                In Stock:{" "}
                <span className=" font-normal text-gray-600">
                  {product.stock}
                </span>
              </p>
            </div>
            <div className="flex items-center mt-5">
              <button
                onClick={handleDecrement}
                className="w-[30px] h-[30px] bg-primary-100 border border-gray-300 flex justify-center items-center"
              >
                <Minus className="w-3 text-white" />
              </button>

              <span className="text-[10px] w-[30px] h-[30px] border-y border-gray-300 flex justify-center items-center">
                {qty}
              </span>

              <button
                onClick={handleIncrement}
                className="w-[30px] h-[30px] bg-primary-100 border border-gray-300 flex justify-center items-center"
              >
                <Plus className="w-3 text-white" />
              </button>
            </div>
            <div className=" mt-5">
              <p className=" text-s text-gray-600">Share this Product</p>
              <div className=" flex items-center gap-x-3">
                <Link href={"/"}>
                  <Image src={xtwitter}  alt="x logo" className=" w-8"/>
                </Link>
                <Link href={"/"}>
                  <Image src={facebook}  alt="facebook logo" className=" w-8"/>
                </Link>
                <Link href={"/"}>
                  <Image src={whatsapp}  alt="whatsapp logo" className=" w-8"/>
                </Link>
                <Link href={"/"}>
                  <Image src={link}  alt="link logo" className=" w-8"/>
                </Link>
              </div>
            </div>
            <div className=" mt-5">
              <AddToCartBtn
                handleClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addToCart({
                      ...product,
                      quantity: qty,
                      subtotal: product.price * qty,
                    }),
                  );
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
