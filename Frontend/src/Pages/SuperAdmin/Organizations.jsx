import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import organizationService from "../../Services/organizationService";

import OrganizationTable from "../../Components/organization/OrganizationTable";
import OrganizationFormModal from "../../Components/organization/OrganizationFormModal";
import ConfirmationModal from "../../Components/Common/ConfirmationModal";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const [confirmation, setConfirmation] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    confirmButtonColor: "bg-red-600 hover:bg-red-700",
    action: null,
  });
  /**
   * Fetch Organizations
   */
  const fetchOrganizations = async () => {
    try {
      setLoading(true);

      const response = await organizationService.getAllOrganizations();

      setOrganizations(response);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch organizations.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create Organization
   */
  const handleCreateOrganization = async (formData) => {
    try {
      if (selectedOrganization) {
        await organizationService.updateOrganization(
          selectedOrganization.organizationId,
          formData,
        );

        toast.success("Organization updated successfully.");
      } else {
        await organizationService.createOrganization(formData);

        toast.success("Organization created successfully.");
      }

      setOpenModal(false);
      setSelectedOrganization(null);

      fetchOrganizations();
    } catch (error) {
      toast.error(error?.message || "Failed to save organization.");
    }
  };

  /**
   * Send Onboarding Email
   */
  const handleSendOnboarding = async (organizationId) => {
    try {
      await organizationService.sendOnboarding(organizationId);

      toast.success("Onboarding email sent successfully.");

      fetchOrganizations();
    } catch (error) {
      toast.error(error?.message || "Failed to send onboarding email.");
    }
  };

  /**
   * Activate Organization
   */
  const handleActivateOrganization = async (organizationId) => {
    try {
      await organizationService.activateOrganization(organizationId);

      toast.success("Organization activated successfully.");

      fetchOrganizations();
    } catch (error) {
      toast.error(error?.message || "Failed to activate organization.");
    }
  };

  /**
   * Deactivate Organization
   */
  const handleDeactivateOrganization = async (organizationId) => {
    try {
      await organizationService.deactivateOrganization(organizationId);

      toast.success("Organization deactivated successfully.");

      fetchOrganizations();
    } catch (error) {
      toast.error(error?.message || "Failed to deactivate organization.");
    }
  };

  /**
   * Close Confirmation Modal
   */
  const closeConfirmation = () => {
    setConfirmation({
      open: false,
      title: "",
      message: "",
      confirmText: "Confirm",
      confirmButtonColor: "bg-red-600 hover:bg-red-700",
      action: null,
    });
  };

  /**
   * Execute Confirm Action
   */
  const handleConfirmation = async () => {
    if (!confirmation.action) return;

    await confirmation.action();

    closeConfirmation();
  };

  /**
   * Open Activate Confirmation Modal
   */
  const openActivateModal = (organizationId) => {
    setConfirmation({
      open: true,
      title: "Activate Organization",
      message:
        "Are you sure you want to activate this organization? Users of this organization will be able to access the system again.",
      confirmText: "Activate",
      confirmButtonColor: "bg-green-600 hover:bg-green-700",
      action: () => handleActivateOrganization(organizationId),
    });
  };

  /**
   * Open Deactivate Confirmation Modal
   */
  const openDeactivateModal = (organizationId) => {
    setConfirmation({
      open: true,
      title: "Deactivate Organization",
      message:
        "Are you sure you want to deactivate this organization? Users belonging to this organization will no longer be able to access the system.",
      confirmText: "Deactivate",
      confirmButtonColor: "bg-red-600 hover:bg-red-700",
      action: () => handleDeactivateOrganization(organizationId),
    });
  };
  /**
   * Edit Organization
   */
  const handleEditOrganization = (organization) => {
    setSelectedOrganization(organization);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Organizations</h1>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage all organizations from one place.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedOrganization(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Organization
        </button>
      </div>

      {/* Organization Table */}

      <OrganizationTable
        organizations={organizations}
        loading={loading}
        onSendOnboarding={handleSendOnboarding}
        onActivate={openActivateModal}
        onDeactivate={openDeactivateModal}
        onEdit={handleEditOrganization}
      />

      {/* Organization Form Modal */}

      <OrganizationFormModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedOrganization(null);
        }}
        onSubmit={handleCreateOrganization}
        initialData={selectedOrganization}
      />

      {/* Confirmation Modal */}

      <ConfirmationModal
        isOpen={confirmation.open}
        title={confirmation.title}
        message={confirmation.message}
        confirmText={confirmation.confirmText}
        confirmButtonColor={confirmation.confirmButtonColor}
        onCancel={closeConfirmation}
        onConfirm={handleConfirmation}
      />
    </div>
  );
};

export default Organizations;
