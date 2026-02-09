"use client";
import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { ProductWithId } from "@/types/products";
import Image from "next/image";


interface MyComponentProps {
  products: ProductWithId[];
}
export default function AdminProductsPage({ products }: MyComponentProps) {
  const [search] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  //   const handleDelete = (id) => {
  //     setProducts((prev) => prev.filter((p) => p.id !== id));
  //   };

  return (
    <div className="w-full p-4 md:p-6">
      <div className="rounded-2xl ">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-xl font-semibold">Popular Products</div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search products..."
                value={search}
                // onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>

            <button className="rounded-xl flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        </div>

        <div className=" mt-5">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/40 text-left text-sm">
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">Price</th>
                  <th className="px-6 py-3 font-medium">Created At</th>
                  <th className="px-6 py-3 font-medium text-center">Edit</th>
                  <th className="px-6 py-3 font-medium text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t hover:bg-muted/30 transition"
                  >
                    <td className="px-6 py-4 font-medium flex items-center gap-2 capitalize">
                      <Image
                        src={`${product.imageUrl}`}
                        width={300}
                        height={500}
                        alt="product image"
                        className=" w-[20px] aspect-[3/4]"
                      />
                      {product.name}
                    </td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {product.createdAt}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        // variant="ghost"
                        // size="icon"
                        className="rounded-full"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        // variant="ghost"
                        // size="icon"
                        className="rounded-full"
                        // onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-3 p-4">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border p-4 shadow-sm flex flex-col gap-3"
              >
                <div>
                  <h3 className="font-semibold text-base">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created: {product.createdAt}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">${product.price}</span>

                  <div className="flex items-center gap-2">
                    <button
                      //   variant="outline"
                      //   size="icon"
                      className="rounded-xl"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      //   variant="outline"
                      //   size="icon"
                      className="rounded-xl"
                      //   onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-6">
                No products found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
