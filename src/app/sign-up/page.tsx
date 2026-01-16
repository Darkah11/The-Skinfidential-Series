import Image from "next/image";
import React from "react";
import lineBg from "../../../public/line-bg.png";
import sideImage from "../../../public/register.jpg";
import LoginForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className=" h-screen main ">
      <div className=" h-full lg:flex lg:justify-between ">
        <div className=" lg:w-1/2  px-5 lg:px-0 relative min-h-full">
          <Image
            src={lineBg}
            alt="line image"
            className=" absolute bg-fixed -z-10 top-0 left-0 w-full h-full object-cover opacity-40"
          />
          <SignUpForm />
        </div>
        <div className=" h-full lg:w-1/2  hidden lg:block sticky top-0">
          <Image
            src={sideImage}
            alt="login image"
            className=" h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
