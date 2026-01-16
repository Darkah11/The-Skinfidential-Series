import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import logo from "../../public/logo.png";
import Image from "next/image";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className=" bg-primary-100 text-white">
      <Container className=" relative  px-5 lg:px-12 xl:px-24 py-10">
        <div className="">
          {/* Top grid */}
          <div className="flex flex-col md:flex-row gap-10 lg:gap-24">
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              {/* Logo */}
              <Link href={""} className=" flex items-center gap-2">
                <Image src={logo} alt="tss logo" className=" w-16" />
                <h1 className=" leading-none text-base font-bold">
                  The <br />
                  Skinfidential <br /> Series
                </h1>
              </Link>

              <p className="text-sm max-w-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates, natus. Tenetur accusamus nesciunt cum molestiae?
              </p>
            </div>

            <div className=" flex flex-col md:flex-row md:justify-between md:flex-1 gap-x-3 gap-y-7">
              <div className="">
                <h4 className="font-semibold mb-4 text-lg ">Pages</h4>
                <ul className="space-y-3 text-sm text-gray-300 ">
                  <li>
                    <Link href="#" className="hover:text-gold">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gold">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gold">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gold">
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <h4 className="font-semibold mb-4 text-lg">Products</h4>
                <ul className="space-y-3 text-sm text-gray-300 ">
                  <li>
                    <Link href="#" className="hover:text-gold">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gold">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gold">
                      Brand
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <h4 className="font-semibold mb-4 text-lg">Company</h4>
                <ul className="space-y-3 text-sm text-gray-300 ">
                  <li>
                    <Link href="#" className="hover:text-gold">
                      Tiktok
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gold">
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gold">
                      X
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-gold">
                      Whatsapp
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gold mt-10 pt-6 text-sm text-center md:text-right text-gray-300">
            {/* Copyright */}
            <p>© 2026 The Skinfidential Series. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
