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
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
              <h1 className="  text-5xl font-bold">The Skinfidential Series</h1>
              <p className=" mt-5 text-gray-600">
                TheSkinfidentialSeries brings you the hottest and finest
                skincare products from Foreign and Nigerian reputable brands -
                all in one place! If it works, it&apos;s here. If it
                doesn&apos;t? We don&apos;t stock it!
              </p>
              <div className=" mt-7 flex gap-x-3 justify-start">
                <Link href={"/shop"}>
                  <PrimaryButton text={"Shop"} style=" bg-accent w-[120px]" />
                </Link>
                <Link href={"/about-us"}>
                  <OutlineButton
                    text={"Learn More"}
                    style=" border-primary-100 w-[120px] h-full"
                  />
                </Link>
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
                  <p className=" font-medium text-xs mt-2">Product Available</p>
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
          <h3 className=" playfair max-w-[600px] mx-auto text-xl lg:text-2xl lg:leading-loose font-bold text-center leading-9 capitalize">
            Join thousands of satisfied customers across the globe who trust us
            to care for their skin. <br /> glow hard or glow home!
          </h3>
        </div>
      </Container>
      <section>
        <Container className=" relative  px-5 lg:px-12 xl:px-24 py-16 text-primary-100">
          <div>
            <div className=" flex justify-between items-center gap-2">
              <h2 className=" text-xl md:text-3xl font-semibold">
                LATEST PRODUCTS
              </h2>
              <span className=" flex-1 w-full h-[2px] bg-gold" />
              <Link href={"/shop"}>
                <OutlineButton text="Explore" style=" tracking-wide" />
              </Link>
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
              <h3 className=" text-3xl font-semibold text-gold">
                Be Skin Confident!
              </h3>
              <p className=" text-sm mt-3">
                We curate the best skincare combinations so you don’t have to
                guess, gamble, or stress. Just real results, real glow, and real
                confidence-served unapologetically.
                <br />
                <br />
                We’re passionate about sourcing authentic, high-quality skincare
                products from around the world and proudly supporting trusted
                Nigerian brands that understand our climate, our skin tones, and
                our real-life skin concerns.
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
                  Restore your skin with nourishing lotions made to hydrate,
                  moisturize, and brighten your skin and leaving you confidently
                  glowing.
                </p>
                <Link href={"/categories?category=Body+Creams+%26+Lotions"}>
                  <OutlineButton
                    text="Explore"
                    style=" w-fit mx-auto border-white text-white mt-3 "
                  />
                </Link>
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
                  Cleanse and refresh your skin while keeping your glow intact.
                  Turn every shower into a smooth time with your skin…
                </p>
                <Link href={"/categories?category=Soaps+and+Wash"}>
                  <OutlineButton
                    text="Explore"
                    style=" w-fit mx-auto border-white text-white mt-3 "
                  />
                </Link>
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
                  The little extras in skincare that makes a big
                  difference—Tools that help you get the most out of your
                  skincare.
                </p>
                <Link
                  href={"/categories?category=Skincare+Tools+and+Essentials"}
                >
                  <OutlineButton
                    text="Explore"
                    style=" w-fit mx-auto border-white text-white mt-3 "
                  />
                </Link>
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
              <Link href={"/categories"}>
                <PrimaryButton
                  text="Check It Now"
                  style=" bg-accent text-white mt-5 mx-auto"
                />
              </Link>
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
                  One Destination with endless skincare options. We have an
                  extensive collection of authentic skincare products designed
                  to suit your diverse skin types, tones, and goals.
                </p>
              </div>
              <div className=" w-[2px] h-24 bg-gray-300 hidden md:block " />
              <div className=" flex flex-col items-center max-w-[300px] mx-auto px-5">
                <Image src={consult} alt="products in a basket" />
                <h3 className=" text-xl font-bold mt-3">
                  Skincare Consultation
                </h3>
                <p className=" text-xs text-center text-gray-600">
                  Not sure what your skin needs? Our skincare consultations
                  guide you to the right routine with no guess works. They are
                  personalized just for you.
                </p>
              </div>
              <div className=" w-[2px] h-24 bg-gray-300 hidden md:block " />
              <div className=" flex flex-col items-center max-w-[300px] mx-auto px-5">
                <Image src={recommend} alt="products in a basket" />
                <h3 className=" text-xl font-bold mt-3">
                  Products Recommendation
                </h3>
                <p className=" text-xs text-center text-gray-600">
                  The right products picked just for your skin with our expert
                  guided product recommendation to build an effective results
                  driven routine.
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
                <h3 className=" text-gold text-2xl lg:text-4xl font-semibold">
                  Need Help?
                </h3>
                <p className=" text-sm mt-2 lg:text-base">
                  Experience skincare support at a higher standard. We’re here
                  to assist you with expert advice and carefully evaluated
                  recommendations. Our team is available to guide and assist you
                  through your journey to getting an exceptional skin.
                </p>
                <Link href={"/contact-us"}>
                  <GoldButton
                    text="Consult Us"
                    style=" bg-gold mt-5 text-primary-100"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* </main> */}
    </>
  );
}
