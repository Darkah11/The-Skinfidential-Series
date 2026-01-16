import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo.png";
import bag from "../../public/icons/bag.svg";
import user from "../../public/icons/user.svg";
import menu from "../../public/icons/menu.svg";
import search from "../../public/icons/search.svg";
import { PrimaryButton } from "./Button";
import Container from "@/components/Container";

export default function Navbar() {
  return (
    <header className=" ">
      <Container className=" fixed top-0 left-0 right-0 w-full z-50">
        <nav className=" px-5 lg:px-12 xl:px-24 py-4 flex justify-between items-center">
          <div className=" flex items-center gap-x-3 md:gap-x-10 lg:gap-x-12">
            <button className=" md:hidden">
              <Image src={menu} alt=" menu icon" className=" w-10" />
            </button>
            <Link href={""} className=" flex items-center gap-2">
              <Image src={logo} alt="tss logo" className=" w-10" />
              <h1 className=" hidden lg:block leading-none text-xs font-bold">
                The <br />
                Skinfidential <br /> Series
              </h1>
            </Link>

            <ul className=" hidden  md:flex items-center gap-x-7">
              <li>
                <Link href={"/"} className=" text-sm hover:text-primary-50">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/"} className=" text-sm hover:text-primary-50">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={"/"} className=" text-sm hover:text-primary-50">
                  Shop
                </Link>
              </li>
              <li>
                <Link href={"/"} className=" text-sm hover:text-primary-50">
                  Categories +
                </Link>
              </li>
              <li>
                <Link
                  href={"/admin/dashboard"}
                  className=" text-sm hover:text-primary-50"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          <div className=" flex items-center gap-[10px]">
            <Link href={"/"}>
              <Image src={search} alt="search icon" className=" w-7" />
            </Link>
            <Link href={"/"}>
              <Image src={bag} alt="bag icon" className=" w-7" />
            </Link>
            <Link href={"/"}>
              <Image src={user} alt="user icon" className=" w-7" />
            </Link>
            <PrimaryButton
              text="Contact"
              style=" bg-primary-100 hidden md:block"
            />
          </div>
        </nav>
      </Container>
    </header>
  );
}
