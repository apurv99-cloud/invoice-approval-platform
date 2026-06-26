import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrganization } from "../../Service/OrganizationService";

export default function CreateOrganizations() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createOrganization(form);

      alert("Organization Created Successfully. Invitation Mail Sent.");

      navigate("/organizations");
    } catch (error) {
      console.error(error);

      alert("Failed to Create Organization");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">Create Organization</h1>

          <p className="text-white/60 mt-2">
            Register a new organization and send onboarding invitation
          </p>
        </div>

        {/* Form Container */}

        <div
          className="
          bg-white/[0.03]
          border
          border-white/10
          rounded-3xl
          p-8
          "
        >
          {/* Organization Information */}

          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Organization Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-white/70">
                  Organization Name *
                </label>

                <input
                  type="text"
                  name="organizationName"
                  value={form.organizationName}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">
                  Legal Business Name
                </label>

                <input
                  type="text"
                  name="legalBusinessName"
                  value={form.legalBusinessName}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">
                  Business Type
                </label>

                <input
                  type="text"
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">
                  Industry Type
                </label>

                <input
                  type="text"
                  name="industryType"
                  value={form.industryType}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">GST Number</label>

                <input
                  type="text"
                  name="gstNumber"
                  value={form.gstNumber}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">
                  Registration Number
                </label>

                <input
                  type="text"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>
            </div>
          </div>
          {/* Contact Information */}

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-white/70">
                  Organization Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">Phone Number</label>

                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-white/70">Website</label>

                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>
            </div>
          </div>

          {/* Address Information */}

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Address Information</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block mb-2 text-white/70">
                  Address Line 1
                </label>

                <input
                  type="text"
                  name="addressLine1"
                  value={form.addressLine1}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-white/70">
                  Address Line 2
                </label>

                <input
                  type="text"
                  name="addressLine2"
                  value={form.addressLine2}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">City</label>

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">State</label>

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">Country</label>

                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>
            </div>
          </div>
          {/* Primary Contact */}

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Primary Contact</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-white/70">
                  Contact Person Name
                </label>

                <input
                  type="text"
                  name="contactPersonName"
                  value={form.contactPersonName}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">
                  Contact Person Email
                </label>

                <input
                  type="email"
                  name="contactPersonEmail"
                  value={form.contactPersonEmail}
                  onChange={handleChange}
                  className="
                  w-full
                  p-4
                  rounded-xl
                  bg-white/[0.04]
                  border
                  border-white/10
                  outline-none
                  "
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}

          <div
            className="
            mt-12

            flex
            flex-col
            md:flex-row

            gap-4
            justify-end
            "
          >
            <button
              type="button"
              onClick={() => navigate("/organizations")}
              className="
              px-6
              py-3

              rounded-xl

              border
              border-white/10

              text-white/80

              hover:bg-white/[0.03]

              transition
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="
              px-8
              py-3

              rounded-xl

              bg-white

              text-black

              font-semibold

              hover:opacity-90

              transition

              disabled:opacity-50
              "
            >
              {loading ? "Creating Organization..." : "Create Organization"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
