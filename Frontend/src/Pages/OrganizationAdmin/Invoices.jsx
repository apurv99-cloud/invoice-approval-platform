import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import InvoiceTable from "../../components/OrganizationAdmin/Invoice/InvoiceTable";
import InvoiceFormModal from "../../components/OrganizationAdmin/Invoice/InvoiceFormModal";

import invoiceService from "../../Services/invoiceService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);

      // 👇 Change according to your service
      const response = await invoiceService.getAllInvoices();

      setInvoices(response.data || response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
        invoice.vendorName?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, statusFilter]);

  const handleCreate = () => {
    setSelectedInvoice(null);
    setShowModal(true);
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;

    try {
      await invoiceService.deleteInvoice(id);
      fetchInvoices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuccess = () => {
    setShowModal(false);
    fetchInvoices();
  };

  const totalInvoices = invoices.length;
  const pending = invoices.filter((i) => i.status === "PENDING").length;
  const approved = invoices.filter((i) => i.status === "APPROVED").length;
  const rejected = invoices.filter((i) => i.status === "REJECTED").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-gray-500">Manage organization invoices.</p>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <StatCard title="Total" value={totalInvoices} />

        <StatCard title="Pending" value={pending} />

        <StatCard title="Approved" value={approved} />

        <StatCard title="Rejected" value={rejected} />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search invoice..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 md:w-80"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border px-4 py-2"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <InvoiceTable
        invoices={filteredInvoices}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {showModal && (
        <InvoiceFormModal
          invoice={selectedInvoice}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="rounded-xl border bg-white p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="mt-2 text-3xl font-bold">{value}</h2>
  </div>
);

export default Invoices;
