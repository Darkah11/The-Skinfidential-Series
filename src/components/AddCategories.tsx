"use client";
import React, { useState } from "react";
import { Category } from "@/types/products";
import { addCategory } from "@/utils/firebase";

export default function AddCategories() {
  type formErrors = {
    name?: string;
    description?: string;
  };
  const [formData, setFormData] = useState<Category>({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState<formErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    console.log(formData);

    const newErrors: formErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Category Name is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);
    console.log(errors);

    if (Object.keys(newErrors).length === 0) {
      const product = await addCategory(formData);
      console.log(product);
      setFormData({
        name: "",
        description: "",
      });
    }
    setLoading(false);
  };

  return (
    <form>
      <div>
        <div>
          <h3 className=" text-gray-600 text-lg mb-5 lg:text-2xl">
            Information
          </h3>
        </div>
        <div className=" mt-5">
          <div>
            <label
              htmlFor="name"
              className=" text-gray-700 text-[11px] font-semibold  uppercase"
            >
              Category Name<span className=" text-red-700">*</span>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={formData.name}
              id="name"
              className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                errors.name && formData?.name === "" ? " border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className=" mt-2 text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
          <div className=" mb-5">
            <label
              htmlFor="description"
              className=" text-gray-700 text-[11px] font-semibold  uppercase"
            >
              Description<span className=" text-red-700">*</span>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="description"
              value={formData.description}
              //   placeholder="Add category details"
              id="description"
              className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                errors.description && formData?.description === ""
                  ? " border-red-500"
                  : ""
              }`}
            />
            {errors.description && (
              <p className=" mt-2 text-red-500 text-xs">{errors.description}</p>
            )}
          </div>
        </div>

        <button
          disabled={loading}
          onClick={(e) => handleAddProduct(e)}
          type="submit"
          className=" w-[120px] px-3 py-2 bg-primary-100 flex items-center justify-center gap-2"
        >
          <span className=" text-xs text-center font-medium text-white">
            {loading ? "loading..." : "ADD CATEGORY"}
          </span>
        </button>
      </div>
    </form>
  );
}
