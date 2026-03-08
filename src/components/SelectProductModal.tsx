"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { formatPrice } from "@/utils/formatters";
import Image from "next/image";
import { PrimaryButton } from "./Button";
import { ProductDiscount, ProductWithId } from "@/types/products";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "@/config/firebase";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductWithId[] | null;
  discount: ProductDiscount;
}

export default function SelectProductModal({
  isOpen,
  onClose,
  products,
  discount,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const applyBulkDiscount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }
    setLoading(true);
    try {
      const batch = writeBatch(db);

      selectedProducts.forEach((productId) => {
        const productRef = doc(db, "products", productId);

        batch.update(productRef, {
          discount: discount,
        });
      });

      await batch.commit();

      alert("Discount applied successfully");

      setSelectedProducts([]);
    } catch (error) {
      console.error(error);
      alert("Failed to apply discount");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  //   useEffect(() => {
  //     if (!isOpen || !orderId) return;

  //     const fetchOrder = async () => {
  //       setLoading(true);
  //       setError(null);

  //       try {
  //         const order = await getOrderById(orderId);
  //         setOrder(order);
  //       } catch (err) {
  //         console.error("Error fetching order:", err);
  //         setError("Failed to load order");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchOrder();
  //   }, [isOpen, orderId]);

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h3 className=" text-2xl font-semibold">Select Products</h3>
        <div className=" space-y-3 mt-5">
          {products &&
            products.map((item) => (
              <div key={item.id} className=" flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(item.id)}
                  onChange={() => toggleProductSelection(item.id)}
                />
                <div className=" flex items-center">
                  <Image
                    src={`${item.imageUrl}`}
                    width={300}
                    height={500}
                    alt="product image"
                    className=" w-[20px] object-cover aspect-[3/4]"
                  />

                  <p
                    title={item.name}
                    className=" border-r border-gold px-2 text-sm line-clamp-1"
                  >
                    {item.name}
                  </p>
                  <p className=" pl-2 text-primary-100 text-sm font-semibold">
                    ₦{formatPrice(item.price)}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <PrimaryButton
          handleClick={(e) => applyBulkDiscount(e)}
          style=" w-auto bg-accent w-[160px] rounded-full mt-5"
          text={
            loading
              ? "Loading..."
              : `Apply Discount (${selectedProducts.length})`
          }
        />
      </div>
    </Modal>
  );
}
