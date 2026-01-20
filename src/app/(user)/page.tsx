import Image from "next/image";
import jessica from "../../../public/jessica.png";
import { GoldButton, OutlineButton, PrimaryButton } from "@/components/Button";
import ProductsCarousel from "@/components/ProductsCarousel";
import Container from "../../components/Container";
import { getProducts } from "@/utils/firebase";
import confident from "../../../public/skin-confident.jpg";
import soaps from "../../../public/soaps.jpg";
import lotions from "../../../public/lotions.jpg";
import skincare from "../../../public/skincare.jpg";
import categories from "../../../public/categories.jpg";
import rangeOfProducts from "../../../public/products.png";
import recommend from "../../../public/recommend.png";
import consult from "../../../public/consult.png";
import consultUs from "../../../public/consult-us.jpg";
import TestimonialSection from "@/components/TestimonialSection";
import Faq from "@/components/Faq";

export default async function Home() {
  const products = await getProducts();
  // const products = [
  //   {
  //     name: "Advanced Korean Skin Body Oil",
  //     slug: "advanced-korean-skin-body-oil",
  //     price: 19000,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis asperiores dignissimos ut illum? Odio temporibus debitis exercitationem natus nostrum nesciunt omnis eum totam, at vel ducimus doloribus iure aspernatur, asperiores ut, magni itaque inventore quae iste vero numquam voluptatum.",
  //     categories: ["gels and oils", "treatments"],
  //     tags: ["trending", "bestseller"],
  //     stock: 20,
  //     imageUrl: "/product-4.jpg",
  //     createdAt: "2025-10-28T10:00:00Z",
  //   },
  //   {
  //     name: "Zapzyt Acne Wash Cleanser",
  //     slug: "zapzyt-acne-wash-cleanser",
  //     price: 19000,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis asperiores dignissimos ut illum? Odio temporibus debitis exercitationem natus nostrum nesciunt omnis eum totam, at vel ducimus doloribus iure aspernatur, asperiores ut, magni itaque inventore quae iste vero numquam voluptatum.",
  //     categories: ["face cleansers", "treatments"],
  //     tags: ["trending"],
  //     stock: 20,
  //     imageUrl: "/product-1.jpg",
  //     createdAt: "2025-10-22T10:00:00Z",
  //   },
  //   {
  //     name: "La roche posay sunscreen",
  //     slug: "la-roche-posay-sunscreen",
  //     price: 27000,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis asperiores dignissimos ut illum? Odio temporibus debitis exercitationem natus nostrum nesciunt omnis eum totam, at vel ducimus doloribus iure aspernatur, asperiores ut, magni itaque inventore quae iste vero numquam voluptatum.",
  //     categories: ["treatments", "sunscreens"],
  //     tags: ["trending", "bestseller"],
  //     stock: 20,
  //     imageUrl: "/product-2.jpg",
  //     createdAt: "2025-10-28T10:00:00Z",
  //   },
  //   {
  //     name: "Guajing rice toner",
  //     slug: "guajing-rice-toner",
  //     price: 9500,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis asperiores dignissimos ut illum? Odio temporibus debitis exercitationem natus nostrum nesciunt omnis eum totam, at vel ducimus doloribus iure aspernatur, asperiores ut, magni itaque inventore quae iste vero numquam voluptatum.",
  //     categories: ["treatments", "face toners"],
  //     tags: ["trending"],
  //     stock: 20,
  //     imageUrl: "/product-5.jpg",
  //     createdAt: "2025-10-22T10:00:00Z",
  //   },
  //   {
  //     name: "I'm from rice toner",
  //     slug: "i'm-from-rice-toner",
  //     price: 24000,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis asperiores dignissimos ut illum? Odio temporibus debitis exercitationem natus nostrum nesciunt omnis eum totam, at vel ducimus doloribus iure aspernatur, asperiores ut, magni itaque inventore quae iste vero numquam voluptatum.",
  //     categories: ["treatments", "sunscreens"],
  //     tags: ["trending", "bestseller"],
  //     stock: 20,
  //     imageUrl: "/product-3.jpg",
  //     createdAt: "2025-10-28T10:00:00Z",
  //   },
  //   {
  //     name: "anua serum",
  //     slug: "anua-serum",
  //     price: 36000,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis asperiores dignissimos ut illum? Odio temporibus debitis exercitationem natus nostrum nesciunt omnis eum totam, at vel ducimus doloribus iure aspernatur, asperiores ut, magni itaque inventore quae iste vero numquam voluptatum.",
  //     categories: ["treatments", "face toners", "face serums"],
  //     tags: ["trending", "bestsellers"],
  //     stock: 20,
  //     imageUrl: "/product-4.jpg",
  //     createdAt: "2025-10-22T10:00:00Z",
  //   },
  //   {
  //     name: "topicals faded serum",
  //     slug: "topicals-faded-serum",
  //     price: 24000,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis asperiores dignissimos ut illum? Odio temporibus debitis exercitationem natus nostrum nesciunt omnis eum totam, at vel ducimus doloribus iure aspernatur, asperiores ut, magni itaque inventore quae iste vero numquam voluptatum.",
  //     categories: ["face serum"],
  //     tags: ["trending", "bestseller"],
  //     stock: 20,
  //     imageUrl: "/product-1.jpg",
  //     createdAt: "2025-10-28T10:00:00Z",
  //   },
  //   {
  //     name: "anua serum",
  //     slug: "anua-serum",
  //     price: 36000,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus officiis asperiores dignissimos ut illum? Odio temporibus debitis exercitationem natus nostrum nesciunt omnis eum totam, at vel ducimus doloribus iure aspernatur, asperiores ut, magni itaque inventore quae iste vero numquam voluptatum.",
  //     categories: ["treatments", "face toners", "face serums"],
  //     tags: ["trending", "bestsellers"],
  //     stock: 20,
  //     imageUrl: "/product-2.jpg",
  //     createdAt: "2025-10-22T10:00:00Z",
  //   },
  // ];
  return (
    <>
      
        <section className=" ">
          <Container className=" relative  px-5 lg:px-12 xl:px-24 py-16  text-primary-100">
            <div className=" hidden lg:block absolute top-0 right-0 h-full w-[30%] bg-gold" />
            <div className=" relative md:flex items-center">
              <div className=" max-w-[500px] mx-auto md:max-w-none md:mx-0 md:flex-1">
                <h1 className="  text-5xl font-bold">
                  The Skinfidential Series
                </h1>
                <p className=" mt-5 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                  accusamus non quos reiciendis autem illum doloremque
                  perferendis neque maxime
                </p>
                <div className=" mt-7 flex gap-x-3 justify-start">
                  <PrimaryButton text={"Learn More"} style=" bg-primary-100" />
                  <OutlineButton
                    text={"Learn More"}
                    style=" border-primary-100"
                  />
                </div>
                <div className=" mt-10 flex gap-x-5">
                  <div>
                    <h3 className=" playfair text-primary-100 font-extrabold text-5xl">
                      2k+
                    </h3>
                    <p className=" font-medium text-xs mt-2">Product Review</p>
                  </div>
                  <div>
                    <h3 className=" playfair text-primary-100 font-extrabold text-5xl">
                      130+
                    </h3>
                    <p className=" font-medium text-xs mt-2">
                      Product Available
                    </p>
                  </div>
                  <div>
                    <h3 className=" playfair text-primary-100 font-extrabold text-5xl">
                      23
                    </h3>
                    <p className=" font-medium text-xs mt-2">Categories</p>
                  </div>
                </div>
              </div>
              <div className=" mt-12 md:mt-0 md:w-1/2">
                <div className=" relative border-4 border-primary-50 lg:border-none p-4 lg:p-0 rounded-lg max-w-[500px] mx-auto md:max-w-[350px] md:mx-0 md:ml-auto lg:mx-auto ">
                  <div className=" hidden lg:block absolute w-full h-full bg-primary-50  top-0 left-0 -rotate-6" />
                  <div className=" hidden lg:block absolute w-full h-full border-4 border-primary-50 top-0 left-0 rotate-6" />
                  <Image
                    src={jessica}
                    alt=" hero-image"
                    className=" relative rounded-lg lg:rounded-none w-full "
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
        <Container>
          <div className=" bg-gold px-5 py-12 text-primary-100">
            <h3 className=" playfair max-w-[600px] mx-auto text-xl lg:text-2xl lg:leading-loose font-semibold text-center leading-9 capitalize">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
              aperiam omnis velit dignissimos est reprehenderit deleniti
              consequatur deserunt
            </h3>
          </div>
        </Container>
        <section>
          <Container className=" relative  px-5 lg:px-12 xl:px-24 py-16 text-primary-100">
            <div>
              <div className=" flex justify-between items-center gap-2">
                <h2 className=" text-3xl font-semibold">LATEST PRODUCTS</h2>
                <span className=" flex-1 w-full h-[2px] bg-gold" />
                <OutlineButton text="Explore" style=" tracking-wide" />
              </div>

              <ProductsCarousel products={products} />
            </div>
            <div className=" flex flex-col md:flex-row md:gap-5 md:items-stretch ">
              <div className=" h-[300px] md:h-auto md:w-1/2  overflow-hidden relative md:rounded-lg">
                <Image
                  src={confident}
                  alt="image of a clear black skin"
                  fill
                  className=" object-cover"
                />
              </div>
              <div className=" bg-primary-50 text-white px-3 py-5 md:w-1/2 max-w-fit md:rounded-lg lg:px-10 lg:py-16">
                <h3 className=" text-3xl font-semibold text-gold">Be Skin Confident!</h3>
                <p className=" text-sm mt-3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
                  illum inventore id. Consectetur minima accusamus quasi quod,
                  magnam expedita magni!
                  <br /> <br />
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Atque molestias quos tempora repellendus iusto. Recusandae
                  totam illum nulla consequuntur nobis.
                </p>
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container className=" relative  px-5 lg:px-12 xl:px-24 py-16 text-primary-100">
            <div>
              <div className=" flex justify-between items-center gap-5">
                <h2 className="text-3xl font-semibold">CATEGORIES</h2>
                <span className=" flex-1 w-full h-[2px] bg-gold" />
              </div>
            </div>
          </Container>
          <Container>
            <div className=" mt-10 flex flex-col gap-y-10 md:flex-row md:justify-between">
              <div className=" max-w-[400px] md:max-w-[33%] mx-auto md:mx-0 relative text-white">
                <div
                  className=" absolute bottom-0 left-0 right-0 mx-auto text-center w-full 
                   bg-gradient-to-b from-transparent from-20% to-black/60 h-full 
                   flex flex-col justify-end pb-5 px-2"
                >
                  <h3 className=" text-2xl font-semibold mb-1">Lotions</h3>
                  <p className=" text-sm max-w-[300px] mx-auto">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Vitae, soluta fugiat.
                  </p>
                  <OutlineButton
                    text="Explore"
                    style=" w-fit mx-auto border-white text-white mt-3 "
                  />
                </div>
                <Image
                  src={lotions}
                  alt="lotion image"
                  className=" h-full object-cover"
                />
              </div>
              <div className=" max-w-[400px] md:max-w-[33%] mx-auto md:mx-0 relative text-white">
                <div className=" absolute bottom-0 left-0 right-0 mx-auto text-center w-full  bg-gradient-to-b from-transparent from-20% to-black/60 h-full flex flex-col justify-end pb-5 px-2">
                  <h3 className=" text-2xl font-semibold mb-1">
                    Soaps & Body Wash
                  </h3>
                  <p className=" text-sm max-w-[300px] mx-auto">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Vitae, soluta fugiat.
                  </p>
                  <OutlineButton
                    text="Explore"
                    style=" w-fit mx-auto border-white text-white mt-3 "
                  />
                </div>
                <Image
                  src={soaps}
                  alt="soaps image"
                  className=" h-full object-cover"
                />
              </div>
              <div className=" max-w-[400px] md:max-w-[33%] mx-auto md:mx-0 relative text-white">
                <div className=" absolute bottom-0 left-0 right-0 mx-auto text-center w-full  bg-gradient-to-b from-transparent from-20% to-black/60 h-full flex flex-col justify-end pb-5 px-2">
                  <h3 className=" text-2xl font-semibold mb-1">
                    Skincare Tools & Essentials
                  </h3>
                  <p className=" text-sm max-w-[300px] mx-auto">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Vitae, soluta fugiat.
                  </p>
                  <OutlineButton
                    text="Explore"
                    style=" w-fit mx-auto border-white text-white mt-3 "
                  />
                </div>
                <Image
                  src={skincare}
                  alt="skincare image"
                  className=" h-full object-cover"
                />
              </div>
            </div>
          </Container>
          <Container className=" relative  px-5 lg:px-12 xl:px-24 py-16 text-primary-100">
            <div className=" mt-10 flex flex-col md:flex-row md:justify-between">
              <div className=" text-center md:w-1/2 my-auto">
                <h3 className=" font-semibold text-6xl">
                  BROWSE <br /> CATEGORIES
                </h3>
                <p className=" text-sm text-gray-600">
                  Check out our vast categories of products
                </p>
                <PrimaryButton
                  text="Check It Now"
                  style=" bg-primary-100 text-white mt-5"
                />
              </div>
              <div className=" mt-5 md:w-1/2 md:mt-0">
                <Image src={categories} alt="hand holding a bottle" />
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container className=" relative  px-5 lg:px-12 xl:px-24 py-16 text-primary-100">
            <div>
              <div className=" flex justify-between items-center gap-5">
                <h2 className="text-3xl font-semibold">WHAT WE OFFER</h2>
                <span className=" flex-1 w-full h-[2px] bg-gold" />
              </div>
              <div className=" mt-10 flex flex-col items-center gap-y-10 md:flex-row md:justify-between">
                <div className=" flex flex-col items-center max-w-[300px] mx-auto px-5">
                  <Image src={rangeOfProducts} alt="products in a basket" />
                  <h3 className=" text-xl font-bold mt-3">
                    Wide Range Of Products
                  </h3>
                  <p className=" text-xs text-center text-gray-600">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Est, nemo vitae expedita eius voluptates quidem.
                  </p>
                </div>
                <div className=" w-[2px] h-24 bg-gray-300 hidden md:block " />
                <div className=" flex flex-col items-center max-w-[300px] mx-auto px-5">
                  <Image src={consult} alt="products in a basket" />
                  <h3 className=" text-xl font-bold mt-3">
                    Skincare Consultation
                  </h3>
                  <p className=" text-xs text-center text-gray-600">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Est, nemo vitae expedita eius voluptates quidem.
                  </p>
                </div>
                <div className=" w-[2px] h-24 bg-gray-300 hidden md:block " />
                <div className=" flex flex-col items-center max-w-[300px] mx-auto px-5">
                  <Image src={recommend} alt="products in a basket" />
                  <h3 className=" text-xl font-bold mt-3">
                    Products Recommendation
                  </h3>
                  <p className=" text-xs text-center text-gray-600">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Est, nemo vitae expedita eius voluptates quidem.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container className="  relative  px-5 lg:px-12 xl:px-24 py-16 text-primary-100">
            <div>
              <div className=" flex justify-between items-center gap-5">
                <h2 className="text-3xl font-semibold">TESTIMONIALS</h2>
                <span className=" flex-1 w-full h-[2px] bg-gold" />
              </div>
              <div>
                <TestimonialSection />
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container className="  relative  px-5 lg:px-12 xl:px-24 py-16 text-primary-100">
            <div>
              <div className=" flex justify-between items-center gap-5">
                <h2 className="text-3xl font-semibold">
                  FREQUENTLY ASKED QUESTIONS
                </h2>
                <span className=" flex-1 w-full h-[2px] bg-gold" />
              </div>
              <div>
                <Faq />
              </div>
            </div>
          </Container>
          <Container className="  relative  text-white bg-primary-50">
            <div className=" md:flex ">
              <Image
                src={consultUs}
                alt=" image of a skincare product"
                className=" order-2 w-full max-h-[450px] md:w-1/2 md:max-h-[400px] object-cover"
              />
              <div className=" order-1 px-3 py-5 md:w-1/2 flex justify-center md:px-8">
                <div className=" max-w-[500px] m-auto  md:text-right">
                  <h3 className=" text-gold text-2xl lg:text-4xl font-semibold">Need Help?</h3>
                  <p className=" text-sm mt-2 lg:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem consequuntur ea quibusdam? Commodi nesciunt
                    libero dignissimos id consequatur ab fuga maxime eaque atque
                    alias possimus officia explicabo ipsam quas et, reiciendis,
                    velit magnam odio, rem itaque. Voluptatibus vero rerum quo.
                  </p>
                  <GoldButton
                    text="Consult Us"
                    style=" bg-gold mt-5 text-primary-100"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      {/* </main> */}
    </>
  );
}
