import AdminHeader from "@/components/AdminHeader";
import SettingsTabs from "@/components/SettingsTabs";
import {
  getDeliveryOptions,
  getGeneralSettings,
} from "@/utils/firebase";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SettingsPage() {
  const settings = await getGeneralSettings();
  const deliveryOptions = await getDeliveryOptions();

  return (
    <div className=" h-full flex flex-col">
      <AdminHeader title="Settings" />
      <div className=" w-full flex-1 bg-app-card overflow-x-hidden px-5 py-5">
        <SettingsTabs settings={settings} deliveryOptions={deliveryOptions} />
      </div>
    </div>
  );
}
