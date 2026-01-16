"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  text: string;
  image: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Cameron Williamson",
    text: "Skena.co delivers exceptional fashion with a perfect blend of style, quality, and affordability. Trendy pieces for every occasion, making it my go-to fashion destination!",
    image: "/avatar.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Johnson",
    text: "Amazing customer service and beautiful designs. I always get compliments whenever I wear their outfits.",
    image: "/avatar.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Daniel Roberts",
    text: "High-quality fabrics and fast delivery. I'm impressed with every order I've made so far.",
    image: "/avatar.jpg",
    rating: 4,
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  const t = testimonials[index];

  return (
    <section className="py-16 text-center text-primary-100">
      <div className="max-w-3xl mx-auto px-4">
        {/* Heading */}

        {/* Carousel */}
        <div className="relative mt-12 flex items-center justify-center">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-0 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>

          {/* Card */}
          <div className="flex flex-col items-center text-center max-w-xl">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={t.image}
                alt={t.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mt-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < t.rating ? "text-gold" : "text-gray-300"}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Text */}
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t.text}
            </p>

            {/* Name */}
            <p className="mt-4 font-semibold ">{t.name}</p>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-0 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
