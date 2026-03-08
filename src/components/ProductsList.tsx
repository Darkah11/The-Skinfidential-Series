"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductWithId } from "@/types/products";

interface MyComponentProps {
  products: ProductWithId[];
}

export default function ProductsList({ products }: MyComponentProps) {
  const [grid, setGrid] = useState<number>(2);
  const [orderBy, setOrderBy] = useState<string>("default");
  const [visibleCount, setVisibleCount] = useState(20);

  // 1. SORT PRODUCTS
  const sortedProducts = useMemo(() => {
    if (!products) return [];

    const sorted = [...products];

    switch (orderBy) {
      case "alphabetical":
        return sorted.sort((a, b) =>
          (a.name || "").localeCompare(b.name || ""),
        );

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
        return sorted;
    }
  }, [products, orderBy]);

  // 2. ONLY SHOW WHAT'S CURRENTLY LOADED
  // const visibleProducts = sortedProducts.slice(0, visibleCount);
  // const hasMore = visibleCount < sortedProducts.length;
  const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const lastIndex = currentPage * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    const rows = products.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(products.length / rowsPerPage);
    //   const numbers = [...Array(nPage + 1).keys()].slice(1);
    const numbers = Array.from({ length: nPage }, (_, i) => i + 1);
  
    function prevPage() {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    }
    function nextPage() {
      if (currentPage !== nPage) {
        setCurrentPage(currentPage + 1);
      }
    }
    // const filtered = products.filter((p) =>
    //   p.name.toLowerCase().includes(search.toLowerCase()),
    // );
    function handlePage(id: number) {
      setCurrentPage(id);
    }
    function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
      const value = e.target.value;
      if (value == "10") {
        setRowsPerPage(10);
      } else if (value == "20") {
        setRowsPerPage(20);
      } else if (value == "30") {
        setRowsPerPage(30);
      } else if (value == "40") {
        setRowsPerPage(40);
      } else if (value == "50") {
        setRowsPerPage(50);
      } else {
        setRowsPerPage(10);
      }
    }

  // 3. INFINITE SCROLL LOGIC
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const nearBottom =
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

  //     if (nearBottom && hasMore) {
  //       setVisibleCount((prev) => prev + 20);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasMore]);

  return (
    <div>
      {/* Header */}
      <div className=" flex items-center justify-between">
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
                setVisibleCount(20);
              }}
              className=" cursor-pointer lg:px-0 lg:text-center text-right bg-transparent w-[190px] box-content md:text-sm text-xs outline-none p-0 font-semibold text-gray-600"
            >
              <option value="default">DEFAULT SORTING</option>
              <option value="alphabetical">Sort by alphabetical</option>
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

          <div className=" mt-8 flex justify-center">

          <ul className=" flex gap-2">
            <li>
              <button
                className="bg-gray-100 min-w-[25px] min-h-[30px] p-1 rounded-md"
                onClick={prevPage}
              >
                {"<"}
              </button>
            </li>
            {numbers.map((n, i) => (
              <li key={i}>
                <button
                  className={
                    currentPage == n
                      ? "bg-primary-100 text-white min-w-[25px] min-h-[30px] p-1 rounded-md"
                      : "bg-gray-100 min-w-[25px] min-h-[30px] p-1 rounded-md"
                  }
                  onClick={() => handlePage(n)}
                >
                  {n}
                </button>
              </li>
            ))}
            <li>
              <button
                className="bg-gray-100 min-w-[25px] min-h-[30px] p-1 rounded-md"
                onClick={nextPage}
              >
                {">"}
              </button>
            </li>
          </ul>
        </div>
        </>
      ) : (
        <div className=" w-full h-40 flex items-center justify-center">
          <p>There are no products available</p>
        </div>
      )}
    </div>
  );
}
