import React from "react";
import Container from "./Container";
import Image from "next/image";
import consultUs from "../../public/consult-us.jpg";
import Link from "next/link";
import { GoldButton } from "./Button";

export default function ConsultUs() {
  return (
    <Container className="  relative  text-white bg-primary-50">
      <div className=" md:flex ">
        <Image
          src={consultUs}
          alt=" image of a skincare product"
          className=" order-2 w-full max-h-[450px] md:w-1/2 md:max-h-[400px] object-cover"
        />
        <div className=" order-1 px-3 py-5 md:w-1/2 flex justify-center md:px-8">
          <div className=" max-w-[500px] m-auto  md:text-right">
            <h3 className=" text-gold text-2xl lg:text-4xl font-semibold">
              Need Help?
            </h3>
            <p className=" text-sm mt-2 lg:text-base">
              Experience skincare support at a higher standard. We’re here to
              assist you with expert advice and carefully evaluated
              recommendations. Our team is available to guide and assist you
              through your journey to getting an exceptional skin.
            </p>
            <Link href={"/contact-us"}>
              <GoldButton
                text="Consult Us"
                style=" bg-gold mt-5 text-primary-100"
              />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
