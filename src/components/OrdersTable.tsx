"use client";
import { useState } from "react";
import { formatDate, formatPrice } from "@/utils/formatters";
import { OrderWithId } from "@/types/order";
import ViewOrder from "./ViewOrder";

interface MyComponentProps {
  orders: OrderWithId[];
}

export default function OrdersTable({ orders }: MyComponentProps) {
  //   const handleDelete = async (id) => {
  //     const res = await fetch("http://localhost:4000/bloglist/" + id, {
  //       method: "DELETE",
  //     });
  //     if (res.ok) {
  //       router.refresh();
  //     }
  //   };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const rows = orders.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(orders.length / rowsPerPage);
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
  const filtered = orders.filter((p) =>
    p.orderNumber.toLowerCase().includes(search.toLowerCase()),
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
  return (
    <>
      {/* <div className="flex w-full md:justify-between md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search products..."
            value={search}
            // onChange={(e) => setSearch(e.target.value)}
            className="pl-9 shadow-md border border-gray-200 py-2 h-[40px] w-full rounded-full"
          />
        </div>
        <Link href={"/admin/products/add-product"}>
          <button className=" w-[40px] h-[40px] md:h-auto md:w-auto flex items-center justify-center md:gap-1 bg-accent md:px-4 md:py-2 text-white rounded-full text-sm">
            <Plus className=" w-4 h-4" />
            <span className=" hidden md:block">Add Product</span>
          </button>
        </Link>
      </div> */}
      <div className=" hidden lg:block mt-10">
        <table className=" w-full bg-white table-container rounded-t-xl">
          <thead className=" bg-gold text-primary-100 ">
            <tr>
              <th className=" border-r text-left p-4 rounded-tl-xl font-semibold">
                Order Number
              </th>
              <th className=" border-r text-left p-4 font-semibold">
                Full Name
              </th>
              <th className=" border-r text-left p-4 font-semibold">Status</th>
              <th className=" border-r text-left p-4 font-semibold">
                Total Price
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
                  {item.orderNumber}
                </td>
                <td className=" border-r border-t p-4 capitalize font-medium text-sm">
                  {item.billing.last_name + " " + item.billing.first_name}
                </td>
                <td className=" border-r border-t p-4 capitalize font-semibold text-xs text-center">
                  <span
                    className={` ${item.status === "cancelled" ? "text-red-600" : item.status === "completed" ? "text-green-600" : "text-blue-600"} bg-gray-200 py-1 px-2 rounded-md mx-auto`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className=" border-r p-4 border-t capitalize text-sm font-semibold">
                  ₦{formatPrice(item.amount)}
                </td>
                <td className=" border-r p-4 border-t text-xs">
                  {/* {formatDate(item.createdAt ?? "0")} */}
                  {formatDate(item.createdAt)}
                </td>
                <td className=" p-4 border-t">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedId(item.id);
                    }}
                    className=" text-sm font-medium  px-3 py-1 bg-primary-100 text-white rounded-md"
                  >
                    View Order
                  </button>
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
        {filtered.map((order) => (
          <div
            key={order.id}
            onClick={() => {
              setIsModalOpen(true);
              setSelectedId(order.id);
            }}
            className=" cursor-pointer rounded-2xl border p-4 shadow-sm flex flex-col gap-3 product-row"
          >
            <div className=" flex items-center gap-3">
              <div className=" flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{order.orderNumber}</p>
                  <p
                    className={` ${order.status === "cancelled" ? "text-red-600" : order.status === "completed" ? "text-green-600" : "text-blue-600"} bg-gray-200 py-1 px-2 rounded-md text-sm`}
                  >
                    {order.status}
                  </p>
                </div>
                <p className=" capitalize text-sm">
                  {" "}
                  ₦{formatPrice(order.amount)}
                </p>
                <p className=" text-sm text-gray-600 mt-2">
                  {formatDate(order.createdAt)} from{" "}
                  {order.billing.last_name + " " + order.billing.first_name}
                </p>
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
      <ViewOrder
        isOpen={selectedId !== null && isModalOpen}
        onClose={() => setSelectedId(null)}
        orderId={selectedId}
      />
    </>
  );
}
