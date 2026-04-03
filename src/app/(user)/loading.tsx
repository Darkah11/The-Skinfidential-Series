import React from "react";
import logo from "@/../public/logo.png";
import Image from "next/image";

export default function loading() {
  return (
    <div className=" h-screen flex justify-center items-center text-accent ">
      <Image src={logo} alt="logo" className=" w-20 h-20 animate-scale-logo" />
    </div>
  );
}
