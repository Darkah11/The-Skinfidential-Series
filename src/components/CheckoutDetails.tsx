"use client";
import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
// import dropdown from "@/public/dropdown-filled.svg";
import { useDispatch } from "react-redux";
import { updateBilling } from "@/redux/slices/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { PrimaryButton } from "./Button";

export default function CheckoutDetails() {
  const dispatch = useDispatch();
  const billing = useAppSelector((state) => state.billing);
  const [formData, setFormData] = useState(billing);
  const [errors, setErrors] = useState<formErrors>({});
  type formErrors = {
    last_name?: string;
    first_name?: string;
    email?: string;
    country?: string;
    address_1?: string;
    state?: string;
    phone?: string;
    city?: string;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors: formErrors = {};

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required.";
    }
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!formData.address_1.trim()) {
      newErrors.address_1 = "Address is required.";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required.";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City/Town is required.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    }

    setErrors(newErrors);
    console.log(errors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(updateBilling(formData));
      console.log(formData);
    }
  };
  return (
    <>
      <form className="">
        <div>
          <div className=" mt-5">
            <h3 className=" text-gray-600 font-semibold text-lg mb-5 lg:text-2xl">
              Delivery Information
            </h3>
            <div className=" md:flex md:justify-between md:gap-x-5">
              <div className=" mb-5 md:w-1/2">
                <label
                  htmlFor="first_name"
                  className=" text-gray-700 text-[11px] font-semibold  uppercase"
                >
                  FIRST NAME <span className=" text-red-700">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={formData.first_name}
                  type="text"
                  name="first_name"
                  id="first_name"
                  className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                    errors.first_name && formData.first_name === ""
                      ? " border-red-500"
                      : ""
                  }`}
                />
                {errors.first_name && (
                  <p className=" mt-2 text-red-500 text-xs">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div className=" mb-5 md:w-1/2">
                <label
                  htmlFor="last_name"
                  className=" text-gray-700 text-[11px] font-semibold  uppercase"
                >
                  LAST NAME <span className=" text-red-700">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  id="last_name"
                  className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                    errors.last_name && formData.last_name === ""
                      ? " border-red-500"
                      : ""
                  }`}
                />
                {errors.last_name && (
                  <p className=" mt-2 text-red-500 text-xs">
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>
            <div className=" mb-5">
              <label
                htmlFor="email"
                className=" text-gray-700 text-[11px] font-semibold  uppercase"
              >
                Email address <span className=" text-red-700">*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                value={formData.email}
                id="email"
                className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                  errors.email && formData.email === "" ? " border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className=" mt-2 text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className=" mb-5">
              <label
                htmlFor="phone"
                className=" text-gray-700 text-[11px] font-semibold  uppercase"
              >
                PHONE <span className=" text-red-700">*</span>
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="phone"
                value={formData.phone}
                id="phone"
                className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                  errors.phone && formData.phone === "" ? " border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className=" mt-2 text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
            <div className=" mb-5">
              <label
                htmlFor="company"
                className=" text-gray-700 text-[11px] font-semibold  uppercase"
              >
                COMPANY NAME (OPTIONAL)
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="company"
                value={formData.company}
                id="company"
                className=" outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300"
              />
            </div>
            <div className=" mb-5">
              <label
                htmlFor="country"
                className=" text-gray-700 text-[11px] font-semibold  uppercase"
              >
                COUNTRY / REGION <span className=" text-red-700">*</span>
              </label>
              <CountryDropdown
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e })}
                name="country"
                className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                  errors.country && formData.country === ""
                    ? " border-red-500"
                    : ""
                }`}
              />
              {errors.country && (
                <p className=" mt-2 text-red-500 text-xs">{errors.country}</p>
              )}
            </div>
            <div className=" lg:flex lg:justify-between lg:gap-x-5">
              <div className=" mb-5 lg:w-1/2">
                <label
                  htmlFor="state"
                  className=" text-gray-700 text-[11px] font-semibold  uppercase"
                >
                  STATE <span className=" text-red-700">*</span>
                </label>
                <RegionDropdown
                  id="state"
                  country={formData.country}
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e })}
                  className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                    errors.state && formData.state === ""
                      ? " border-red-500"
                      : ""
                  }`}
                />
                {errors.state && (
                  <p className=" mt-2 text-red-500 text-xs">{errors.state}</p>
                )}
              </div>
              <div className=" mb-5 lg:w-1/2">
                <label
                  htmlFor="city"
                  className=" text-gray-700 text-[11px] font-semibold  uppercase"
                >
                  Town / City <span className=" text-red-700">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="city"
                  value={formData.city}
                  id="city"
                  className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                    errors.city && formData.city === "" ? " border-red-500" : ""
                  }`}
                />
                {errors.city && (
                  <p className=" mt-2 text-red-500 text-xs">{errors.city}</p>
                )}
              </div>
            </div>
            <div className=" mb-5">
              <label
                htmlFor="address_1"
                className=" text-gray-700 text-[11px] font-semibold  uppercase"
              >
                STREET ADDRESS <span className=" text-red-700">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.address_1}
                type="text"
                name="address_1"
                placeholder="House number and street name"
                id="address_1"
                className={` outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                  errors.address_1 && formData.address_1 === ""
                    ? " border-red-500"
                    : ""
                }`}
              />
              {errors.address_1 && (
                <p className=" mt-2 text-red-500 text-xs">{errors.address_1}</p>
              )}
            </div>
          </div>
          <div className=" mt-10">
            <PrimaryButton text="Pay Now" handleClick={(e) => handleSubmit(e)} style=" bg-primary-100 w-full py-7 rounded-md" />
          </div>
        </div>
      </form>
    </>
  );
}
