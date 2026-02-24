import React from "react";
import SetRole from "./SetRole";
import ToggleMaintenance from "./ToggleMaintenance";

export default function AccountTab() {
  return (
    <>
      <div className=" border-b border-gold pb-10">
        <SetRole />
      </div>
      <div className=" py-10">
        <ToggleMaintenance />
      </div>
    </>
  );
}
