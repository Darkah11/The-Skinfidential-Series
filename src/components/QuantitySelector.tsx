"use client";

import { decrementQuantity, incrementQuantity } from "@/redux/slices/cartSlice";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  productId: string;
  quantity: number;
}

export default function QuantitySelector({ productId, quantity }: Props) {
  const dispatch = useDispatch();
  const [Qty, setQty] = useState(1);
  const handleIncrement = () => setQty((prev) => prev + 1);
  const handleDecrement = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        className="w-[20px] h-[20px] border border-gray-300 flex justify-center items-center"
      >
        <Minus className="w-3" />
      </button>

      <span className="text-[10px] w-[20px] h-[20px] border-y border-gray-300 flex justify-center items-center">
        {quantity}
      </span>

      <button
        onClick={handleIncrement}
        className="w-[20px] h-[20px] border border-gray-300 flex justify-center items-center"
      >
        <Plus className="w-3" />
      </button>
    </div>
  );
}
