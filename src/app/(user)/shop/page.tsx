import React from "react";
import ProductsList from "@/components/ProductsList";
import { getProducts } from "@/utils/firebase";
import Container from "@/components/Container";
import Image from "next/image";
import shopBg from ".././../../../public/shop-bg.jpg";
import Link from "next/link";
import ConsultUs from "@/components/ConsultUs";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Shop() {
  const products = await getProducts();
  return (
    <>
      <section>
        <Container className=" relative px-5 lg:px-12 xl:px-24    text-primary-100 h-[350px] flex items-end ">
          <div className=" py-16 relative z-30 mt-auto text-white">
            <div className=" flex items-center gap-x-3 mb-7">
              <Link href={"/"} className=" text-sm font-medium hover:text-gold">
                Home
              </Link>
              <p className=" text-sm">›</p>
              <p className=" text-sm text-gray-300">
                shop
              </p>
            </div>
            <h2 className=" text-4xl lg:text-6xl font-bold text-gold">
              Shop
            </h2>
            <p className=" mt-3 max-w-[450px] text-sm lg:text-base ">
              Explore our shop with a
              variety of top-rated items tailored to your needs.
            </p>
          </div>
          <div className=" absolute w-full h-full top-0 left-0 bg-black/60 z-10" />
          <Image
            src={shopBg}
            alt="hero banner for categories"
            className=" absolute top-0 left-0 w-full h-full object-cover"
          />
        </Container>
      </section>
      <section>
        <Container className=" relative  px-5 lg:px-12 xl:px-24 py-16 text-primary-100">
          <div>
            <ProductsList products={products} />
          </div>
        </Container>
      </section>
      <section>
        <ConsultUs />
      </section>
    </>
  );
}
