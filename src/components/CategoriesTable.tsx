"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CategoryWithId } from "@/types/products";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/formatters";
import { deleteCategory, getProductsByCategory } from "@/utils/firebase";

interface MyComponentProps {
  categories: CategoryWithId[];
}

export default function CategoriesTable({ categories }: MyComponentProps) {
  //   const handleDelete = async (id) => {
  //     const res = await fetch("http://localhost:4000/bloglist/" + id, {
  //       method: "DELETE",
  //     });
  //     if (res.ok) {
  //       router.refresh();
  //     }
  //   };
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [search] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const rows = categories.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(categories.length / rowsPerPage);
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
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    await deleteCategory(id);
  };
  const filtered = categories.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
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

  useEffect(() => {
    const load = async () => {
      const results = await Promise.all(
        categories.map(async (cat) => {
          const products = await getProductsByCategory(cat.name);
          return [cat.name, products.length] as const;
        }),
      );

      setCounts(Object.fromEntries(results));
    };

    load();
  }, [categories]);
  return (
    <>
      <div className="flex w-full md:justify-between md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search categories..."
            value={search}
            // onChange={(e) => setSearch(e.target.value)}
            className="pl-9 shadow-md border border-gray-200 py-2 h-[40px] w-full rounded-full"
          />
        </div>
        <Link href={"/admin/categories/add-category"}>
          <button className=" w-[40px] h-[40px] md:h-auto md:w-auto flex items-center justify-center md:gap-1 bg-accent md:px-4 md:py-2 text-white rounded-full text-sm">
            <Plus className=" w-4 h-4" />
            <span className=" hidden md:block">Add Category</span>
          </button>
        </Link>
      </div>
      <div className=" hidden lg:block mt-10">
        <table className=" w-full bg-white table-container rounded-t-xl">
          <thead className=" bg-gold text-primary-100 ">
            <tr>
              <th className=" border-r text-left p-4 rounded-tl-xl font-semibold">
                Category
              </th>
              <th className=" border-r text-left p-4 font-semibold">
                No of Products
              </th>
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
                  {item.name}
                </td>
                <td className=" border-r p-4 border-t capitalize text-sm font-semibold">
                  {counts[item.name] ?? "Loading..."}
                </td>
                <td className=" border-r p-4 border-t text-xs">
                  {formatDate(item.createdAt ?? "0")}
                </td>
                <td className=" p-4 border-t">
                  <div className=" flex flex-row gap-2">
                    <Link href={`/admin/categories/edit-category/${item.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button onClick={(e) => handleDelete(e, item.id)}>
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

          <ul className=" flex gap-[2px]">
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
      </div>
      <div className="lg:hidden flex flex-col gap-3 py-5 text-primary-100">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border p-4 shadow-sm flex flex-col gap-3 product-row"
          >
            <div className=" flex-1 flex flex-col gap-2">
              <p className=" capitalize text-sm font-semibold">
                {product.name}
              </p>
              <p className=" text-sm">
                {counts[product.name] ?? "..."} products
              </p>

              <div className="flex items-center justify-between">
                <p className=" text-sm">
                  {" "}
                  {formatDate(product.createdAt ?? "0")}
                </p>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/categories/edit-category/${product.id}`}>
                    <button className="rounded-xl p-1">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </Link>
                  <button
                    className="rounded-xl p-1"
                    onClick={(e) => handleDelete(e, product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
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
