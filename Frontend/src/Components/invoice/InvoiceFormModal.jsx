import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";

const createEmptyLineItem = () => ({
  itemCode: "",
  itemName: "",
  description: "",
  unitOfMeasure: "EA",
  quantity: 1,
  unitPrice: "",
  taxRate: 0,
});

const calculateLineTotal = (item) =>
  (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

const calculateLineTax = (item) =>
  (calculateLineTotal(item) * (Number(item.taxRate) || 0)) / 100;

const calculateItemTotal = (item) =>
  calculateLineTotal(item) + calculateLineTax(item);

const initialFormData = {
  invoiceTitle: "",
  invoiceNumber: "",
  purchaseOrderNumber: "",
  contractNumber: "",
  goodsReceiptNumber: "",

  description: "",

  invoiceDate: "",
  dueDate: "",
  deliveryDate: "",

  currency: "INR",

  discountAmount: "",
  shippingCharges: "",
  handlingCharges: "",

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
        invoiceNumber: initialData.invoiceNumber || "",
        purchaseOrderNumber: initialData.purchaseOrderNumber || "",
        contractNumber: initialData.contractNumber || "",
        goodsReceiptNumber: initialData.goodsReceiptNumber || "",

        description: initialData.description || "",

        invoiceDate: initialData.invoiceDate || "",
        dueDate: initialData.dueDate || "",
        deliveryDate: initialData.deliveryDate || "",

        currency: initialData.currency || "INR",

        discountAmount: initialData.discountAmount ?? "",
        shippingCharges: initialData.shippingCharges ?? "",
        handlingCharges: initialData.handlingCharges ?? "",

        lineItems:
          initialData.lineItems?.length > 0
            ? initialData.lineItems.map((item) => ({
                itemCode: item.itemCode || "",
                itemName: item.itemName || "",
                description: item.description || "",
                unitOfMeasure: item.unitOfMeasure || "EA",
                quantity: item.quantity ?? 1,
                unitPrice: item.unitPrice ?? "",
                taxRate: item.taxRate ?? 0,
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

  const subtotal = useMemo(() => {
    return formData.lineItems.reduce(
      (sum, item) => sum + calculateLineTotal(item),
      0,
    );
  }, [formData.lineItems]);

  const taxAmount = useMemo(
    () =>
      formData.lineItems.reduce((sum, item) => sum + calculateLineTax(item), 0),
    [formData.lineItems],
  );

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: formData.currency,
        maximumFractionDigits: 2,
      }),
    [formData.currency],
  );

  const discountAmount = Number(formData.discountAmount) || 0;
  const shippingCharges = Number(formData.shippingCharges) || 0;
  const handlingCharges = Number(formData.handlingCharges) || 0;

  const grandTotal = useMemo(() => {
    return (
      subtotal - discountAmount + taxAmount + shippingCharges + handlingCharges
    );
  }, [subtotal, discountAmount, taxAmount, shippingCharges, handlingCharges]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      invoiceTitle: formData.invoiceTitle.trim(),
      invoiceNumber: formData.invoiceNumber.trim(),
      purchaseOrderNumber: formData.purchaseOrderNumber.trim(),
      contractNumber: formData.contractNumber.trim(),
      goodsReceiptNumber: formData.goodsReceiptNumber.trim(),

      description: formData.description.trim(),

      invoiceDate: formData.invoiceDate,
      dueDate: formData.dueDate,
      deliveryDate: formData.deliveryDate,

      currency: formData.currency,

      discountAmount,
      taxAmount,
      shippingCharges,
      handlingCharges,

      lineItems: formData.lineItems.map((item) => ({
        itemCode: item.itemCode.trim(),
        itemName: item.itemName.trim(),
        description: item.description.trim(),
        unitOfMeasure: item.unitOfMeasure.trim(),
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        taxRate: Number(item.taxRate) || 0,
        taxAmount: calculateLineTax(item),
        lineTotal: calculateLineTotal(item),
      })),
    });
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-3 backdrop-blur-sm sm:p-6">
      <div className="flex h-[94vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-2xl shadow-slate-950/20">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8 sm:py-5">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              Accounts payable
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {initialData ? "Edit Invoice" : "Create Invoice"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {initialData
                ? "Update invoice details and save your changes."
                : "Fill in the details below to create a new invoice."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <X size={22} />
          </button>
        </div>

        <form
          id="invoice-form"
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                      Invoice profile
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      Invoice overview
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Describe the invoice and link it to source documents.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Invoice Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      name="invoiceTitle"
                      value={formData.invoiceTitle}
                      onChange={handleChange}
                      placeholder="Office Furniture Purchase"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Purchase Order Number
                      </label>
                      <input
                        name="purchaseOrderNumber"
                        value={formData.purchaseOrderNumber}
                        onChange={handleChange}
                        placeholder="PO-10025"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Contract Number
                      </label>
                      <input
                        name="contractNumber"
                        value={formData.contractNumber}
                        onChange={handleChange}
                        placeholder="CN-78521"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Goods Receipt Number
                    </label>
                    <input
                      name="goodsReceiptNumber"
                      value={formData.goodsReceiptNumber}
                      onChange={handleChange}
                      placeholder="GRN-4587"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                    Invoice details
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    Dates and currency
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Set the invoice reference, accounting currency, and key dates.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Invoice Number
                    </label>
                    <input
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleChange}
                      placeholder="INV-2026-001"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Invoice Date <span className="text-red-500">*</span>
                    </label>
                    <input required type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input required type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Delivery Date
                    </label>
                    <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                  </div>
                </div>
              </section>
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                  Notes & remarks
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  Invoice description
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add the context your approvers need to review this invoice.
                </p>
              </div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea required rows={5} name="description" value={formData.description} onChange={handleChange} placeholder="Describe the purpose of this invoice..." className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                    Invoice items
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    Line Items
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Add each item and its amount. Line totals and the invoice
                    subtotal update automatically.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addLineItem}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <Plus size={18} />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {formData.lineItems.map((item, index) => {
                  const lineTotal = calculateLineTotal(item);
                  const lineTax = calculateLineTax(item);
                  const itemTotal = calculateItemTotal(item);

                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition duration-200 hover:border-blue-200 hover:bg-blue-50/30 sm:p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-semibold text-slate-800">
                          Item {index + 1}
                        </h4>

                        {formData.lineItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLineItem(index)}
                            aria-label={`Remove item ${index + 1}`}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-100"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Item Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            value={item.itemCode}
                            onChange={(e) =>
                              handleLineItemChange(
                                index,
                                "itemCode",
                                e.target.value,
                              )
                            }
                            placeholder="ITEM-001"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Item Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            value={item.itemName}
                            onChange={(e) =>
                              handleLineItemChange(
                                index,
                                "itemName",
                                e.target.value,
                              )
                            }
                            placeholder="Office Chair"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                          />
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Quantity <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={item.quantity}
                            onChange={(e) =>
                              handleLineItemChange(
                                index,
                                "quantity",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Unit <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            value={item.unitOfMeasure}
                            onChange={(e) =>
                              handleLineItemChange(
                                index,
                                "unitOfMeasure",
                                e.target.value,
                              )
                            }
                            placeholder="EA"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            Unit Price <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) =>
                              handleLineItemChange(
                                index,
                                "unitPrice",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-slate-700">
                            GST Rate (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.taxRate}
                            onChange={(e) =>
                              handleLineItemChange(
                                index,
                                "taxRate",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                          />
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <span className="mb-2 block text-sm font-medium text-slate-700">
                            Line Subtotal
                          </span>
                          <output className="flex w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800">
                            {currencyFormatter.format(lineTotal)}
                          </output>
                        </div>

                        <div>
                          <span className="mb-2 block text-sm font-medium text-slate-700">
                            GST Amount
                          </span>
                          <output className="flex w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-800">
                            {currencyFormatter.format(lineTax)}
                          </output>
                        </div>

                        <div>
                          <span className="mb-2 block text-sm font-medium text-slate-700">
                            Item Total (incl. GST)
                          </span>
                          <output className="flex w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700">
                            {currencyFormatter.format(itemTotal)}
                          </output>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Item Description
                        </label>
                        <input
                          value={item.description}
                          onChange={(e) =>
                            handleLineItemChange(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Optional details about this item"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="ml-auto grid w-full max-w-xl gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">Summary</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">Invoice total</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Discount Amount
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="discountAmount"
                      value={formData.discountAmount}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Shipping Charges
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="shippingCharges"
                      value={formData.shippingCharges}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Handling Charges
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="handlingCharges"
                      value={formData.handlingCharges}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-slate-50 p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{currencyFormatter.format(subtotal)}</span>
                  </div>

                  <div className="mb-3 flex items-center justify-between text-slate-600">
                    <span>Discount</span>
                    <span>- {currencyFormatter.format(discountAmount)}</span>
                  </div>

                  <div className="mb-3 flex items-center justify-between text-slate-600">
                    <span>GST (line items)</span>
                    <span>{currencyFormatter.format(taxAmount)}</span>
                  </div>

                  <div className="mb-3 flex items-center justify-between text-slate-600">
                    <span>Shipping</span>
                    <span>{currencyFormatter.format(shippingCharges)}</span>
                  </div>

                  <div className="mb-4 flex items-center justify-between text-slate-600">
                    <span>Handling</span>
                    <span>{currencyFormatter.format(handlingCharges)}</span>
                  </div>

                  <div className="border-t border-blue-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-slate-800">
                        Grand Total
                      </span>
                      <span className="text-3xl font-bold tracking-tight text-blue-700">
                        {currencyFormatter.format(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="sticky bottom-0 flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-white px-5 py-4 shadow-[0_-2px_10px_rgba(15,23,42,0.06)] sm:px-8 sm:py-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:px-6"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="invoice-form"
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow focus:outline-none focus:ring-4 focus:ring-blue-100 sm:px-6"
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
