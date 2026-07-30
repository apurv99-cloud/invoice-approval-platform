import { useEffect, useState } from "react";
import { Plus, FileText, Search } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import invoiceService from "../../Services/invoiceService";
import InvoiceTable from "../../Components/invoice/InvoiceTable";
import InvoiceFormModal from "../../Components/invoice/InvoiceFormModal";

const MyInvoices = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoiceService.getOrganizationInvoices();
      setInvoices(response || []);
    } catch (error) {
      toast.error(error?.message || "Failed to load invoices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleCreateOrUpdateInvoice = async (formData) => {
    try {
      if (selectedInvoice) {
        await invoiceService.updateInvoice(selectedInvoice.invoiceId, formData);
        toast.success("Invoice updated successfully.");
      } else {
        await invoiceService.createInvoice(formData);
        toast.success("Invoice created successfully.");
      }

      setOpenModal(false);
      setSelectedInvoice(null);
      fetchInvoices();
    } catch (error) {
      toast.error(error?.message || "Failed to save invoice.");
    }
  };

  const handleSubmitInvoice = async (invoiceId) => {
    try {
      await invoiceService.submitInvoice(invoiceId);
      toast.success("Invoice submitted successfully.");
      fetchInvoices();
    } catch (error) {
      toast.error(error?.message || "Failed to submit invoice.");
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const query = search.toLowerCase();
    return (
      invoice.invoiceNumber?.toLowerCase().includes(query) ||
      invoice.vendorName?.toLowerCase().includes(query) ||
      invoice.status?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Invoices</h1>
          <p className="mt-1 text-slate-500">Create, review, and submit invoices for approval.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices"
              className="w-full bg-transparent outline-none"
            />
          </div>

          <button
            onClick={() => navigate("/vendor/invoices/create")}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Invoice
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
            <FileText size={24} className="text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Invoice Queue</h2>
            <p className="text-sm text-slate-500">Manage your invoices from draft to approval.</p>
          </div>
        </div>
      </div>

      <InvoiceTable
        invoices={filteredInvoices}
        loading={loading}
        onEdit={(invoice) => {
          setSelectedInvoice(invoice);
          setOpenModal(true);
        }}
        onSubmit={handleSubmitInvoice}
      />

      <InvoiceFormModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedInvoice(null);
        }}
        onSubmit={handleCreateOrUpdateInvoice}
        initialData={selectedInvoice}
      />
    </div>
  );
};

export default MyInvoices;
