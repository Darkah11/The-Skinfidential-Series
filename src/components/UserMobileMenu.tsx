// import { Dialog, DialogPanel } from "@headlessui/react";
import { Category } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo.png";
import { X } from "lucide-react";

interface MyComponentProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about-us" },
  { name: "Admin", href: "/admin/dashboard" },
  { name: "Contact", href: "/contact" },
];

export default function UserMobileMenu({
  isOpen,
  onClose,
  categories,
}: MyComponentProps) {
  return (
    <div
      className={` z-50 fixed top-0 left-0 h-screen w-full transition-all duration-300 md:hidden ${
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
        className={` no-scrollbar overflow-y-auto relative top-0 left-0 h-full w-72 bg-white py-6 transform transition-transform duration-300 ${
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
          </div>

          {/* Mobile categories */}
          <div>
            <p className="font-semibold mt-3 px-3">Categories</p>
            <div className="ml-3 flex flex-col ">
              {categories.map((item) => (
                <Link
                  onClick={onClose}
                  key={item.name}
                  href={{
                    pathname: "/categories",
                    query: { category: item.name },
                  }}
                  className="text-gray-600 p-2"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
