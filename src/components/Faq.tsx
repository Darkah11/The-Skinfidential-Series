"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: "01",
    question: "How do I place an order?",
    answer: `Placing your order with us is simple and seamless. 
Browse our carefully curated skincare collections, select your desired products and add to cart, proceed to checkout, enter your shipping and payment details, review your order and then click “place order” 
You’ll receive an order confirmation email shortly after your purchase.`,
  },
  {
    id: "02",
    question: "How can I track my order?",
    answer: `Once your order has been shipped, you’ll receive a confirmation email with a tracking link. `,
  },
  {
    id: "03",
    question: "Can I return my items I got on sales? ",
    answer: `All skincare products purchased at sales rate are not valid for an exchange or return. This also applies to clearance items. `,
  },
  {
    id: "04",
    question: "What is your return and exchange policy?",
    answer: `To initiate a return, please contact our customer service team at theskinfidentialseries@gmail.com within 7 days of receiving your order. You will be provided with instructions on how to return your item. 
If you also wish to exchange a product, follow the same process as for returns. Exchanges are subjected to product availability. 
Customers are responsible for the cost of returns and exchanges shipping. `,
  },
  {
    id: "05",
    question: "Eligibility for Returns/Refund? ",
    answer: `We only offer refunds in cases where a customer pays for a product that is out of stock. In all other cases, refunds aren’t applicable. 
We only accept returns or exchanges for products that are unused, unopened, and in their original packaging. `,
  },
  {
    id: "06",
    question: "Where’s your location? ",
    answer: "Akungba-Akoko, Ondo State, Nigeria.",
  },
  {
    id: "07",
    question: "Do you ship internationally?  ",
    answer: `Yes, we proudly offer international shipping to many countries around the world. 
Feel free to contact our support team at theskinfidentialseries@gmail.com to help out with your order.`,
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10">
      <div className="mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className=" cursor-pointer"
              onClick={() => toggle(index)}
            >
              {/* Question Row */}
              <div
                className={`${openIndex === index ? " rounded-t-xl " : "rounded-xl"} bg-gray-50 transition-all duration-300 px-6 py-3  flex items-center justify-between gap-4`}
              >
                <div className="flex gap-4">
                  <span className="text-gray-400 font-medium">{faq.id}</span>
                  <p className="font-medium">{faq.question}</p>
                </div>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Answer */}
              <div
                className={`grid transition-all duration-300 bg-gray-50 ease-in-out rounded-b-xl ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100 px-6 py-5"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
