import React, { useState } from "react";

interface UserRoleForm {
  uid: string;
  role: "admin" | "user";
}
interface newErrors {
  uid?: string;
}

export default function SetRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<newErrors>({});
  const [formData, setFormData] = useState<UserRoleForm>({
    uid: "",
    role: "admin",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: newErrors = {};
    if (!formData.uid.trim()) {
      errors.uid = "UID is required";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/admin/set-role", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: formData.uid, role: formData.role }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to set role");
        }
        alert("Role successfully set");
        setFormData({
          uid: "",
          role: "admin",
        });
      } catch (error: unknown) {
        console.log(error ? error : "null");

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };
  return (
    <div>
      <div>
        <div>
          <h3 className=" text-2xl font-semibold text-primary-100">
            Assign Role
          </h3>
          <p className=" text-sm text-gray-600">Set user role with uid.</p>
          {error && <p className="mt-2 text-red-500 text-xs">{error}</p>}
        </div>
        <form onSubmit={handleSubmit} className=" mt-5 space-y-3">
          <div>
            <label
              htmlFor="uid"
              className="text-gray-700 text-[11px] font-semibold uppercase"
            >
              UID<span className="text-red-700">*</span>
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, uid: e.target.value })
              }
              type="text"
              name="uid"
              value={formData.uid}
              id="uid"
              placeholder="User UID"
              className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300 ${
                errors.uid && formData?.uid === "" ? "border-red-500" : ""
              }`}
            />
            {errors.uid && (
              <p className="mt-2 text-red-500 text-xs">{errors.uid}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="text-gray-700 text-[11px] font-semibold uppercase"
            >
              Role<span className="text-red-700">*</span>
            </label>
            <select
              //   onChange={handleChange}
              name="role"
              value={formData.role}
              id="role"
              className={`outline-none block w-full py-[10px] px-3 mt-[5px] border rounded-sm border-gray-300`}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-accent text-sm w-[150px] text-white mt-5 py-3 px-6 font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Assign Role"}
          </button>
        </form>
      </div>
    </div>
  );
}
