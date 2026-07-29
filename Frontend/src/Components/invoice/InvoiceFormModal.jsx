import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

const createEmptyLineItem = () => ({
  description: "",
  quantity: 1,
  unitPrice: "",
});

const initialFormData = {
  invoiceTitle: "",
  description: "",
  invoiceDate: "",
  dueDate: "",
  lineItems: [createEmptyLineItem()],
};

const InvoiceFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  compact = false,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        invoiceTitle: initialData.invoiceTitle || "",
        description: initialData.description || "",
        invoiceDate: initialData.invoiceDate || "",
        dueDate: initialData.dueDate || "",
        lineItems:
          initialData.lineItems?.length > 0
            ? initialData.lineItems.map((item) => ({
                description: item.description || "",
                quantity: item.quantity || 1,
                unitPrice: item.unitPrice || "",
              }))
            : [createEmptyLineItem()],
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLineItemChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const addLineItem = () => {
    setFormData((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, createEmptyLineItem()],
    }));
  };

  const removeLineItem = (index) => {
    if (formData.lineItems.length === 1) return;

    setFormData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
  };

  const grandTotal = useMemo(() => {
    return formData.lineItems.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.unitPrice) || 0;
      return sum + qty * price;
    }, 0);
  }, [formData.lineItems]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      invoiceTitle: formData.invoiceTitle.trim(),
      description: formData.description.trim(),
      invoiceDate: formData.invoiceDate,
      dueDate: formData.dueDate,

      lineItems: formData.lineItems.map((item) => ({
        description: item.description.trim(),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
    });
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">
      <div
        className={`w-full overflow-y-auto rounded-2xl bg-white shadow-xl ${
          compact ? "max-w-6xl" : "max-w-5xl"
        } max-h-[92vh]`}
      >
        {/* ================= HEADER ================= */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {initialData ? "Edit Invoice" : "Create Invoice"}
            </h2>

            <p className="mt-1 text-slate-500">
              {initialData
                ? "Update invoice details and line items."
                : "Create a new invoice with multiple line items."}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 p-8">
          {/* ================= BASIC INFORMATION ================= */}

          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="mb-5 text-lg font-semibold text-slate-800">
              Invoice Information
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Invoice Title *
                </label>

                <input
                  required
                  name="invoiceTitle"
                  value={formData.invoiceTitle}
                  onChange={handleChange}
                  placeholder="Office Furniture Purchase"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description *
                </label>

                <textarea
                  required
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter invoice description..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Invoice Date *
                </label>

                <input
                  required
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Due Date *
                </label>

                <input
                  required
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* ================= LINE ITEMS ================= */}

          <div className="rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Invoice Line Items
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add all products or services included in this invoice.
                </p>
              </div>

              <button
                type="button"
                onClick={addLineItem}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr className="text-left text-sm font-semibold text-slate-700">
                    <th className="px-6 py-4">Description</th>
                    <th className="w-32 px-4 py-4">Qty</th>
                    <th className="w-44 px-4 py-4">Unit Price</th>
                    <th className="w-44 px-4 py-4">Line Total</th>
                    <th className="w-20 px-4 py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {formData.lineItems.map((item, index) => {
                    const qty = Number(item.quantity) || 0;
                    const price = Number(item.unitPrice) || 0;
                    const total = qty * price;

                    return (
                      <tr key={index} className="border-t border-slate-200">
                        <td className="px-6 py-4">
                          <input
                            required
                            value={item.description}
                            placeholder="Dell Monitor"
                            onChange={(e) =>
                              handleLineItemChange(
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
                          />
                        </td>

                        <td className="px-4 py-4">
                          <input
                            required
                            min="1"
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleLineItemChange(
                                index,
                                "quantity",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center outline-none transition focus:ring-2 focus:ring-indigo-500"
                          />
                        </td>

                        <td className="px-4 py-4">
                          <input
                            required
                            min="0"
                            step="0.01"
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) =>
                              handleLineItemChange(
                                index,
                                "unitPrice",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:ring-2 focus:ring-indigo-500"
                          />
                        </td>

                        <td className="px-4 py-4">
                          <div className="rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-700">
                            ₹ {total.toLocaleString()}
                          </div>
                        </td>

                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            disabled={formData.lineItems.length === 1}
                            onClick={() => removeLineItem(index)}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">
              <div className="flex justify-end">
                <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Grand Total</span>

                    <span className="text-indigo-600">
                      ₹ {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ================= ACTIONS ================= */}

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              {initialData ? "Save Changes" : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceFormModal;
