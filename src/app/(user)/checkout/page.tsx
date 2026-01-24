import React from "react";
import CheckoutDetails from "@/components/CheckoutDetails";
import OrderSummary from "@/components/OrderSummary";
import Container from "@/components/Container";
import DeliveryMethod from "@/components/DeliveryMethod";
import { getDeliveryOptions } from "@/utils/firebase";

export default async function CheckoutPage() {
  const deliveryOptions = await getDeliveryOptions();
  return (
    <>
      <section>
        <Container className=" relative px-5 lg:px-12 xl:px-24 pt-5 lg:pt-0">
          <h2 className=" lg:hidden text-3xl font-bold text-primary-100">
            Checkout
          </h2>
          <div className=" lg:flex">
            <div className=" lg:order-2 lg:w-[40%] lg:pl-12 lg:sticky lg:top-0 lg:self-start pt-10 lg:py-24">
              <h3 className=" text-2xl font-semibold hidden lg:block text-gray-600">
                YOUR ORDER
              </h3>
              <OrderSummary />
            </div>
            <div className=" lg:py-12 lg:border-r border-gold py-16 lg:mt-0 lg:order-1 lg:w-[60%] lg:pr-12">
              <h2 className="hidden lg:block text-4xl font-bold text-primary-100">
                Checkout
              </h2>
              <div>
                <DeliveryMethod deliveryOptions={deliveryOptions} />
                <CheckoutDetails />
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* </main> */}
    </>
  );
}
