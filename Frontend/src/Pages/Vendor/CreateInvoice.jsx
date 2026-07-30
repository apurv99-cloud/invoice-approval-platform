import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import invoiceService from "../../Services/invoiceService";
import InvoiceFormModal from "../../Components/invoice/InvoiceFormModal";

const CreateInvoice = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await invoiceService.createInvoice(formData);
      toast.success("Invoice created successfully.");
      navigate("/vendor/invoices");
    } catch (error) {
      toast.error(error?.message || "Failed to create invoice.");
    }
  };

  return (
    <div className="min-h-full">
      <InvoiceFormModal
        isOpen={true}
        onClose={() => navigate("/vendor/invoices")}
        onSubmit={handleSubmit}
        initialData={null}
        compact={true}
      />
    </div>
  );
};

export default CreateInvoice;
