"use client";

import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const [status, setStatus] = useState<string>("");

  //   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     setStatus("Sending...");

  //     const formData = new FormData(e.currentTarget);

  //     formData.append("access_key", "ee93823f-a106-49fe-9708-17930d6fc857");

  //     const object = Object.fromEntries(formData);
  //     const json = JSON.stringify(object);

  //     const response = await fetch("https://api.web3forms.com/submit", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: json,
  //     });

  //     const result = await response.json();

  //     if (result.success) {
  //       setStatus("Message sent successfully!");
  //       e.currentTarget.reset();
  //     } else {
  //       setStatus("Something went wrong. Please try again.");
  //     }
  //   }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget; // ✅ store reference BEFORE async
    setStatus("Sending...");

    const formData = new FormData(form);
    formData.append("access_key", "ee93823f-a106-49fe-9708-17930d6fc857");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Message sent successfully!");
        form.reset(); // ✅ use stored reference
        setTimeout(() => {
          setStatus("");
        }, 3000);
      } else {
        setStatus("Something went wrong. Please try again.");
        setTimeout(() => {
          setStatus("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setStatus("Network error. Please try again.");
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  }

  return (
    <div className=" text-primary-100">
      <div className=" max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        {/* LEFT SIDE */}
        <div className=" relative">
          <h2 className="text-5xl md:text-6xl lg:text-8xl mb-6 font-semibold">
            Contact Us
          </h2>

          <p className="text-gray-600 mb-12 max-w-md">
            Please feel free to contact us and we will get back to you as soon
            as we can.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                className="w-full bg-transparent border-b border-gold py-2 focus:outline-none focus:border-primary-50/50 transition"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full bg-transparent border-b border-gold outline-gold py-2 focus:outline-none focus:border-primary-50/50 transition"
              />
            </div>

            {/* Reason Select */}
            <div>
              <select
                name="reason"
                required
                className="w-full bg-transparent border-b border-gold py-2 focus:outline-none focus:border-primary-50/50 transition text-black"
              >
                <option value="">Select Reason</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Project Request">Product Recommendation</option>
                <option value="Support">Delivery Inquiry</option>
                <option value="Partnership">Consultation</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                required
                placeholder="Message"
                rows={1}
                className="w-full bg-transparent border-b border-gold py-2 focus:outline-none focus:border-primary-50/50 transition resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/80 text-white py-3 transition"
            >
              Send
            </button>

            {status && (
              <p className=" absolute -bottom-7 left-0 text-sm text-gray-400">
                {status}
              </p>
            )}
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-12 md:mt-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Visit us</h3>
            <p className="text-gray-600">
              Gbemisola Street, Road 6, Ikere-Ekiti, <br /> Ekiti State, Nigeria
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2">Talk to us</h3>
            <p className="text-gray-600">
              +234 913 912 0360 <br />
              theskinfidentialseries@gmail.com
            </p>
          </div>

          <div className="flex gap-6 text-primary-100">
            <Link
              href="https://www.tiktok.com/@theskinfidentialseries?_r=1&_t=ZS-92og7vRblk0"
              target="_blank"
              className="hover:text-accent transition"
            >
              <FaTiktok className=" text-3xl" />
            </Link>
            <Link
              href="https://www.instagram.com/_theskinfidentialseries?igsh=ZGd2N3NjOW5oN2p1"
              target="_blank"
              className="hover:text-accent transition"
            >
              <FaInstagram className=" text-3xl" />
            </Link>
            <Link
              href="https://wa.me/message/AVYNQP6NXUTIM1"
              target="_blank"
              className="hover:text-accent transition"
            >
              <FaWhatsapp className=" text-3xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
