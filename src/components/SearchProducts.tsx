"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import search from "@/public/search.svg";
import { RotatingCircle } from "./Loader";
import Link from "next/link";
import { ProductWithId } from "@/types/products";
import { Search } from "lucide-react";
import { getProducts } from "@/utils/firebase";

interface ChildProps {
  onUpdate: () => void;
}

export default function SearchProduct({ onUpdate }: ChildProps) {
  //   const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
//   const [result, setResult] = useState<ProductWithId[]>([]);
  const [products, setProducts] = useState<ProductWithId[]>([]);

//   const handleChange = async (searchValue: string) => {
//     setLoading(true);
//     const WC_CONSUMER_KEY = "ck_04408803c1536f95baa86e49100a654db5b25b14";
//     const WC_CONSUMER_SECRET = "cs_eaa504db24f2e0d1cbe4973220c4aaca083ff0cc";
//     const WC_BASE_URL = "https://nomarkbackend.kotafuz.com";
//     const WC_API_URL = "/wp-json/wc/v3";

//     const credentials = `${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`;
//     const auth = window.btoa(credentials);
//     const requestOptions = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Basic ${auth}`,
//       },
//     };
//     const url = `${WC_BASE_URL}${WC_API_URL}${`/products?search=${searchValue}`}`;

//     const response = await fetch(url, requestOptions);
//     const products = await response.json();
//     setResult(products);
//     setLoading(false);
//     console.log(products);
//   };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(value.toLowerCase())
  );

//   useEffect(() => {
//     if (debouncedQuery && debouncedQuery.length >= 3) {
//       handleChange(debouncedQuery);
//     } else {
//       setResult([]);
//       setLoading(false);
//     }
//   }, [debouncedQuery]);
  const getAllProducts = async () => {
    setLoading(true)
    const products = await getProducts();
    setProducts(products);
    setLoading(false)
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const formatPrice = (price: string | number) => {
    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
      return "N/A";
    }

    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(numericPrice);
  };

  return (
    <div className=" z-50 fixed top-0 left-0 w-full  h-screen">
      <div
        className={"block absolute h-full w-full top-0 left-0 bg-black/80"}
        onClick={onUpdate}
      />
      <div
        className={
          "relative top-10 z-50 w-[350px] mx-auto transition-all duration-500 h-10"
        }
      >
        <div className=" absolute top-0 left-0 w-10 h-full flex justify-center items-center">
          {loading ? <RotatingCircle /> : <Search className=" text-white" />}
        </div>
        <input
          onChange={(e) => setValue(e.target.value)}
          //   onClick={() => setSearchActive(true)}
          type="text"
          placeholder="type to search.."
          className={` w-full h-full bg-transparent border pl-10 outline-none text-white  
             border-gold rounded-sm placeholder:text-white placeholder:opacity-40`}
        />

        {value.length >= 3 && filteredProducts.length > 0 ? (
          <div className=" absolute top-[55px] left-0 w-full flex flex-col gap-y-3 bg-white p-3">
            {filteredProducts.map((product) => (
              <Link onClick={onUpdate} key={product.id} href={`/product/${product.slug}`}>
                <div className=" flex gap-x-5 items-center">
                  <Image
                    src={`${product.imageUrl}`}
                    width={300}
                    height={500}
                    alt="product image"
                    className=" w-[50px] object-cover aspect-[3/4]"
                  />
                  <div>
                    <p className=" text-sm font-medium text-gray-600">{product.name}</p>
                    <p className="text-sm font-semibold text-primary-100 mt-2">
                      ₦{formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : value.length >= 3 && !loading && filteredProducts.length === 0 ? (
          <p className=" bg-white mt-5 p-4">No result found</p>
        ) : null}
      </div>
    </div>
  );
}
