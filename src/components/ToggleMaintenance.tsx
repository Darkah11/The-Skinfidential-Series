"use client";

import { useState } from "react";
import { PrimaryButton } from "./Button";

export default function ToggleMaintenance() {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState<boolean>(false);

  const toggleMaintenance = async () => {
    setLoading(true);

    await fetch("/api/admin/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });

    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-x-5">
        <h2 className="text-2xl font-semibold text-primary-100">
          Toggle Maintenance
        </h2>
      </div>
      <div className=" flex items-center gap-x-5">
        <p>Maintenance:</p>
        {/* <button onClick={() => toggleMaintenance} disabled={loading}>
          <div
            className={` ${enabled ? " bg-accent" : " bg-gray-200"} w-[60px] h-[30px]  rounded-full px-1 flex items-center`}
          >
            <div
              className={`${enabled ? " ml-auto" : " mr-auto"} transition-all duration-300 bg-white h-[25px] w-[25px] rounded-full `}
            />
          </div>
        </button> */}
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="mr-2 h-6 w-6"
        />
      </div>
      <PrimaryButton
        handleClick={toggleMaintenance}
        text={loading ? "loading..." : "Confirm"}
        style=" bg-accent w-[160px] rounded-full mt-5"
      />
    </div>
  );
}
