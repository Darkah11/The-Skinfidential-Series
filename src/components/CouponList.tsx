import { CouponWithId } from "@/types/coupon";
import { deleteCoupon, getCoupons } from "@/utils/firebase";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CouponList() {
  const [coupons, setCoupons] = useState<CouponWithId[] | null>(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const handleEditCoupon = (couponCode: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("coupon", couponCode);
    router.push(`?${params.toString()}`);
  };
  const getAllCoupons = async () => {
    const coupons = await getCoupons();
    setCoupons(coupons);
  };
  const handleDelete = async (id: string) => {
    await deleteCoupon(id);
    router.refresh();
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  return (
    <div className=" py-6">
      <h3 className="text-2xl font-bold text-primary-100">All coupons</h3>
      <div className=" mt-5 space-y-3">
        {coupons
          ? coupons.map((coupon) => (
              <div
                key={coupon.id}
                className=" bg-white shadow-xl border border-gold/50 rounded-xl p-3"
              >
                <div className=" flex items-center justify-between mb-2">
                  <p className=" font-semibold text-primary-50 ">
                    {coupon.code}
                  </p>
                  <div className=" flex flex-row gap-2">
                    <button onClick={() => handleEditCoupon(coupon.code)}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={(e) => handleDelete(coupon.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <p className=" text-sm">Used Count: {coupon.usedCount}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
