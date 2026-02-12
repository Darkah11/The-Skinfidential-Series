"use client"; 

import Image from "next/image";
import { MdOutlineDashboard, MdDashboard, MdLogout } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menu from "../../public/icons/menu.svg";
import logo from "../../public/logo.png";
import AdminMobileMenu from "./AdminMobileMenu";
import { useState } from "react";

const navLinks = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: <MdOutlineDashboard />,
    activeIcon: <MdDashboard />,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: <MdOutlineDashboard />,
    activeIcon: <MdDashboard />,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: <MdOutlineDashboard />,
    activeIcon: <MdDashboard />,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: <MdOutlineDashboard />,
    activeIcon: <MdDashboard />,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: <MdOutlineDashboard />,
    activeIcon: <MdDashboard />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <MdOutlineDashboard />,
    activeIcon: <MdDashboard />,
  },
];

export default function SideNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
 
  

  return (
    <>
      <div className="hidden h-full lg:flex lg:flex-col px-3 py-4 lg:px-2 bg-primary-100">
        <Link className=" flex items-center gap-2" href="/">
          <Image src={logo} alt="tss logo" className=" w-10" />
          <h1 className=" block text-white leading-none text-xs font-bold">
            The <br />
            Skinfidential <br /> Series
          </h1>
        </Link>
        <div className="hidden mt-10 md:flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          {navLinks.map((link) => {
            // const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`
                flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3
                ${
                  pathname.includes(link.href)
                    ? "bg-gold text-primary-100 hover:text-white"
                    : " text-white hover:text-gold"
                }
              `}
              >
                <p className=" text-lg">
                  {pathname.includes(link.href) ? link.activeIcon : link.icon}
                </p>

                <p className="hidden md:block">{link.name}</p>
              </Link>
            );
          })}
          <div className="hidden h-auto w-full grow rounded-md md:block"></div>
          <button className=" hover:text-gold text-white flex items-center gap-x-1">
            {" "}
            <MdLogout /> <p>Log out</p>{" "}
          </button>
        </div>
      </div>
      <button onClick={() => setMobileMenuOpen(true)} className=" lg:hidden absolute top-2.5 left-5">
        <Image src={menu} alt=" menu icon" className=" w-10" />
      </button>
      <AdminMobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
