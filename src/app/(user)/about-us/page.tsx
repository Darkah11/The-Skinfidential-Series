import React from "react";
import mission from "../../../../public/mission.jpg";
import vision from "../../../../public/vision.jpg";
import story from "../../../../public/story.jpg";
import Image from "next/image";
import Container from "@/components/Container";

export default function AboutUs() {
  return (
    <div>
      <Container className=" relative px-5 lg:px-12 xl:px-24 py-16 text-primary-100 bg-gold">
        <div className=" text-center max-w-[770px] mx-auto">
          <h2 className=" text-[40px] font-bold">
            About TheSkinfidentialSeries
          </h2>
          <p className=" text-[15px] text-gray-600 mt-3 leading-relaxed">
            At TheSkinfidentialSeries, we are passionate about helping you
            achieve healthy, radiance, and be confident in your skin. We
            specialize in offering a carefully curated selection of foreign and
            Nigerian skincare products from reputable, trusted, and
            result-driven brands.
          </p>
        </div>
      </Container>
      <Container className=" text-primary-100">
        <div className=" md:flex">
          <div className=" bg-white text-left p-[50px] md:w-1/2 flex flex-col justify-center items-start">
            <h4 className=" text-[22px] md:text-[32px] font-bold">Our Story</h4>
            <p className=" text-gray-600 mt-5 text-[15px] md:text-base">
              We saw a growing need for trusted guidance in an industry filled
              with confusion, counterfeits, and overwhelming choices, and
              TheSkinfidentialSeries stepped in to become that trusted voice.
              Our journey began with one simple belief: everyone deserves
              skincare that truly works for their unique skin type, tone, and
              lifestyle.
              <br /> <br />Skincare is not
              a one-size-fits-all experience, and at TheSkinfidentialSeries, we
              treat it as a confidential journey between you and your skin.
            </p>
          </div>
          <div className=" md:w-1/2">
            <Image
              src={story}
              alt="about grid image one"
              className=" h-full w-full object-cover"
            />
          </div>
        </div>
        <div className=" md:flex md:flex-row-reverse">
          <div className=" bg-white p-[50px] md:w-1/2 flex flex-col justify-center items-start">
            <h4 className=" text-[22px] md:text-[32px] font-bold">
              Our Mission
            </h4>
            <p className=" text-gray-600 mt-5 text-[15px] md:text-base">
              Creating possibilities for people to glow regardless of their skin
              worries, help them stay unique even when they don't have much to
              splurge on skincare. To HELP, to EXPAND, and to RENDER every
              little effort and knowledge they need about skincare.
            </p>
          </div>
          <div className=" md:w-1/2">
            <Image
              src={mission}
              alt="about grid image two"
              className=" h-full w-full object-cover"
            />
          </div>
        </div>
        <div className=" md:flex md:flex-row">
          <div className=" bg-white p-[50px] md:w-1/2 flex flex-col justify-center items-start">
            <h4 className=" text-[22px] md:text-[32px] font-bold">
              Our Vision
            </h4>
            <p className=" text-gray-600 mt-5 text-[15px] md:text-base">
              The online 1% stop-shop destination to global customers, who trust
              us to provide them top-notch, original, authentic, and affordable
              yet quality products from reputable companies.
            </p>
          </div>
          <div className=" md:w-1/2">
            <Image
              src={vision}
              alt="about grid image three"
              className=" h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
