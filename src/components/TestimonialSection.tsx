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
    name: "Faith Ayodele",
    text: `I’ve noticed improvement in my skin since I started following TheSkinfidentialSeries' recommendations. 
My skin looks clearer and healthier than before, and I’m honestly more confident about it now.`,
    image: "/testimonial-1.jpeg",
    rating: 5,
  },
  {
    id: 2,
    name: "Hibatullah Abdulwasih",
    text: `To my first skincare vendor and consultant. 
Every time I look at my face now. I feel more confident and happy on how my face turned out after getting it once. 
Every product you recommended to me responded well to my face because you are a pro.
I mean, look at my skin. 
Hyperpigmentation is now scared of me.
Thank you very much, TheSkinfidentialSeries 🥹💜`,
    image: "/testimonial-2.jpeg",
    rating: 5,
  },
  {
    id: 3,
    name: "Maureen",
    text: `I'm so grateful that I crossed paths with this brand.
All I can say now is, thank you. From time to time, I get compliments about my skin glowing and the genuine joy I feel can't be explained.
I don't regret any single penny I've spent in achieving this skin today. 
 you sabi your work like mad!! 
I pray this brand continues to grow.`,
    image: "/testimonial-3.jpeg",
    rating: 5,
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
        <div className="relative mt-12 flex items-center justify-center">

       
          <div className="flex flex-col items-center text-center max-w-xl">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={t.image}
                alt={t.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" flex items-center justify-between w-full mt-5">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Previous testimonial"
              >
                <ChevronLeft />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < t.rating ? "text-gold" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button
                onClick={next}
                className=" p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Next testimonial"
              >
                <ChevronRight />
              </button>
            </div>

          
            <p className="mt-4 text-gray-600 leading-relaxed">{t.text}</p>

           
            <p className="mt-4 font-semibold ">{t.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
