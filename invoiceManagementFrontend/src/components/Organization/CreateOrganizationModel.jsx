import { useState } from "react";

export default function CreateOrganizationModal({ close }) {
  const [form, setForm] = useState({
    organizationName: "",
    organizationEmail: "",
    contactPerson: "",
    domain: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(form);

    close();
  };

  return (
    <div
      className="
      fixed
      inset-0

      bg-black/50

      flex
      items-center
      justify-center

      z-50
      "
    >
      <div
        className="
        w-full
        max-w-xl

        bg-[#111827]

        border
        border-white/10

        rounded-3xl

        p-8
        "
      >
        <h2 className="text-2xl font-bold">Create Organization</h2>

        <p className="text-white/50 mt-2">
          Invite a new organization to InvoiceFlow
        </p>

        <div className="mt-8 space-y-4">
          <input
            name="organizationName"
            placeholder="Organization Name"
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

          <input
            name="organizationEmail"
            placeholder="Organization Email"
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

          <input
            name="contactPerson"
            placeholder="Contact Person"
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

          <input
            name="domain"
            placeholder="Organization Domain"
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

        <div className="flex gap-4 mt-8">
          <button
            onClick={close}
            className="
            flex-1

            py-3

            rounded-xl

            border
            border-white/10
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
            flex-1

            py-3

            rounded-xl

            bg-white

            text-black

            font-medium
            "
          >
            Create Organization
          </button>
        </div>
      </div>
    </div>
  );
}
