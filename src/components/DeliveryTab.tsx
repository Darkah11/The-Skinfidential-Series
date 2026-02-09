import React, { useState } from "react";
import { PrimaryButton } from "./Button";
import { updateDeliveryOptions } from "@/utils/firebase";
import { DeliveryWithId } from "@/types/delivery";

interface MyComponentProps {
  deliveryOptions: DeliveryWithId[];
}

export default function DeliveryTab({ deliveryOptions }: MyComponentProps) {
  const [formData, setFormData] = useState<DeliveryWithId[]>(deliveryOptions);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    [key: number]: { name?: string; price?: string };
  }>({});

  const handleChange = (
    index: number,
    field: keyof DeliveryWithId,
    value: string | number | boolean,
  ) => {
    const updated = [...formData];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(updated);

    if (errors[index]?.[field as "name" | "price"]) {
      const newErrors = { ...errors };
      delete newErrors[index]?.[field as "name" | "price"];
      if (Object.keys(newErrors[index] || {}).length === 0) {
        delete newErrors[index];
      }
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: number]: { name?: string; price?: string } } = {};
    let isValid = true;

    formData.forEach((option, index) => {
      const fieldErrors: { name?: string; price?: string } = {};

      if (!option.name || option.name.trim() === "") {
        fieldErrors.name = "Name is required";
        isValid = false;
      }

      if (
        option.price === null ||
        option.price === undefined ||
        isNaN(option.price)
      ) {
        fieldErrors.price = "Price is required";
        isValid = false;
      } else if (option.price < 0) {
        fieldErrors.price = "Price cannot be negative";
        isValid = false;
      }

      if (Object.keys(fieldErrors).length > 0) {
        newErrors[index] = fieldErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await updateDeliveryOptions(formData);
      alert("Delivery options updated successfully!");
    } catch (error) {
      console.error(error);
      
      alert("Failed to update delivery options");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 relative h-full  pb-10">
      <div>
        <h3 className=" text-2xl font-semibold text-primary-100">Delivery Options</h3>
        <p className=" text-sm text-gray-600">
          Manage your delivery options and keep it up to date{" "}
        </p>
      </div>
      {formData.map((option, index) => (
        <div key={option.id} className="border rounded-lg p-4 bg-white shadow">
          <div className="grid grid-cols-2 gap-4">
            <div className=" col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={option.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className={`w-full border rounded px-3 py-2 ${
                  errors[index]?.name ? "border-red-500" : ""
                }`}
              />
              {errors[index]?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[index].name}
                </p>
              )}
            </div>

            <div className=" col-span-2 md:col-span-1">
              <label className="block text-sm font-medium mb-1">
                Price (₦)
              </label>
              <input
                type="number"
                value={option.price}
                onChange={(e) =>
                  handleChange(index, "price", parseFloat(e.target.value))
                }
                className={`w-full border rounded px-3 py-2 ${
                  errors[index]?.price ? "border-red-500" : ""
                }`}
                step="0.01"
                min="0"
              />
              {errors[index]?.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[index].price}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={option.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
                className="w-full border rounded px-3 py-2"
                rows={2}
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={option.order}
                onChange={(e) =>
                  handleChange(index, "order", parseInt(e.target.value))
                }
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={option.isActive}
                  onChange={(e) =>
                    handleChange(index, "isActive", e.target.checked)
                  }
                  className="mr-2 h-4 w-4"
                />
                <span className="text-sm font-medium">Active</span>
              </label>
            </div>
          </div>
        </div>
      ))}
      <PrimaryButton
        handleClick={() => handleSave()}
        text={loading ? "loading..." : "Save Changes"}
        style=" bg-accent w-[160px] rounded-full fixed right-5 bottom-5"
      />
    </div>
  );
}
