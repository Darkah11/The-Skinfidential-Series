"use client";
import Link from "next/link";
import { useState } from "react";
import { ProductWithId } from "@/types/products";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { formatDate, formatPrice } from "@/utils/formatters";
import { deleteProduct } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

interface MyComponentProps {
  products: ProductWithId[];
}

export default function ProductsTable({ products }: MyComponentProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const rows = filtered.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(filtered.length / rowsPerPage);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    imagePublicId?: string,
  ) => {
    await deleteProduct(id, imagePublicId);
    router.refresh();
  };
  
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
  return (
    <>
      <div className="flex w-full md:justify-between md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 shadow-md border outline-none border-gray-200 py-2 h-[40px] w-full rounded-full"
          />
        </div>
        <Link href={"/admin/products/add-product"}>
          <button className=" w-[40px] h-[40px] md:h-auto md:w-auto flex items-center justify-center md:gap-1 bg-accent md:px-4 md:py-2 text-white rounded-full text-sm">
            <Plus className=" w-4 h-4" />
            <span className=" hidden md:block">Add Product</span>
          </button>
        </Link>
      </div>
      <div className=" hidden lg:block mt-10">
        <table className=" w-full bg-white table-container rounded-t-xl">
          <thead className=" bg-gold text-primary-100 ">
            <tr>
              <th className=" border-r text-left p-4 rounded-tl-xl font-semibold">
                Product
              </th>
              <th className=" border-r text-left p-4 font-semibold">
                Categories
              </th>
              <th className=" border-r text-left p-4 font-semibold">Price</th>
              <th className=" border-r text-left p-4 font-semibold">
                Created At
              </th>
              <th className=" text-left p-4 rounded-tr-xl font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {rows.map((item) => (
              <tr key={item.id} className=" table-row">
                <td className=" border-r border-t p-4 capitalize font-semibold text-sm">
                  <div className=" flex items-center gap-2">
                    <Image
                      src={`${item.imageUrl}`}
                      width={300}
                      height={500}
                      alt="product image"
                      className=" w-[20px] aspect-[3/4]"
                    />
                    {item.name}
                  </div>
                </td>
                <td className=" border-r p-4 border-t capitalize text-xs">
                  {item.categories.map((category, index) =>
                    index === 0 ? category : `, ${category}`,
                  )}
                </td>
                <td className=" border-r p-4 border-t capitalize text-sm font-semibold">
                  ₦{formatPrice(item.price)}
                </td>
                <td className=" border-r p-4 border-t text-xs">
                  {formatDate(item.createdAt ?? "0")}
                </td>
                <td className=" p-4 border-t">
                  <div className=" flex flex-row gap-2">
                    <Link href={`/admin/products/edit-product/${item.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={(e) =>
                        handleDelete(e, item.id, item.imagePublicId)
                      }
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" bg-white border-t p-4 rounded-br-xl rounded-bl-xl flex justify-between pagination">
          <div>
            <label htmlFor="rows" className=" text-xs">
              Showing
              <select
                name="rows"
                id="rows"
                className=" p-1 border  bg-transparent mx-1 text-xs font-semibold rounded-md outline-none"
                onChange={handleSelect}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              of 50
            </label>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={nPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <div className="lg:hidden flex flex-col gap-3 py-5 text-primary-100">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border p-4 shadow-sm flex flex-col gap-3 product-row"
          >
            <div className=" flex items-center gap-3">
              <div>
                <Image
                  src={`${product.imageUrl}`}
                  width={300}
                  height={500}
                  alt="product image"
                  className=" w-[45px] aspect-[3/4]"
                />
              </div>
              <div className=" flex-1 flex flex-col gap-2">
                <p className=" capitalize text-sm">{product.name}</p>

                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">
                    {" "}
                    ₦{formatPrice(product.price)}
                  </p>

                  <div className="flex items-center gap-2">
                    <Link href={`/admin/products/edit-product/${product.id}`}>
                      <button className="rounded-xl p-1">
                        <Pencil className="h-4 w-4" />
                      </button>
                    </Link>
                    <button
                      className="rounded-xl p-1"
                      onClick={(e) =>
                        handleDelete(e, product.id, product.imagePublicId)
                      }
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
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
    </>
  );
}
