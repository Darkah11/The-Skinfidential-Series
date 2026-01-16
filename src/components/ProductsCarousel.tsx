"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./Carousel.module.css";
// import Link from "next/link";
import ProductCard from "./ProductCard";
import { ProductWithId } from "@/types/products";

interface MyComponentProps {
  products: ProductWithId[];
}

export default function ProductsCarousel({ products }: MyComponentProps) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      //   partialVisible={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={7000}
      keyBoardControl={true}
      //   customTransition="all .5"
      transitionDuration={500}
      arrows={false}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      containerClass={styles.customCarouselContainer}
      itemClass={styles.carouselItem}
    >
      {products.map((item, index) => (
          <ProductCard key={index} product={item} id={index} />
      ))}
    </Carousel>
  );
}

// interface MyComponentProps {
//   desktop?: number;
// }

// export default function Slide({ desktop }: MyComponentProps) {
//   return (

//     <Carousel
//       swipeable={true}
//       draggable={false}
//       partialVisible={true}
//       responsive={responsive}
//       ssr={true} // means to render carousel on server-side.
//       infinite={true}
//       autoPlay={true}
//       autoPlaySpeed={7000}
//       keyBoardControl={true}
//       //   customTransition="all .5"
//       transitionDuration={500}
//       arrows={false}
//       removeArrowOnDeviceType={["tablet", "mobile"]}
//       containerClass=" carousel-container"
//       sliderClass=" -mr-[30px] md:mr-0"
//     >
//       {products &&
//         products.map((product, index) => (
//           <Link href={`/product/${product.slug}`} key={index}>
//             <div className=" relative group bg-transparent bg-white duration-500 mr-3 h-full flex-1">
//               {product.trending && (
//                 <p className=" bg-white absolute top-5 left-5 text-[10px] font-semibold leading-none p-1">
//                   TRENDING
//                 </p>
//               )}
//               {product.best_seller && (
//                 <p className=" bg-white absolute top-5 right-5 text-[10px] font-semibold leading-none p-1">
//                   BESTSELLER
//                 </p>
//               )}
//               <div className={" lg:h-[350px] md:h-[320px] h-[300px]"}>
//                 {product.images.length > 0 && (
//                   <Image
//                     src={product.images[0].src}
//                     alt="product image"
//                     width={280}
//                     height={380}
//                     className="  lg:group-hover:-mb-5 transition-all duration-500 w-full h-full object-cover"
//                   />
//                 )}
//               </div>
//               <div className=" relative z-30 lg:p-[30px] p-[15px]  bg-white flex-1 rounded-2xl">
//                 <div className=" hidden lg:flex justify-center items-center  h-[44px] text-[13px] bg-white absolute -top-[22px] font-medium right-[30px] rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 px-5 shadow-lg ">
//                   <Link href={"/"} className=" animated-line2">
//                     QUICKVIEW
//                   </Link>
//                 </div>
//                 <p className=" text-[10px] text-black/40 uppercase font-semibold">
//                   {product.category}
//                 </p>
//                 <h3 className=" capitalize text-black/80 mt-3 md:text-[15px] text-[12px]">
//                   {product.name}
//                 </h3>
//                 <div className=" flex items-center flex-wrap gap-x-3 mt-3">
//                   {product.on_sale ? (
//                     <p className=" line-through leading-none text-black/20 font-normal">
//                       ₦{product.old_price?.toFixed(2)}
//                     </p>
//                   ) : null}
//                   <p className="  text-black/70 font-semibold text-sm">
//                     ₦{formatPrice(product.price)}{" "}
//                   </p>
//                   {product.on_sale ? (
//                     <p className=" hidden lg:block  text-xs font-semibold text-white p-1 bg-red-600">
//                       Save ₦
//                       {product.old_price &&
//                         (product.old_price - product.price).toFixed(2)}
//                     </p>
//                   ) : null}
//                 </div>

//                 <div className=" hidden lg:block h-0 group-hover:visible invisible transition-all duration-500 opacity-0 group-hover:opacity-100">
//                   <div className=" flex items-center gap-5 mt-5">
//                     <Link
//                       href={"/"}
//                       className=" animated-line font-semibold pb-0.5 text-[13px] text-[#151515] "
//                     >
//                       SELECT OPTIONS
//                     </Link>
//                     <button>
//                       <Image
//                         src={heart}
//                         className=" h-[18px] w-[18px]"
//                         alt="favorite icon"
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//     </Carousel>
//   );
// }
