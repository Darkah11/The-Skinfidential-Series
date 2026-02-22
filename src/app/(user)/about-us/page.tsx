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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias quibusdam consectetur nesciunt obcaecati tempore, amet dolore! Eos sit, velit libero impedit mollitia quo eligendi minus culpa veniam aliquam, pariatur exercitationem incidunt! Doloribus, quam officiis.
          </p>
        </div>
      </Container>
      <Container className=" text-primary-100">
        <div className=" md:flex">
          <div className=" bg-white text-left p-[50px] md:w-1/2 flex flex-col justify-center items-start">
            <h4 className=" text-[22px] md:text-[32px] font-bold">Our Story</h4>
            <p className=" text-gray-600 mt-5 text-[15px] md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore itaque praesentium, est in optio alias sit voluptate, cum eius non velit aliquid iure ipsum fuga distinctio vitae nesciunt placeat possimus?
              <br /> <br /> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem incidunt ad magni nisi at in?
            </p>
          </div>
          <div className=" md:w-1/2">
            <Image src={story} alt="about grid image one" className=" h-full w-full object-cover" />
          </div>
        </div>
        <div className=" md:flex md:flex-row-reverse">
          <div className=" bg-white p-[50px] md:w-1/2 flex flex-col justify-center items-start">
            <h4 className=" text-[22px] md:text-[32px] font-bold">
              Our Mission
            </h4>
            <p className=" text-gray-600 mt-5 text-[15px] md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam repudiandae beatae unde accusamus quas ratione optio ab accusantium architecto dignissimos ad eos velit, molestiae neque nesciunt, tempora minus maxime ullam nulla atque minima magnam voluptates blanditiis illum. Blanditiis, dolores hic.
            </p>
          </div>
          <div className=" md:w-1/2">
            <Image src={mission} alt="about grid image two" className=" h-full w-full object-cover" />
          </div>
        </div>
        <div className=" md:flex md:flex-row">
          <div className=" bg-white p-[50px] md:w-1/2 flex flex-col justify-center items-start">
            <h4 className=" text-[22px] md:text-[32px] font-bold">
              Our Vision
            </h4>
            <p className=" text-gray-600 mt-5 text-[15px] md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi cum dolores sequi laborum ducimus ipsam, enim fugit porro veritatis dolor. Quam vel error iure, nesciunt accusantium temporibus praesentium. Inventore nulla commodi nam dolorem alias dolores quod ea cupiditate illum officiis.
            </p>
          </div>
          <div className=" md:w-1/2">
            <Image src={vision} alt="about grid image three" className=" h-full w-full object-cover" />
          </div>
        </div>
      </Container>
    </div>
  );
}
