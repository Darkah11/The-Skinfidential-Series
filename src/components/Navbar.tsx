"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import bag from "../../public/icons/bag.svg";
import userIcon from "../../public/icons/user.svg";
import menu from "../../public/icons/menu.svg";
import search from "../../public/icons/search.svg";
import { PrimaryButton } from "./Button";
import Container from "@/components/Container";
import { useAppSelector } from "@/redux/hooks";
import CartMenu from "./CartMenu";
import { Category } from "@/types/products";
import UserMobileMenu from "./UserMobileMenu";
import SearchProduct from "./SearchProducts";
import UserMenu from "./UserMenu";
import { User } from "@/types/user";

interface MyComponentsProps {
  categories: Category[];
  user: User | null;
}
export default function Navbar({ categories, user }: MyComponentsProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const closeCart = () => {
    setCartOpen(false);
  };
  const closeSearch = () => {
    setSearchOpen(false);
  };
  const closeUserMenu = () => {
    setUserMenu(false);
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
              <Link href={"/"} className=" flex items-center gap-2">
                <Image src={logo} alt="tss logo" className=" w-10" />
                <h1 className=" hidden lg:block leading-none text-xs font-bold">
                  The <br />
                  Skinfidential <br /> Series
                </h1>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className=" md:hidden"
              >
                <Image src={menu} alt=" menu icon" className=" w-10" />
              </button>

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
                  <Link
                    href={"/about-us"}
                    className=" text-sm hover:text-primary-50"
                  >
                    About Us
                  </Link>
                </li>
                {!user && (
                  <li>
                    <Link
                      href={"/contact-us"}
                      className=" text-sm hover:text-primary-50"
                    >
                      Contact Us
                    </Link>
                  </li>
                )}
                {user && user.role === "admin" && (
                  <li>
                    <Link
                      href={"/admin/dashboard"}
                      className=" text-sm hover:text-primary-50"
                    >
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className=" flex items-center gap-[10px]">
              <button onClick={() => setSearchOpen(!searchOpen)}>
                <Image src={search} alt="search icon" className=" w-7" />
              </button>
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
              {user ? (
                <button onClick={() => setUserMenu(true)}>
                  <Image src={userIcon} alt="user icon" className=" w-7" />
                </button>
              ) : (
                <Link href={"/sign-in"}>
                  <PrimaryButton
                    text="Sign In"
                    style=" bg-accent block h-fit md:h-auto md:py-[10px] md:rounded-full py-[6px] px-2 rounded-full"
                  />
                </Link>
              )}
              {user && (
                <PrimaryButton
                  text="Contact Us"
                  style=" bg-accent hidden md:block rounded-full"
                />
              )}
            </div>
          </nav>
        </Container>
      </header>
      {cartOpen && <CartMenu onUpdate={closeCart} />}
      {searchOpen && <SearchProduct onUpdate={closeSearch} />}
      {userMenu && <UserMenu onUpdate={closeUserMenu} user={user} />}
      <UserMobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={categories}
        user={user}
      />
    </>
  );
}
