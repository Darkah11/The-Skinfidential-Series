import { ProductWithId } from "@/types/products";
import { getProducts } from "@/utils/firebase";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "./Button";
import SelectProductModal from "./SelectProductModal";

export default function AddBulkDiscount() {
  const [bulkDiscount, setBulkDiscount] = useState({
    type: "percentage" as "percentage" | "fixed",
    value: 0,
    startDate: "",
    endDate: "",
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectProductsModal, setSelectProductsModal] = useState(false);
  const [products, setProducts] = useState<ProductWithId[] | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bulkDiscount.value || bulkDiscount.value <= 0) {
      newErrors.value = "Value must be greater than 0";
    }
    if (
      bulkDiscount.type === "percentage" &&
      bulkDiscount.value &&
      bulkDiscount.value > 100
    ) {
      newErrors.value = "Percentage cannot exceed 100%";
    }

    if (!bulkDiscount.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!bulkDiscount.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (bulkDiscount.startDate && bulkDiscount.endDate) {
      if (new Date(bulkDiscount.startDate) >= new Date(bulkDiscount.endDate)) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getAllProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;
    if (products) {
      setSelectProductsModal(true);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [products]);

  return (
    <>
      <div>
        <div>
          <h3 className=" text-2xl font-semibold text-primary-100">
            Bulk Discount
          </h3>
          <p className=" text-sm text-gray-600">
            Add discount to your products in bulk.
          </p>
        </div>
        <form className=" mt-8 space-y-4">
          {/* Enable discount */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={bulkDiscount.isActive}
              onChange={(e) =>
                setBulkDiscount((prev) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
            />
            <span className="text-sm">Enable Discount</span>
          </div>
          <div>
            <label
              htmlFor="type"
              className="text-gray-700 text-[11px] font-semibold uppercase"
            >
              Discount Type<span className="text-red-700">*</span>
            </label>
            <select
              id="type"
              className="outline-none block w-full py-[10px] px-3 mt-[10px] border rounded-sm border-gray-300"
              value={bulkDiscount.type}
              onChange={(e) =>
                setBulkDiscount((prev) => ({
                  ...prev,
                  type: e.target.value as "percentage" | "fixed",
                }))
              }
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="value"
              className="text-gray-700 text-[11px] font-semibold uppercase"
            >
              Value<span className="text-red-700">*</span>
            </label>
            <input
              id="value"
              name="value"
              type="number"
              placeholder="Discount value"
              value={bulkDiscount.value || ""}
              onChange={(e) =>
                setBulkDiscount((prev) => ({
                  ...prev,
                  value: Number(e.target.value),
                }))
              }
              className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                errors.value ? "border-red-500" : ""
              }`}
            />
            {errors.value && (
              <p className="mt-2 text-red-500 text-xs">{errors.value}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="text-gray-700 text-[11px] font-semibold uppercase"
            >
              Start Date<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) =>
                setBulkDiscount((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              type="datetime-local"
              name="startDate"
              value={bulkDiscount.startDate}
              id="startDate"
              className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                errors.startDate ? "border-red-500" : ""
              }`}
            />
            {errors.startDate && (
              <p className="mt-2 text-red-500 text-xs">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="text-gray-700 text-[11px] font-semibold uppercase"
            >
              End Date<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) =>
                setBulkDiscount((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
              type="datetime-local"
              name="endDate"
              value={bulkDiscount.endDate}
              id="endDate"
              className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                errors.endDate ? "border-red-500" : ""
              }`}
            />
            {errors.endDate && (
              <p className="mt-2 text-red-500 text-xs">{errors.endDate}</p>
            )}
          </div>
          <PrimaryButton
            handleClick={(e) => handleSubmit(e)}
            text={"Select Products"}
            style=" bg-accent w-[160px] rounded-full mt-5"
          />
        </form>
      </div>
      <SelectProductModal
        isOpen={selectProductsModal}
        onClose={() => setSelectProductsModal(false)}
        products={products}
        discount={bulkDiscount}
      />
    </>
  );
}
