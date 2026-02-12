"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import bag from "../../public/icons/bag.svg";
import user from "../../public/icons/user.svg";
import menu from "../../public/icons/menu.svg";
import search from "../../public/icons/search.svg";
import { PrimaryButton } from "./Button";
import Container from "@/components/Container";
import { useAppSelector } from "@/redux/hooks";
import CartMenu from "./CartMenu";
import { Category } from "@/types/products";
import UserMobileMenu from "./UserMobileMenu";

interface MyComponentsProps {
  categories: Category[];
}
export default function Navbar({ categories }: MyComponentsProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const closeCart = () => {
    setCartOpen(false);
  };
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (cartOpen) {
        document.body.classList.remove("no-scroll-menu");
        document.body.classList.add("no-scroll");
      } else if (mobileMenuOpen) {
        document.body.classList.add("no-scroll-menu");
      } else {
        document.body.classList.remove("no-scroll");
        document.body.classList.remove("no-scroll-menu");
      }
    }
  }, [cartOpen, mobileMenuOpen]);
  return (
    <>
      <header className="">
        <Container className=" fixed top-0 left-0 right-0 w-full bg-white z-50 shadow-lg">
          <nav className=" px-5 lg:px-12 xl:px-24 py-4 flex justify-between">
            <div className=" flex items-center gap-x-3 md:gap-x-10 lg:gap-x-12">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className=" md:hidden"
              >
                <Image src={menu} alt=" menu icon" className=" w-10" />
              </button>
              <Link href={"/"} className=" flex items-center gap-2">
                <Image src={logo} alt="tss logo" className=" w-10" />
                <h1 className=" hidden lg:block leading-none text-xs font-bold">
                  The <br />
                  Skinfidential <br /> Series
                </h1>
              </Link>

              <ul className=" hidden  md:flex items-center gap-x-7 h-full">
                {/* <li>
                  <Link href={"/"} className=" text-sm hover:text-primary-50">
                    Home
                  </Link>
                </li> */}
                <li>
                  <Link
                    href={"/shop"}
                    className=" text-sm hover:text-primary-50"
                  >
                    Shop
                  </Link>
                </li>

                {/* <li></li> */}
                <li className="relative group h-full ">
                  <Link
                    href={""}
                    className=" flex items-center h-full text-sm hover:text-primary-50"
                  >
                    Categories +
                  </Link>

                  <div className="fixed left-0 top-[63px] pt-5 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-3 w-screen">
                    {categories &&
                      categories.map((category) => (
                        <Link
                          href={{
                            pathname: "/categories",
                            query: { category: category.name },
                          }}
                          key={category.createdAt}
                          className=" border-r border-r-gold block px-4 py-2 hover:text-gold hover:bg-primary-100 whitespace-nowrap"
                        >
                          {category.name}
                        </Link>
                      ))}
                  </div>
                </li>
                <li>
                  <Link href={"/"} className=" text-sm hover:text-primary-50">
                    About Us
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
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className=" relative"
              >
                <Image src={bag} alt="bag icon" className=" w-7" />
                {cart.length > 0 && (
                  <span className=" absolute -top-[3px] -right-[5px] p-1 rounded-full text-white bg-accent text-[10px] w-[18px] h-[18px] leading-none text-center py-1 ">
                    {cart.length}
                  </span>
                )}
              </button>
              <Link href={"/"}>
                <Image src={user} alt="user icon" className=" w-7" />
              </Link>
              <PrimaryButton
                text="Contact"
                style=" bg-accent hidden md:block"
              />
            </div>
          </nav>
        </Container>
      </header>
      {cartOpen && <CartMenu onUpdate={closeCart} />}
      <UserMobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={categories}
      />
    </>
  );
}
