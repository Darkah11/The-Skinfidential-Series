"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CategoryWithId, Product, ProductWithId } from "@/types/products";
import Select, { MultiValue } from "react-select";
import { addProduct, editProduct } from "@/utils/firebase";
import { usePathname } from "next/navigation";

interface MyComponentProps {
  categories: CategoryWithId[];
  product?: ProductWithId | null;
}
type CategoryOption = {
  value: string;
  label: string;
};
type formErrors = {
  name?: string;
  price?: string;
  costPrice?: string;
  image?: string;
  categories?: string;
  tags?: string;
  description?: string;
};

export default function AddProduct({ categories, product }: MyComponentProps) {
  const pathname = usePathname();
  const editPath = "/admin/products/edit-product";
  const [category, setCategory] = useState<MultiValue<CategoryOption>>([]);
  const [tag, setTag] = useState<MultiValue<CategoryOption>>([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(null);
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    costPrice: 0,
    description: "",
    categories: [],
    tags: [],
  });

  const formattedCategories: CategoryOption[] = categories
    .filter((category) => category.id) // only categories with id
    .map((category) => ({
      value: category.name as string, // safe cast because of filter
      label: category.name,
    }));
  const optionsTag = [
    { value: "bestseller", label: "Bestseller" },
    { value: "trending", label: "Trending" },
  ];

  const [errors, setErrors] = useState<formErrors>({});
  const [loading, setLoading] = useState(false);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    setFormData({ ...formData, image: file });
  };

  const handleSelectCategories = (
    selectedOptions: MultiValue<CategoryOption>,
  ) => {
    const valuesArray = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, categories: valuesArray });
    setCategory(selectedOptions);
    console.log(`Values array:`, valuesArray);
  };
  const handleSelectTags = (
    // react-select passes an array of objects when isMulti is true
    selectedOptions: MultiValue<CategoryOption>,
  ) => {
    // Map the array of option objects to an array of just their values
    const valuesArray = selectedOptions.map((option) => option.value);

    setFormData({ ...formData, tags: valuesArray });
    setTag(selectedOptions);
    console.log(formData);
  };

  const handleAddProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    console.log(formData);

    const newErrors: formErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Product Name is required.";
    }
    if (formData.price == 0) {
      newErrors.price = "Price is required.";
    }
    if (formData.costPrice == 0) {
      newErrors.costPrice = "Cost price is required.";
    }
    if (!formData.image) {
      newErrors.image = "Image is required.";
    }
    if (formData.categories.length === 0) {
      newErrors.categories = "Add at least one category.";
    }

    setErrors(newErrors);
    console.log(errors);

    if (Object.keys(newErrors).length === 0) {
      const product = await addProduct(formData);
      console.log(product);
      setFormData({
        name: "",
        price: 0,
        costPrice: 0,
        description: "",
        categories: [],
        tags: [],
        stock: 0,
        image: undefined,
      });
      setCategory([]);
      setFile(null);
      setPreviewUrl(null);
    }
    setLoading(false);
  };
  const handleEditProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    console.log(formData);

    const newErrors: formErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Product Name is required.";
    }
    if (formData.price == 0) {
      newErrors.price = "Price is required.";
    }
    if (formData.costPrice == 0) {
      newErrors.costPrice = "Cost price is required.";
    }
    if (!formData.image && !product?.imageUrl?.trim()) {
      newErrors.image = "Image is required.";
    }
    if (formData.categories.length === 0) {
      newErrors.categories = "Add at least one category.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (product) {
        const editedProduct = await editProduct(
          product.id,
          formData,
          product.imageUrl || "",
          product.imagePublicId,
        );
        console.log(editedProduct);
      }
    }
    setLoading(false);
  };

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [file]);

  useEffect(() => {
    if (product && pathname.includes(editPath)) {
      setFormData({
        name: product.name,
        price: product.price,
        costPrice: product.costPrice,
        description: product.description,
        categories: product.categories,
        tags: product.tags,
      });
      setCategory(
        product.categories.map((cat) => ({
          label: cat,
          value: cat,
        })),
      );
      setTag(
        product.tags.map((tag) => ({
          label: tag,
          value: tag,
        })),
      );
      setPreviewUrl(product.imageUrl);
    }
  }, [product, pathname]);

  return (
    <form>
      <div>
        <div>
          <h3 className=" text-primary-100 font-semibold text-2xl">
            {pathname.includes(editPath) ? "Edit Product" : "Add Product"}
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
              htmlFor="cost_price"
              className=" text-gray-700 text-[11px] font-semibold  uppercase"
            >
              Cost Price <span className=" text-red-700">*</span>
            </label>
            <input
              onChange={handleChange}
              value={formData.costPrice}
              type="number"
              name="costPrice"
              id="cost_price"
              className={` hide-number-arrows outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                errors.costPrice && formData.costPrice == 0
                  ? " border-red-500"
                  : ""
              }`}
            />
            {errors.costPrice && (
              <p className=" mt-2 text-red-500 text-xs">{errors.costPrice}</p>
            )}
          </div>
          {formData.costPrice > 0 && (
            <p className=" text-sm my-2 text-green-600">
              Profit is {formData.price - formData.costPrice}
            </p>
          )}
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
                value={category}
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
                value={tag}
                onChange={handleSelectTags}
                options={optionsTag}
                name="tags"
              />
            </div>
          </div>
        </div>

        <button
          onClick={(e) =>
            pathname.includes(editPath)
              ? handleEditProduct(e)
              : handleAddProduct(e)
          }
          type="submit"
          className=" px-3 py-2 bg-primary-100 flex items-center gap-2"
        >
          <span className=" text-xs text-center font-medium text-white">
            {loading
              ? "loading..."
              : pathname.includes(editPath)
                ? "SAVE PRODUCT"
                : "ADD PRODUCT"}
          </span>
        </button>
      </div>
    </form>
  );
}
