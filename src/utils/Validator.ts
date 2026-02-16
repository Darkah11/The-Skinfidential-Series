import {
  Coupon,
  CouponValidationResult,
  ValidateCouponInput,
} from "@/types/coupon";
import { getCouponByCode } from "./firebase";
import { getAdminDb } from "@/config/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

function validateCouponStatus(coupon: Coupon) {
  const now = new Date();

  if (!coupon.isActive) throw new Error("Coupon not available");

  if (now < new Date(coupon.validFrom)) throw new Error("Coupon not started");

  if (now > new Date(coupon.validUntil)) throw new Error("Coupon expired");
}

async function validateUsageLimits(coupon: Coupon) {
  if (coupon.usageLimitTotal && coupon.usedCount >= coupon.usageLimitTotal)
    throw new Error("Coupon fully used");
}

export async function validateCoupon(
  input: ValidateCouponInput,
): Promise<CouponValidationResult | null> {
  try {
    const { code } = input;

    const coupon = await getCouponByCode(code);

    // Any error thrown below will jump to catch → return null
    validateCouponStatus(coupon);
    validateUsageLimits(coupon);

    return {
      coupon,
    };
  } catch (error) {
    // optional: log for debugging
    console.log("Coupon validation failed:", error);

    return null;
  }
}

function calculateDiscount(coupon: Coupon, cartTotal: number) {
  if (coupon.minOrderAmount && cartTotal < coupon.minOrderAmount)
    throw new Error("Minimum order amount not reached");

  let discount = 0;

  if (coupon.type === "percentage") {
    discount = cartTotal * (coupon.value / 100);
  }

  if (coupon.type === "fixed") {
    discount = coupon.value;
  }

  return Math.min(discount, cartTotal);
}

export async function applyCouponToOrder(couponId: string) {
  const db = getAdminDb();
  const couponRef = db.collection("coupons").doc(couponId);

  await db.runTransaction(async (tx) => {
    const couponDoc = await tx.get(couponRef);
    if (!couponDoc.exists) throw new Error("Coupon missing");

    tx.update(couponRef, {
      usedCount: FieldValue.increment(1),
    });

    // const usageRef = db.collection("couponUsages").doc();
    // tx.set(usageRef, {
    //   couponId,
    //   userId,
    //   orderId,
    //   usedAt: Timestamp.now(),
    // });
  });
}
