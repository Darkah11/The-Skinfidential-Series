"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import dropdown from "@/public/dropdown-filled.svg";
import right from "@/public/arrow-right.svg";
import back from "@/public/arrow-left.svg";
import Image from "next/image";
import { Category, Product } from "@/types/products";
import Select, { MultiValue } from "react-select";
import { log } from "util";
import { addProduct } from "@/utils/firebase";
// import { useDispatch } from "react-redux";
// import { updateBilling } from "@/redux/slices/cartSlice";
// import { useAppSelector } from "@/redux/hooks";

interface MyComponentProps {
  categories: Category[];
}

export default function AddProduct({ categories }: MyComponentProps) {
  //   const dispatch = useDispatch();
  //   const billing = useAppSelector((state) => state.billing);
  const [category, setCategory] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    description: "",
    categories: [],
    tags: [],
    stock: 0,
  });
  const [errors, setErrors] = useState<formErrors>({});
  type formErrors = {
    name?: string;
    price?: string;
    image?: string;
    categories?: string;
    tags?: string;
    stock?: string;
    description?: string;
  };

  const formattedCategories = categories.map((category) => ({
    value: category.id, // Use the document ID or name as the internal value
    label: category.name, // Use the category name as the visible label
  }));
  const optionsTag = [
    { value: "bestseller", label: "Bestseller" },
    { value: "trending", label: "Trending" },
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  // const handleSubmit = (e: any) => {
  //   // e.preventDefault();
  //   // const newErrors: formErrors = {};
  //   // if (!formData.last_name.trim()) {
  //   //   newErrors.last_name = "Last Name is required.";
  //   // }
  //   // if (!formData.first_name.trim()) {
  //   //   newErrors.first_name = "First Name is required.";
  //   // }
  //   // if (!formData.email.trim()) {
  //   //   newErrors.email = "Email is required.";
  //   // }
  //   // if (!formData.address_1.trim()) {
  //   //   newErrors.address_1 = "Address is required.";
  //   // }
  //   // if (!formData.country.trim()) {
  //   //   newErrors.country = "Country is required.";
  //   // }
  //   // if (!formData.state.trim()) {
  //   //   newErrors.state = "State is required.";
  //   // }
  //   // if (!formData.city.trim()) {
  //   //   newErrors.city = "City/Town is required.";
  //   // }
  //   // if (!formData.phone.trim()) {
  //   //   newErrors.phone = "Phone is required.";
  //   // }
  //   // setErrors(newErrors);
  //   // if (Object.keys(newErrors).length === 0) {
  //   //   alert("Form submitted successfully!");
  //   // }
  // };

  const handleFileChange = (e: any) => {
    console.log(e);
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSelectCategories = (
    // react-select passes an array of objects when isMulti is true
    selectedOptions: MultiValue<any>
  ) => {
    // Map the array of option objects to an array of just their values
    const valuesArray = selectedOptions.map((option) => option.value);

    setFormData({ ...formData, categories: valuesArray });
    console.log(`Values array:`, valuesArray);
  };
  const handleSelectTags = (
    // react-select passes an array of objects when isMulti is true
    selectedOptions: MultiValue<any>
  ) => {
    // Map the array of option objects to an array of just their values
    const valuesArray = selectedOptions.map((option) => option.value);

    setFormData({ ...formData, tags: valuesArray });
    console.log(formData);
  };

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    console.log(formData);

    const newErrors: formErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Product Name is required.";
    }
    if (formData.price == 0) {
      newErrors.price = "Price is required.";
    }
    if (!formData.image) {
      newErrors.image = "Image is required.";
    }
    if (formData.categories.length === 0) {
      newErrors.categories = "Add at least one category.";
    }
    if (formData.stock == 0) {
      newErrors.stock = "Stock is required.";
    }

    setErrors(newErrors);
    console.log(errors);

    if (Object.keys(newErrors).length === 0) {
      const product = await addProduct(formData);
      console.log(product);
      setFormData({
        name: "",
        price: 0,
        description: "",
        categories: [],
        tags: [],
        stock: 0,
        image: undefined
      });
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handlePreview = (event: any) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    if (!file) {
      // Clear previous preview if no file is selected
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }

    // Create a new preview URL for the selected file
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Clean up function to revoke the object URL when the component unmounts
    // or when the 'file' dependency changes (a new file is selected)
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]); // Dependency on the file state

  return (
    <form onSubmit={handleAddProduct}>
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
              Product Name<span className=" text-red-700">*</span>
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
          <div className=" mb-5 lg:w-1/2">
            <label
              htmlFor="price"
              className=" text-gray-700 text-[11px] font-semibold  uppercase"
            >
              Price <span className=" text-red-700">*</span>
            </label>
            <input
              onChange={handleChange}
              value={formData.price}
              type="number"
              name="price"
              id="price"
              className={` hide-number-arrows outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                errors.price && formData.price == 0 ? " border-red-500" : ""
              }`}
            />
            {errors.price && (
              <p className=" mt-2 text-red-500 text-xs">{errors.price}</p>
            )}
          </div>
          <div className=" mb-5 lg:w-1/2">
            <label
              htmlFor="description"
              className=" text-gray-700 text-[11px] font-semibold  uppercase"
            >
              Description
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="description"
              value={formData.description}
              placeholder="Add product details"
              id="description"
              className=" outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Product Image:</label>
            <input
              type="file"
              name="image"
              onChange={(e) => {
                handlePreview(e);
                handleFileChange(e);
              }}
              accept="image/*"
              className="w-full mt-1 p-2 border rounded"
              required
            />
            {errors.image && (
              <p className=" mt-2 text-red-500 text-xs">{errors.image}</p>
            )}
            {previewUrl && (
              <div style={{ marginTop: "20px" }}>
                <h4>Image Preview:</h4>
                {/* Use the Next.js Image component with the dynamically created URL */}
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={200}
                  height={200}
                  objectFit="cover"
                />
              </div>
            )}
          </div>
          {/* <div className=" mb-5">
            <label
              htmlFor="categories"
              className=" text-gray-700 text-[11px] font-semibold  uppercase"
            >
              Categories <span className=" text-red-700">*</span>
            </label>
            <select
              value={formData.categories}
              multiple
              id="categories"
              onChange={handleChange}
              name="categories"
            >
              <option value="">Select Categories</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {errors.categories && (
              <p className=" mt-2 text-red-500 text-xs">{errors.categories}</p>
            )}
          </div> */}
          <div className=" mb-5">
            {/* <label
              htmlFor="tags"
              className=" text-gray-700 text-[11px] font-semibold  uppercase"
            >
              Tags <span className=" text-red-700">*</span>
            </label> */}
            {/* <select
              value={formData.tags}
              id="tags"
              onChange={handleChange}
              name="categories"
            >
              <option value="">Select Tags</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select> */}
            <div className=" mb-5">
              <label
                htmlFor="categories"
                className=" text-gray-700 text-[11px] font-semibold  uppercase"
              >
                Categories <span className=" text-red-700">*</span>
              </label>
              <Select
                isMulti
                defaultValue={category}
                onChange={handleSelectCategories}
                options={formattedCategories}
                name="categories"
                id="categories"
                classNamePrefix=" border-black"
                className={` outline-none block w-full mt-[5px]  rounded-md border-gray-300 ${
                  errors.categories && formData.categories.length == 0
                    ? " border border-red-500"
                    : ""
                }`}
              />
              {errors.categories && (
                <p className=" mt-2 text-red-500 text-xs">
                  {errors.categories}
                </p>
              )}
            </div>
            <div className=" mb-5">
              <label
                htmlFor="tags"
                className=" text-gray-700 text-[11px] font-semibold  uppercase"
              >
                Tags
              </label>
              <Select
                isMulti
                defaultValue={category}
                onChange={handleSelectTags}
                options={optionsTag}
                name="tags"
              />
            </div>
          </div>

          <div className=" mb-5">
            <label
              htmlFor="stock"
              className=" text-gray-700 text-[11px] font-semibold  uppercase"
            >
              Stock <span className=" text-red-700">*</span>
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="stock"
              value={formData.stock}
              id="phone"
              className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                errors.stock && formData.stock == 0 ? " border-red-500" : ""
              }`}
            />
            {errors.stock && (
              <p className=" mt-2 text-red-500 text-xs">{errors.stock}</p>
            )}
          </div>
        </div>

        <button
          onClick={(e) => handleAddProduct(e)}
          type="submit"
          className=" px-3 py-2 bg-primary-100 flex items-center gap-2"
        >
          <span className=" text-xs font-medium text-white">ADD PRODUCT</span>
        </button>
      </div>
    </form>
  );
}
