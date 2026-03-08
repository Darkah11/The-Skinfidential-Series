"use client";
import Container from "@/components/Container";
import { ProductWithId, ProductVariant } from "@/types/products";
import { formatPrice } from "@/utils/formatters";
import { Ban, CircleCheckBig, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddToCartBtn } from "./Button";
import { addToCart } from "@/redux/slices/cartSlice";
import Link from "next/link";
import link from "../../public/link.png";
import facebook from "../../public/facebook.png";
import whatsapp from "../../public/whatsapp.png";
import xtwitter from "../../public/xtwitter.png";
import { ToastContainer, toast } from "react-toastify";

interface MyComponentProps {
  product: ProductWithId;
}

// Helper function to calculate discounted price
const calculateDiscountedPrice = (
  price: number,
  discount?: ProductWithId["discount"],
) => {
  if (!discount || !discount.isActive) return price;

  // Check if discount is within valid date range
  if (discount.startDate && new Date(discount.startDate) > new Date())
    return price;
  if (discount.endDate && new Date(discount.endDate) < new Date()) return price;

  if (discount.type === "percentage") {
    return price - (price * discount.value) / 100;
  } else {
    return price - discount.value;
  }
};

export default function ProductDetails({ product }: MyComponentProps) {
  const dispatch = useDispatch();
  const notify = () => toast("Added to cart");
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.hasVariants && product.variants?.length
      ? product.variants[0]
      : null,
  );

  // Get current price based on variant or base product
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentInStock = selectedVariant
    ? selectedVariant.stock > 0
    : product.stock > 0;
  const currentCostPrice = selectedVariant
    ? selectedVariant.costPrice
    : product.costPrice;
  // const currentImage = selectedVariant?.imageUrl || product.imageUrl;
  // const currentStock = selectedVariant?.stock ?? product.stock;

  // Calculate discounted price
  const discountedPrice = calculateDiscountedPrice(
    currentPrice,
    product.discount,
  );
  const hasDiscount =
    product.discount?.isActive && discountedPrice < currentPrice;
  const discountPercentage =
    hasDiscount && product.discount?.type === "percentage"
      ? product.discount.value
      : hasDiscount && product.discount?.type === "fixed"
        ? Math.round((product.discount.value / currentPrice) * 100)
        : 0;

  // const handleIncrement = () =>
  //   setQty((prev) =>
  //     selectedVariant
  //       ? prev >= selectedVariant.stock && prev + 1
  //       : prev >= product.stock && prev + 1,
  //   );
  const handleIncrement = () => {
    setQty((prev) => {
      const maxStock = selectedVariant ? selectedVariant.stock : product.stock;
      return prev < maxStock ? prev + 1 : prev;
    });
  };
  const handleDecrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  // const variantAttributes =
  //   product.hasVariants && product.variants
  //     ? Object.keys(product.variants[0]?.attributes || {})
  //     : [];

  // function getAttributeSummary(variants: ProductVariant[]) {
  //   const map: Record<string, Set<string>> = {};

  //   variants.forEach((v) => {
  //     Object.entries(v.attributes).forEach(([key, value]) => {
  //       if (!map[key]) map[key] = new Set();
  //       map[key].add(value);
  //     });
  //   });

  //   return Object.entries(map).map(([key, values]) => ({
  //     key,
  //     values: Array.from(values),
  //   }));
  // }
  // const attributeSummary = getAttributeSummary(product.variants ?? []);

  function getVariantButtonLabel(variant: ProductVariant, index: number) {
    return `#${index + 1} ${variant.name}`;
  }

  return (
    <section>
      <Container className="relative px-5 lg:px-12 xl:px-24 py-16">
        <div className="flex flex-col md:flex-row gap-x-10 md:items-center md:justify-between">
          <div className=" md:w-1/2 w-fit relative max-w-[500px]">
            <Image
              src={`${product.imageUrl}`}
              width={300}
              height={500}
              alt="product image"
              className="w-full aspect-[3/4] object-cover "
            />
            {hasDiscount && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-semibold">
                -{discountPercentage}% OFF
              </div>
            )}
          </div>
          <div className="mt-10 md:w-1/2 md:mt-0">
            <div className="text-sm text-gray-600">
              <p className="inline font-semibold">Categories: </p>
              <p className="inline">
                {product.categories.map((category, index) =>
                  index === 0 ? category : `, ${category}`,
                )}
              </p>
            </div>

            <div className="mt-3 text-primary-100">
              <h2 className="capitalize font-bold text-4xl lg:text-5xl">
                {product.name}
              </h2>

              <div className="mt-2">
                {hasDiscount ? (
                  <div className="flex items-center gap-x-3">
                    <p className="text-2xl font-bold text-red-600">
                      ₦{formatPrice(discountedPrice)}
                    </p>
                    <p className="text-lg font-semibold line-through text-gray-400">
                      ₦{formatPrice(currentPrice)}
                    </p>
                  </div>
                ) : (
                  <p className="text-xl font-semibold">
                    ₦{formatPrice(currentPrice)}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <p className="font-semibold lg:text-lg">Description</p>
              <p className="text-gray-600 text-sm lg:text-base">
                {product.description}
              </p>
            </div>

            {/* Variant Selection */}
            {product.hasVariants && product.variants && (
              <div>
                {/* <div className="mt-5">
                  <p className="font-semibold lg:text-lg">Variants</p>
                  <div className="space-y-1">
                    {attributeSummary.map((attr) => (
                      <p key={attr.key} className=" capitalize text-sm text-gray-600">
                        <span className="font-medium">
                          {attr.key}s:
                        </span>{" "}
                        {attr.values.join(", ")}
                      </p>
                    ))}
                  </div>
                </div> */}
                <div className="mt-5">
                  <p className="font-semibold lg:text-lg">Select Variant:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.variants?.map((variant, index) => {
                      const isSelected = selectedVariant?.id === variant.id;

                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={` capitalize px-4 py-2 border rounded-md transition-colors ${
                            isSelected
                              ? "border-gold bg-gold text-primary-100"
                              : "border-gray-300 hover:border-gold"
                          }`}
                        >
                          {getVariantButtonLabel(variant, index)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Stock Info */}
            <div className=" mt-5">
              <p className=" font-medium">
                {currentInStock ? (
                  <CircleCheckBig className=" text-green-600 inline" />
                ) : (
                  <Ban className=" text-red-600 inline " />
                )}{" "}
                <span
                  className={`font-medium ${currentInStock ? "text-green-600" : "text-red-600"}`}
                >
                  {currentInStock ? `In Stock` : "Out of Stock"}
                </span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mt-5">
              <button
                onClick={handleDecrement}
                className="w-[30px] h-[30px] bg-accent border-y border-l border-accent flex justify-center items-center"
              >
                <Minus className="w-3 text-white" />
              </button>

              <span className="text-[10px] w-[30px] h-[30px] border-y border-gray-300 flex justify-center items-center">
                {qty}
              </span>

              <button
                onClick={handleIncrement}
                className="w-[30px] h-[30px] bg-accent border-y border-r border-accent flex justify-center items-center"
              >
                <Plus className="w-3 text-white" />
              </button>
            </div>

            {/* Share Links */}
            <div className="mt-5">
              <p className="text-s text-gray-600">Share this Product</p>
              <div className="flex items-center gap-x-3">
                <Link href={"/"}>
                  <Image src={xtwitter} alt="x logo" className="w-8" />
                </Link>
                <Link href={"/"}>
                  <Image src={facebook} alt="facebook logo" className="w-8" />
                </Link>
                <Link href={"/"}>
                  <Image src={whatsapp} alt="whatsapp logo" className="w-8" />
                </Link>
                <Link href={"/"}>
                  <Image src={link} alt="link logo" className="w-8" />
                </Link>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-5">
              <ToastContainer />
              <AddToCartBtn
                disabled={!currentInStock}
                handleClick={(e) => {
                  e.preventDefault();
                  if (currentInStock) {
                    dispatch(
                      addToCart({
                        productId: product.id,
                        name: product.name,
                        imageUrl: product.imageUrl,

                        price: discountedPrice,
                        costPrice: currentCostPrice,
                        originalPrice: currentPrice,
                        quantity: qty,
                        subtotal: discountedPrice * qty,

                        variantId: selectedVariant?.id ?? null,
                        variantName: selectedVariant?.name ?? null,
                      }),
                    );
                    notify();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
