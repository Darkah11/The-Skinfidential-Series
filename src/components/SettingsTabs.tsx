"use client";

import { Tab, TabPanel, TabPanels, TabGroup, TabList } from "@headlessui/react";
import { Fragment } from "react";
import TaxAndDiscountTab from "./TaxAndDiscountTab";
import { GeneralSettings } from "@/types/settings";
import DeliveryTab from "./DeliveryTab";
import { DeliveryWithId } from "@/types/delivery";
import CouponTab from "./CouponTab";

const tabs = ["Tax & Discount", "Coupon", "Delivery", "Account"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface MyComponentProps {
  settings: GeneralSettings | null;
  deliveryOptions: DeliveryWithId[];
}

export default function SettingsTabs({
  settings,
  deliveryOptions,
}: MyComponentProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <TabGroup as="div" className="flex flex-col flex-1 min-h-0">
        {/* Tab List */}
        <TabList className="relative flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-200 px-2 sm:px-0 min-w-0">
          {tabs.map((tab) => (
            <Tab key={tab} as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    "relative whitespace-nowrap px-4 py-3 text-sm font-medium transition",
                    "focus:outline-none",
                    selected
                      ? "text-accent"
                      : "text-gray-600 hover:text-primary-100",
                  )}
                >
                  {tab}

                  {/* Animated underline */}
                  <span
                    className={classNames(
                      "absolute left-0 -bottom-[1px] h-[2px] w-full bg-accent transition-all",
                      selected ? "opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              )}
            </Tab>
          ))}
        </TabList>

        {/* Tab Panels */}
        <TabPanels className="mt-6 flex-1 min-h-0">
          <TabPanel className=" h-full">
            <TaxAndDiscountTab settings={settings} />
          </TabPanel>

          <TabPanel className=" h-full">
            <CouponTab />
          </TabPanel>

          <TabPanel>
            <DeliveryTab deliveryOptions={deliveryOptions} />
          </TabPanel>

          <TabPanel>
            {/* <NotificationsTab /> */}
            yo8
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
