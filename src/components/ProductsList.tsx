"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { ProductWithId } from "@/types/products";

interface MyComponentProps {
  products: ProductWithId[];
}

export default function ProductsList({ products }: MyComponentProps) {
  const [grid, setGrid] = useState<number>(2);
  const [orderBy, setOrderBy] = useState<string>("default");

  const sortedProducts = useMemo(() => {
    if (!products) return [];

    const sorted = [...products];

    switch (orderBy) {
      // case "alphabetical":
      //   return sorted.sort((a, b) =>
      //     (a.name || "").localeCompare(b.name || ""),
      //   );

      case "latest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime(),
        );

      case "price-low":
        return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

      case "price-high":
        return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

      default:
        return sorted.sort((a, b) =>
          (a.name || "").localeCompare(b.name || ""),
        );
    }
  }, [products, orderBy]);

  // 2. ONLY SHOW WHAT'S CURRENTLY LOADED
  // const visibleProducts = sortedProducts.slice(0, visibleCount);
  // const hasMore = visibleCount < sortedProducts.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(12);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const rows = sortedProducts.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(sortedProducts.length / rowsPerPage);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div>
      {/* Header */}
      <div className=" flex items-center justify-between" ref={scrollRef}>
        <h3 className=" block w-full lg:w-auto text-2xl md:text-3xl font-semibold">
          Products
        </h3>

        <div className=" lg:flex items-center lg:justify-between lg:w-auto">
          {/* Grid controls */}
          <div className=" hidden lg:flex items-center gap-x-3 px-7 text-[13px] font-medium">
            <p>VIEW</p>
            <button
              onClick={() => setGrid(0)}
              className={grid === 0 ? "border-b-2 border-black" : undefined}
            >
              2
            </button>
            <button
              onClick={() => setGrid(1)}
              className={grid === 1 ? "border-b-2 border-black" : undefined}
            >
              3
            </button>
            <button
              onClick={() => setGrid(2)}
              className={grid === 2 ? "border-b-2 border-black" : undefined}
            >
              4
            </button>
          </div>

          {/* Sorting */}
          <div className=" relative lg:px-7 lg:border-l-2 flex items-center order-2 lg:order-none">
            <select
              value={orderBy}
              onChange={(e) => {
                setOrderBy(e.target.value);
              }}
              className=" cursor-pointer lg:px-0 lg:text-center text-right bg-transparent w-[190px] box-content md:text-sm text-xs outline-none p-0 font-semibold text-gray-600"
            >
              <option>DEFAULT SORTING</option>
              {/* <option value="alphabetical">Sort by alphabetical</option> */}
              <option value="latest">Sort by latest</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      {rows.length > 0 ? (
        <>
          <div
            className={` grid ${
              grid === 0
                ? "lg:grid-cols-2"
                : grid === 1
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-4"
            } grid-cols-2 gap-y-8 gap-x-3 mt-10`}
          >
            {rows.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={nPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <div className=" w-full h-40 flex items-center justify-center">
          <p>There are no products available</p>
        </div>
      )}
    </div>
  );
}
