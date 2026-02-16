"use client";
import { useEffect, useState } from "react";
import { Coupon, CouponWithId } from "@/types/coupon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addCoupon, editCoupon, getCouponByCode } from "@/utils/firebase";

export default function AddCoupon() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const couponCode = searchParams.get("coupon");
  const [coupon, setCoupon] = useState<CouponWithId | null>(null);
  const [formData, setFormData] = useState<Coupon>({
    code: "",
    type: "percentage",
    value: 0,
    isActive: true,
    usedCount: 0,
    minOrderAmount: undefined,
    usageLimitTotal: undefined,
    validFrom: "",
    validUntil: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  //   const handleCancelEdit = () => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.delete("coupon");
  //   };
  const handleCancelEdit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("coupon");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === ""
            ? undefined
            : Number(value)
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    console.log(formData);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.code || formData.code.trim() === "") {
      newErrors.code = "Coupon code is required";
    } else if (formData.code.length < 5) {
      newErrors.code = "Coupon code must be at least 5 characters";
    }

    if (!formData.value || formData.value <= 0) {
      newErrors.value = "Value must be greater than 0";
    }

    if (
      formData.type === "percentage" &&
      formData.value &&
      formData.value > 100
    ) {
      newErrors.value = "Percentage cannot exceed 100%";
    }

    if (!formData.validFrom) {
      newErrors.validFrom = "Start date is required";
    }

    if (!formData.validUntil) {
      newErrors.validUntil = "End date is required";
    }

    if (formData.validFrom && formData.validUntil) {
      if (new Date(formData.validFrom) >= new Date(formData.validUntil)) {
        newErrors.validUntil = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (couponCode && coupon) {
        await editCoupon(coupon.id, {
          ...formData,
          usedCount: coupon.usedCount,
        });
        handleCancelEdit();
      } else {
        await addCoupon(formData);
      }
      setFormData({
        code: "",
        type: "percentage",
        value: 0,
        isActive: true,
        usedCount: 0,
        minOrderAmount: undefined,
        usageLimitTotal: undefined,
        validFrom: "",
        validUntil: "",
      });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getCoupon = async (code: string) => {
    const coupon = await getCouponByCode(code);
    setCoupon(coupon);
    setFormData({
      ...coupon,
      validFrom: coupon.validFrom.slice(0, 16),
      validUntil: coupon.validUntil.slice(0, 16),
    });
  };
  useEffect(() => {
    if (couponCode) {
      getCoupon(couponCode);
    } else {
      setFormData({
        code: "",
        type: "percentage",
        value: 0,
        isActive: true,
        usedCount: 0,
        minOrderAmount: undefined,
        usageLimitTotal: undefined,
        validFrom: "",
        validUntil: "",
      });
    }
  }, [couponCode]);

  return (
    <form onSubmit={handleAddCoupon} className="max-w-2xl py-6 space-y-6">
      <div className="mb-6 flex items-center gap-x-5">
        <h2 className="text-2xl font-bold text-primary-100">
          {couponCode ? "Edit Coupon" : "Add New Coupon"}
        </h2>
        {couponCode && (
          <button
            className=" text-accent underline hover:no-underline transition-all duration-300"
            type="button"
            onClick={() => handleCancelEdit()}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Coupon Code */}
      <div>
        <label
          htmlFor="code"
          className="text-gray-700 text-[11px] font-semibold uppercase"
        >
          Coupon Code<span className="text-red-700">*</span>
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="code"
          value={formData.code}
          id="code"
          placeholder="e.g., WELCOME26"
          className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 uppercase ${
            errors.code && formData?.code === "" ? "border-red-500" : ""
          }`}
        />
        {errors.code && (
          <p className="mt-2 text-red-500 text-xs">{errors.code}</p>
        )}
      </div>

      {/* Coupon Type */}
      <div>
        <label
          htmlFor="type"
          className="text-gray-700 text-[11px] font-semibold uppercase"
        >
          Discount Type<span className="text-red-700">*</span>
        </label>
        <select
          onChange={handleChange}
          name="type"
          value={formData.type}
          id="type"
          className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
            errors.type ? "border-red-500" : ""
          }`}
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
        {errors.type && (
          <p className="mt-2 text-red-500 text-xs">{errors.type}</p>
        )}
      </div>

      {/* Coupon Value */}
      <div>
        <label
          htmlFor="value"
          className="text-gray-700 text-[11px] font-semibold uppercase"
        >
          Discount Value ({formData.type === "percentage" ? "%" : "₦"})
          <span className="text-red-700">*</span>
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="value"
          value={formData.value || ""}
          id="value"
          min="0"
          step={formData.type === "percentage" ? "1" : "0.01"}
          className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
            errors.value ? "border-red-500" : ""
          }`}
        />
        {errors.value && (
          <p className="mt-2 text-red-500 text-xs">{errors.value}</p>
        )}
      </div>

      {/* Min Order Amount */}
      <div>
        <label
          htmlFor="minOrderAmount"
          className="text-gray-700 text-[11px] font-semibold uppercase"
        >
          Minimum Order Amount (₦) - Optional
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="minOrderAmount"
          value={formData.minOrderAmount || ""}
          id="minOrderAmount"
          min="0"
          step="0.01"
          placeholder="Leave empty for no minimum"
          className="outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300"
        />
      </div>

      {/* Usage Limit Total */}
      <div>
        <label
          htmlFor="usageLimitTotal"
          className="text-gray-700 text-[11px] font-semibold uppercase"
        >
          Total Usage Limit - Optional
        </label>
        <input
          onChange={handleChange}
          type="number"
          name="usageLimitTotal"
          value={formData.usageLimitTotal || ""}
          id="usageLimitTotal"
          min="1"
          step="1"
          placeholder="Leave empty for unlimited uses"
          className="outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300"
        />
      </div>

      {/* Valid From */}
      <div>
        <label
          htmlFor="validFrom"
          className="text-gray-700 text-[11px] font-semibold uppercase"
        >
          Valid From<span className="text-red-700">*</span>
        </label>
        <input
          onChange={handleChange}
          type="datetime-local"
          name="validFrom"
          value={formData.validFrom}
          id="validFrom"
          className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
            errors.validFrom ? "border-red-500" : ""
          }`}
        />
        {errors.validFrom && (
          <p className="mt-2 text-red-500 text-xs">{errors.validFrom}</p>
        )}
      </div>

      {/* Valid Until */}
      <div>
        <label
          htmlFor="validUntil"
          className="text-gray-700 text-[11px] font-semibold uppercase"
        >
          Valid Until<span className="text-red-700">*</span>
        </label>
        <input
          onChange={handleChange}
          type="datetime-local"
          name="validUntil"
          value={formData.validUntil}
          id="validUntil"
          className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
            errors.validUntil ? "border-red-500" : ""
          }`}
        />
        {errors.validUntil && (
          <p className="mt-2 text-red-500 text-xs">{errors.validUntil}</p>
        )}
      </div>

      {/* Is Active */}
      <div className="flex items-center gap-3">
        <input
          onChange={handleChange}
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          id="isActive"
          className="w-4 h-4 accent-primary-100"
        />
        <label
          htmlFor="isActive"
          className="text-gray-700 text-sm font-semibold"
        >
          Active
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-white py-3 px-6 rounded-sm font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : couponCode ? "Save Coupon" : "Create Coupon"}
      </button>
    </form>
  );
}
