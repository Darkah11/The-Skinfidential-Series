"use client";

import { clearCart } from "@/redux/slices/cartSlice";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import success from "../../../../public/mark.png";
import { PrimaryButton } from "@/components/Button";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const router = useRouter();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("verifying");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const sendNotification = async (orderNumber: string) => {
    await fetch("/api/sendOrderNotification", {
      method: "POST",
      body: JSON.stringify({ orderNumber }),
      headers: { "Content-Type": "application/json" },
    });
  };

  useEffect(() => {
    if (!reference) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/paystack/verify?reference=${reference}`);
        const data = await res.json();
        console.log(data);

        if (data.success) {
          if (!data.existing) {
            sendNotification(data.orderNumber);
          }
          setOrderNumber(data.orderNumber);
          dispatch(clearCart());
          setStatus("success");
          // optional: redirect to order page
          // router.push(`/orders/${reference}`);
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [reference, router]);

  return (
    <div className=" min-h-[calc(100vh-75px)] flex flex-col justify-center items-center">
      {/* <DotLottieReact src="https://lottiefiles.com/free-animation/success-56EqqIzm6f" loop autoplay /> */}
      <div className="">
        <Image src={success} alt="success icon" className=" w-24" />
      </div>
      <h2 className=" mt-7 text-4xl text-primary-100 font-semibold">
        Payment Succesful
      </h2>
      <div className=" text-sm text-gray-600 mt-3 max-w-[350px] mx-auto text-center">
        {status === "verifying" && <p>Verifying payment…</p>}
        {status === "success" && (
          <p>
            Payment verified! Your order is confirmed 🎉.
            <br />
            Your order number is {orderNumber && orderNumber}
          </p>
        )}
        {status === "failed" && (
          <p>Payment verification failed. Please contact support. </p>
        )}
      </div>
      <div className=" flex items-center gap-x-5 mt-5">
        <Link href={"/"}>
          <PrimaryButton
            text="Go Home"
            style=" bg-primary-100 w-auto px-8 rounded-md"
          />
        </Link>
        <Link href={"/orders"}>
          <PrimaryButton
            text="Go to Orders"
            style=" bg-accent w-auto px-8 rounded-md"
          />
        </Link>
      </div>
      {status === "success" && <div className=" flex items-center mt-5 gap-3">
        <p>Contact Us?</p>
        <div>
          <Link
            href={`https://wa.me/09139120360?text=Hi there, I just made an order.\n Order Number: ${orderNumber}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className=" bg-green-600 text-white flex items-center gap-1 px-3 py-2 rounded-md">
              <FaWhatsapp className=" text-white" />
              Whatsapp
            </button>
          </Link>
        </div>
      </div>}
    </div>
  );
}
