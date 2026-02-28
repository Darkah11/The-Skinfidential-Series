// import { Dialog, DialogPanel } from "@headlessui/react";
import { Category } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/logo.png";
import { ChevronDownIcon, X } from "lucide-react";
import { User } from "@/types/user";

interface MyComponentProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  user: User | null
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about-us" },
  // { name: "Admin", href: "/admin/dashboard" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function UserMobileMenu({
  isOpen,
  onClose,
  categories,
  user
}: MyComponentProps) {
  const [openCategories, setOpenCategories] = useState(false);
  return (
    <div
      className={` z-50 fixed top-0 left-0 h-[100dvh] w-full transition-all duration-300 md:hidden ${
        isOpen ? " visible" : " invisible"
      }`}
    >
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={` overflow-y-auto no-scrollbar relative top-0 flex flex-col left-0 h-full w-64 px-2 bg-white py-4 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8 px-3">
          <Link href={"/"} className=" flex items-center gap-2">
            <Image src={logo} alt="tss logo" className=" w-10" />
            <h1 className=" leading-none text-xs font-bold">
              The <br />
              Skinfidential <br /> Series
            </h1>
          </Link>
          <button
            onClick={onClose}
            className=" hover:rotate-90 transition-transform duration-300"
          >
            <X className=" text-black " />
          </button>
        </div>

        <div className="">
          <div className=" flex flex-col">
            {navLinks.map((link) => (
              <Link
                onClick={onClose}
                key={link.name}
                href={link.href}
                className="text-black p-3 hover:text-gold border-b border-gold/50"
              >
                {link.name}
              </Link>
            ))}
            {user && user.role === "admin" && (
              <Link
                onClick={onClose}
                href={"/admin/dashboard"}
                className="text-black p-3 hover:text-gold border-b border-gold/50"
              >
                Admin
              </Link>
            )}
          </div>

          <div>
            {/* Dropdown button */}
            <button
              onClick={() => setOpenCategories((prev) => !prev)}
              className="flex items-center justify-between w-full px-3 py-2 mt-3 font-medium"
            >
              Categories
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform duration-300 ${
                  openCategories ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openCategories ? " opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="ml-3 flex flex-col">
                {categories.map((item) => (
                  <Link
                    key={item.name}
                    onClick={() => {
                      onClose();
                      setOpenCategories(false);
                    }}
                    href={{
                      pathname: "/categories",
                      query: { category: item.name },
                    }}
                    className="text-gray-600 p-2 hover:text-black"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
