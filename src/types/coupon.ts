

export interface ValidateCouponInput {
  code: string
  cartTotal: number
}
export type CouponType = "percentage" | "fixed"
export interface Coupon {
  code: string
  type: CouponType
  value: number
  isActive: boolean
  usedCount: number
  minOrderAmount?: number
//   maxDiscountAmount?: number
  usageLimitTotal?: number
//   usageLimitPerUser?: number
  validFrom: string
  validUntil: string
}
export type CouponWithId = Coupon & {
  id: string;
};

export interface CouponValidationResult {
  coupon: Coupon 
}
