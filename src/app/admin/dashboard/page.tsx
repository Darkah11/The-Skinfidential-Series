import AdminHeader from "@/components/AdminHeader";
import { getCategories, getOrders, getProducts } from "@/utils/firebase";
import { formatPrice } from "@/utils/formatters";
import { getAllUsers } from "@/utils/users";
import React from "react";

export default async function Dashboard() {
  const products = await getProducts();
  const categories = await getCategories();
  const orders = await getOrders();
  const { users } = await getAllUsers();
  const totalSales = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.amount, 0);
  const grossProfit = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => {
      const orderProfit = order.cart.reduce((cartSum, item) => {
        const revenue = item.price * item.quantity;
        const cost = item.costPrice ?? 0 * item.quantity;
        return cartSum + (revenue - cost);
      }, 0);
      return sum + orderProfit;
    }, 0);

  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Dashboard" />
      <div className=" w-full flex-1 bg-app-card overflow-x-auto px-5 py-10">
        <h2 className=" text-3xl font-semibold text-primary-100 my-auto">
          Welcome to Admin!
        </h2>
        <div className=" mt-5 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3">
          <div className=" bg-gold/20 px-5 py-5 border border-gold">
            <h3 className=" text-gray-600 text-xl font-semibold">
              Total Products
            </h3>
            <p className=" text-primary-100 text-xl font-bold mt-2">
              {products.length}
            </p>
          </div>
          <div className=" bg-gold/20 px-5 py-5 border border-gold">
            <h3 className=" text-gray-600 text-xl font-semibold">
              Total Categories
            </h3>
            <p className=" text-primary-100 text-xl font-bold mt-2">
              {categories.length}
            </p>
          </div>
          <div className=" bg-gold/20 px-5 py-5 border border-gold">
            <h3 className=" text-gray-600 text-xl font-semibold">Orders</h3>
            <p className=" text-primary-100 text-xl font-bold mt-2">
              {orders.length}
            </p>
          </div>
          <div className=" bg-gold/20 px-5 py-5 border border-gold">
            <h3 className=" text-gray-600 text-xl font-semibold">Customers</h3>
            <p className=" text-primary-100 text-xl font-bold mt-2">
              {users.length}
            </p>
          </div>
        </div>
        <div className=" mt-5">
          <h3 className=" text-gray-600 font-semibold text-2xl">Analytics</h3>
          <div className=" mt-3 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3">
            <div className=" bg-gold/20 px-5 py-5 border border-gold">
              <h3 className=" text-gray-600 text-xl font-semibold">
                Total Sales
              </h3>
              <p className=" text-primary-100 text-xl font-bold mt-2">
                ₦{formatPrice(totalSales)}
              </p>
            </div>
            <div className=" bg-gold/20 px-5 py-5 border border-gold">
              <h3 className=" text-gray-600 text-xl font-semibold">
                Gross Profit
              </h3>
              <p className=" text-primary-100 text-xl font-bold mt-2">
                ₦{formatPrice(grossProfit)}
              </p>
            </div>
            <div className=" bg-gold/20 px-5 py-5 border border-gold">
              <h3 className=" text-gray-600 text-xl font-semibold">
                Website Visits
              </h3>
              <p className=" text-primary-100 text-xl font-bold mt-2">120</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
