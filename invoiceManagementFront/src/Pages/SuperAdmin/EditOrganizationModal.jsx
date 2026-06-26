import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { updateOrganization } from "../../Service/OrganizationService";

export default function EditOrganizationModal({
  open,

  onClose,

  selectedOrganization,

  refreshOrganizations,
}) {
  const [formData, setFormData] = useState({
    organizationName: "",

    legalBusinessName: "",

    businessType: "",

    industryType: "",

    gstNumber: "",

    registrationNumber: "",

    email: "",

    phoneNumber: "",

    website: "",

    addressLine1: "",

    addressLine2: "",

    city: "",

    state: "",

    country: "",

    pincode: "",

    contactPersonName: "",

    contactPersonEmail: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (selectedOrganization) {
      setFormData({
        organizationName: selectedOrganization.organizationName || "",

        legalBusinessName: selectedOrganization.legalBusinessName || "",

        businessType: selectedOrganization.businessType || "",

        industryType: selectedOrganization.industryType || "",

        gstNumber: selectedOrganization.gstNumber || "",

        registrationNumber: selectedOrganization.registrationNumber || "",

        email: selectedOrganization.email || "",

        phoneNumber: selectedOrganization.phoneNumber || "",

        website: selectedOrganization.website || "",

        addressLine1: selectedOrganization.addressLine1 || "",

        addressLine2: selectedOrganization.addressLine2 || "",

        city: selectedOrganization.city || "",

        state: selectedOrganization.state || "",

        country: selectedOrganization.country || "",

        pincode: selectedOrganization.pincode || "",

        contactPersonName: selectedOrganization.contactPersonName || "",

        contactPersonEmail: selectedOrganization.contactPersonEmail || "",
      });
    }
  }, [selectedOrganization]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateOrganization(
        selectedOrganization.organizationId,

        formData,
      );

      refreshOrganizations();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-5xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold text-white">Edit Organization</h2>

            <p className="mt-1 text-sm text-slate-400">
              Update organization information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="max-h-[75vh] overflow-y-auto p-8"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Organization Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Organization Name
              </label>

              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Legal Business Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Legal Business Name
              </label>

              <input
                type="text"
                name="legalBusinessName"
                value={formData.legalBusinessName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Business Type */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Business Type
              </label>

              <input
                type="text"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Industry Type */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Industry Type
              </label>

              <input
                type="text"
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* GST Number */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                GST Number
              </label>

              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Registration Number */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Registration Number
              </label>

              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Phone Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Website */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Website
              </label>

              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Address Line 1 */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Address Line 1
              </label>

              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Address Line 2 */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Address Line 2
              </label>

              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* City */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* State */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Country */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Country
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Pincode */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Contact Person */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Contact Person Name
              </label>

              <input
                type="text"
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            {/* Contact Person Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Contact Person Email
              </label>

              <input
                type="email"
                name="contactPersonEmail"
                value={formData.contactPersonEmail}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4 border-t border-slate-800 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Organization"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
