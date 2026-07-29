import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialFormData = {
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
};

const OrganizationFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  /**
   * Populate form while editing
   */
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        organizationName: initialData.organizationName || "",
        legalBusinessName: initialData.legalBusinessName || "",
        businessType: initialData.businessType || "",
        industryType: initialData.industryType || "",
        gstNumber: initialData.gstNumber || "",
        registrationNumber: initialData.registrationNumber || "",
        email: initialData.email || "",
        phoneNumber: initialData.phoneNumber || "",
        website: initialData.website || "",
        addressLine1: initialData.addressLine1 || "",
        addressLine2: initialData.addressLine2 || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "",
        pincode: initialData.pincode || "",
        contactPersonName: initialData.contactPersonName || "",
        contactPersonEmail: initialData.contactPersonEmail || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, initialData]);

  /**
   * Handle Input Change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Submit Form
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  /**
   * Close Modal
   */
  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
      {/* Modal */}

      <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b bg-white px-8 py-5">
          <div>
            <h2
              className={`text-2xl font-bold transition-colors duration-200 ${
                initialData ? "text-amber-700" : "text-slate-800"
              }`}
            >
              {initialData ? "Edit Organization" : "Create Organization"}
            </h2>

            <p
              className={`mt-1 transition-colors duration-200 ${
                initialData ? "text-amber-600" : "text-slate-500"
              }`}
            >
              {initialData
                ? "Update organization details and save the latest information."
                : "Fill the details below to onboard a new organization."}
            </p>
            {/* Badge */}
            <div className="mt-3">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  initialData
                    ? "bg-amber-100 text-amber-700"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {initialData
                  ? "Editing Existing Organization"
                  : "Creating New Organization"}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Body */}

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ============================
                Organization Information
          ============================ */}

            <section>
              <h3 className="mb-5 text-lg font-semibold text-slate-800">
                Organization Information
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Organization Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    required
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Infosys Ltd."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Legal Business Name
                  </label>

                  <input
                    name="legalBusinessName"
                    value={formData.legalBusinessName}
                    onChange={handleChange}
                    placeholder="Infosys Limited"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Business Type
                  </label>

                  <input
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    placeholder="Private Limited"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Industry Type
                  </label>

                  <input
                    name="industryType"
                    value={formData.industryType}
                    onChange={handleChange}
                    placeholder="IT Services"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    GST Number
                  </label>

                  <input
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="22AAAAA0000A1Z5"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Registration Number
                  </label>

                  <input
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="CIN / Registration No."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* ============================
                Contact Details
          ============================ */}

            <section>
              <h3 className="mb-5 text-lg font-semibold text-slate-800">
                Contact Details
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Organization Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="company@email.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Website
                  </label>

                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://company.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>
            {/* ============================
                Address
          ============================ */}

            <section>
              <h3 className="mb-5 text-lg font-semibold text-slate-800">
                Address
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Address Line 1
                  </label>

                  <input
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="Address Line 1"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Address Line 2
                  </label>

                  <input
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Address Line 2"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    City
                  </label>

                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    State
                  </label>

                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Country
                  </label>

                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Pincode
                  </label>

                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* ============================
                Contact Person
          ============================ */}

            <section>
              <h3 className="mb-5 text-lg font-semibold text-slate-800">
                Contact Person
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Contact Person Name
                  </label>

                  <input
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Contact Person Email
                  </label>

                  <input
                    type="email"
                    name="contactPersonEmail"
                    value={formData.contactPersonEmail}
                    onChange={handleChange}
                    placeholder="john.doe@company.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Sticky Footer */}

        <div className="shrink-0 border-t bg-white px-8 py-5">
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="organization-form"
              className={`rounded-xl px-6 py-3 font-medium text-white transition duration-200 ${
                initialData
                  ? "bg-amber-600 hover:bg-amber-700 focus:ring-2 focus:ring-amber-500"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
              }`}
            >
              {initialData ? "Update Organization" : "Create Organization"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationFormModal;
