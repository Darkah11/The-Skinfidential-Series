import Container from "@/components/Container";
import ProductsList from "@/components/ProductsList";
import { getCategories, getProductsByCategory } from "@/utils/firebase";
import Image from "next/image";
import React from "react";
import categoryBg from ".././../../../public/category-bg.jpg";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categoryName =
    typeof params.category === "string"
      ? params.category
      : Array.isArray(params.category)
        ? params.category[0]
        : undefined;
  const products = await getProductsByCategory(categoryName);
  const categories = await getCategories();
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
                {categoryName ? categoryName.toLocaleLowerCase() : "categories"}
              </p>
            </div>
            <h2 className=" text-4xl lg:text-6xl font-bold text-gold">
              {categoryName ? categoryName : "Categories"}
            </h2>
            <p className=" mt-3 max-w-[450px] text-sm lg:text-base ">
              Explore our{" "}
              {categoryName ? categoryName?.toLowerCase() : "products"} with a
              variety of top-rated items tailored to your needs.
            </p>
          </div>
          <div className=" absolute w-full h-full top-0 left-0 bg-black/60 z-10" />
          <Image
            src={categoryBg}
            alt="hero banner for categories"
            className=" absolute top-0 left-0 w-full h-full object-cover"
          />
        </Container>
      </section>
      <section>
        <Container className=" relative  px-5 lg:px-12 xl:px-24 py-16 text-primary-100">
          {categoryName ? (
            <div>
              <ProductsList products={products} />
            </div>
          ) : (
            <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {
                categories.map((category) => (
                  <Link
                    href={{
                      pathname: "/categories",
                      query: { category: category.name },
                    }}
                    key={category.createdAt}
                    className=" bg-gold/40 rounded-md block px-4 py-4 hover:text-gold hover:bg-primary-100 whitespace-nowrap"
                  >
                    {category.name}
                  </Link>
                ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
