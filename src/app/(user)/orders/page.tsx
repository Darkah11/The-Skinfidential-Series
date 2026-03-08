import Container from "@/components/Container";
import OrderList from "@/components/OrderList";
import { getOrdersByUserId } from "@/utils/firebase";
import { getSessionUser } from "@/utils/users";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Orders() {
  const user = await getSessionUser();
  if (!user) redirect("/");
  const orders = await getOrdersByUserId(user.uid);
  return (
    <div>
      <Container className=" relative px-5 lg:px-12 xl:px-24 py-16 text-primary-100 ">
        <div>
          <h2 className=" uppercase text-xl md:text-3xl font-semibold">
            My Orders
          </h2>
          <div className=" mt-5">
            <OrderList orders={orders} />
          </div>
        </div>
      </Container>
    </div>
  );
}
