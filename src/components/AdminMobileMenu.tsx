import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdDashboard, MdLogout, MdOutlineDashboard } from "react-icons/md";
import logo from "../../public/logo.png";

interface MyComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function AdminMobileMenu({ isOpen, onClose }: MyComponentProps) {
  const pathname = usePathname();
  return (
    <div
      className={` z-50 fixed top-0 left-0 h-screen w-full transition-all duration-300 lg:hidden ${
        isOpen ? " visible" : " invisible"
      }`}
    >
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={` relative top-0 flex flex-col left-0 h-full w-64 px-2 bg-primary-100 py-4 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <Link onClick={onClose} href={"/"} className=" flex items-center gap-2">
            <Image src={logo} alt="tss logo" className=" w-10" />
            <h1 className=" text-white leading-none text-xs font-bold">
              The <br />
              Skinfidential <br /> Series
            </h1>
          </Link>
          <button
            onClick={onClose}
            className=" hover:rotate-90 transition-transform duration-300"
          >
            <X className=" text-white " />
          </button>
        </div>

        <div className=" mt-10 flex grow justify-between flex-col flex-1">
          <div className=" space-y-2">
            {navLinks.map((link) => {
              // const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={`
                         h-[48px] grow items-center gap-2 rounded-md text-sm font-medium flex justify-start p-2 px-3
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

                  <p className="">{link.name}</p>
                </Link>
              );
            })}
          </div>
          {/* <div className="hidden h-auto w-full grow rounded-md md:block"></div> */}
          <button className=" hover:text-gold text-white flex items-center gap-x-1">
            {" "}
            <MdLogout /> <p>Log out</p>{" "}
          </button>
        </div>
      </aside>
    </div>
  );
}
