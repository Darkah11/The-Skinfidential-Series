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
    question: "What size should I order for clothing?",
    answer:
      "We recommend checking our size guide on each product page to find your perfect fit.",
  },
  {
    id: "02",
    question: "How can I track my order status?",
    answer: "Once your order ships, you'll receive a tracking link via email.",
  },
  {
    id: "03",
    question: "Do you offer international shipping options?",
    answer: "Yes, we ship internationally to most countries worldwide.",
  },
  {
    id: "04",
    question: "What is your return and exchange policy?",
    answer: "You can return or exchange items within 14 days of delivery.",
  },
  {
    id: "05",
    question: "How can I cancel my order?",
    answer: "Orders can be cancelled within 24 hours of placement.",
  },
  {
    id: "06",
    question: "Are the products on sale final sale?",
    answer:
      "Sale items are final and not eligible for returns unless defective.",
  },
  {
    id: "07",
    question: "Do you offer gift cards for purchases?",
    answer: "Yes, we offer digital gift cards you can send to loved ones.",
  },
  {
    id: "08",
    question: "How do I care for my garments?",
    answer: "Always follow the washing instructions on the garment label.",
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
                className={`${openIndex === index ? ' rounded-t-xl ' : 'rounded-xl'} bg-gray-50 transition-all duration-300 px-6 py-3  flex items-center justify-between gap-4`}
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
