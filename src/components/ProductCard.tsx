import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProductWithId } from "@/types/products";
// import { useAppSelector } from "@/redux/hooks";
import { formatPrice } from "@/utils/formatters";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast, ToastContainer } from "react-toastify";

interface MyComponentProps {
  product: ProductWithId;
}

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

export default function ProductCard({ product }: MyComponentProps) {
  // const cart = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount,
  );
  const hasDiscount =
    product.discount?.isActive && discountedPrice < product.price;
  const discountPercentage =
    hasDiscount && product.discount?.type === "percentage"
      ? product.discount.value
      : hasDiscount && product.discount?.type === "fixed"
        ? Math.round((product.discount.value / product.price) * 100)
        : 0;
  return (
    <Link href={`/product/${product.slug}`}>
      <div className=" relative flex flex-col h-full group transition-all duration-500 group shadow-lg rounded-lg overflow-hidden">
        {product.stock === 0 && (
          <p className=" absolute top-3 right-3 bg-red-600 text-xs text-white p-1 rounded-md capitalize">
            Out of stock
          </p>
        )}
        <div>
          <Image
            src={`${product.imageUrl}`}
            width={300}
            height={500}
            alt="product image"
            className=" w-full aspect-[3/4] group-hover:w-[150%] object-cover"
          />
          {hasDiscount && (
            <div className=" text-xs absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-full font-semibold">
              -{discountPercentage}% OFF
            </div>
          )}
        </div>
        <div className=" border-t border-gray-100 relative  flex flex-col flex-grow justify-between px-3 py-5  bg-white">
          {/* <AddToCartBtn style=" absolute right-3 -top-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500" /> */}
          <p className=" line-clamp-2 capitalize text-black text-sm font-medium transition-all duration-300">
            {product.name}
          </p>
          <div className=" flex justify-between items-center mt-[10px]">
            <div className=" relative">
              <p className=" font-bold text-sm">
                ₦{formatPrice(discountedPrice)}
              </p>
              {hasDiscount && (
                <p className=" absolute -bottom-3 left-0 text-[10px] font-semibold text-gray-600 line-through">
                  ₦{formatPrice(product.price)}
                </p>
              )}
            </div>
            <ToastContainer />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (product.hasVariants) {
                  toast("You must select a variant");
                } else if (product.stock > 0) {
                  dispatch(
                    addToCart({
                      productId: product.id,
                      name: product.name,
                      imageUrl: product.imageUrl,

                      price: discountedPrice,
                      costPrice: product.costPrice,
                      originalPrice: product.price,
                      quantity: 1,
                      subtotal: discountedPrice * 1,

                      variantId: null,
                      variantName: null,
                    }),
                  );
                  toast("Added to cart");
                }
              }}
            >
              <ShoppingCart className=" text-accent" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
