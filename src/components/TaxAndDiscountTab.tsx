import { GeneralSettings } from "@/types/settings";
import React, { useState } from "react";
import { PrimaryButton } from "./Button";
import { updateSettings } from "@/utils/firebase";
import AddBulkDiscount from "./AddBulkDiscount";

type formErrors = {
  tax?: string;
};
interface MyComponentProps {
  settings: GeneralSettings | null;
}

export default function TaxAndDiscountTab({ settings }: MyComponentProps) {
  const [formData, setFormData] = useState<GeneralSettings | null>(settings);
  const [errors, setErrors] = useState<formErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    console.log(formData);

    const newErrors: formErrors = {};
    if (formData?.tax.percentage == 0) {
      newErrors.tax = "Tax is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (formData) {
        await updateSettings(formData);
      }
    }
    setLoading(false);
  };
  return (
    <>
      <div className=" pb-8">
        <div>
          <div>
            <h3 className=" text-2xl font-semibold text-primary-100">Tax</h3>
            <p className=" text-sm text-gray-600">
              Manage your tax and keep it up to date{" "}
            </p>
          </div>
          <div className=" mt-3">
            <div className="flex items-center gap-x-3">
              <label htmlFor="tax" className=" text-gray-600">
                Tax:
              </label>
              <input
                // onChange={handleChange}

                value={formData?.tax.percentage}
                type="number"
                name="tax"
                id="tax"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    tax: {
                      percentage: Number(e.target.value),
                      enabled: formData?.tax?.enabled ?? true,
                    },
                  });
                  console.log(formData);
                }}
                className={` hide-number-arrows outline-none block w-full max-w-[450px] py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                  errors.tax && formData?.tax.percentage == 0
                    ? " border-red-500"
                    : ""
                }`}
              />
              {errors.tax && (
                <p className=" mt-2 text-red-500 text-xs">{errors.tax}</p>
              )}
            </div>
          </div>
        </div>
        <PrimaryButton
          handleClick={(e) => handleSaveChanges(e)}
          text={loading ? "loading..." : "Update Tax"}
          style=" bg-accent w-[160px] rounded-full mt-5"
        />
      </div>
      <div className=" py-8 border-t border-gold">
        <AddBulkDiscount />
      </div>
    </>
  );
}
