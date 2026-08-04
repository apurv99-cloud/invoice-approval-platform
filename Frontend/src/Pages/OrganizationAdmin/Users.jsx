import { useEffect, useState } from "react";
import {
  Plus,
  Users as UsersIcon,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import userService from "../../Services/userService";

import StatsGrid from "../../Components/dashboard/StatsGrid";
import UserTable from "../../Components/user/UserTable";
import UserFormModal from "../../Components/user/UserFormModal";
import ConfirmationModal from "../../Components/Common/ConfirmationModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [confirmation, setConfirmation] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    confirmButtonColor: "bg-red-600 hover:bg-red-700",
    action: null,
  });
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await userService.getMyOrganizationUsers();

      setUsers(response || []);
    } catch (error) {
      toast.error(error?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Create / Update User
   */
  const handleCreateOrUpdateUser = async (formData) => {
    try {
      const payload = {
        ...formData,
        active: formData.active ?? false,
        isActive: formData.active ?? false,
        enabled: formData.active ?? false,
      };

      let createdOrUpdatedUser;

      if (selectedUser) {
        createdOrUpdatedUser = await userService.updateUser(
          selectedUser.userId,
          payload,
        );

        toast.success("User updated successfully.");
      } else {
        createdOrUpdatedUser =
          await userService.createOrganizationUser(payload);

        toast.success("User created successfully.");
      }

      setUsers((prev) => {
        if (selectedUser) {
          return prev.map((user) =>
            user.userId === createdOrUpdatedUser?.userId
              ? createdOrUpdatedUser
              : user,
          );
        }

        return createdOrUpdatedUser ? [createdOrUpdatedUser, ...prev] : prev;
      });

      setOpenModal(false);
      setSelectedUser(null);

      fetchUsers();
    } catch (error) {
      toast.error(error?.message || "Failed to save user.");
    }
  };

  /**
   * Activate User
   */
  const handleActivateUser = async (userId) => {
    try {
      await userService.activateUser(userId);

      toast.success("User activated successfully.");

      fetchUsers();
    } catch (error) {
      toast.error(error?.message || "Failed to activate user.");
    }
  };

  /**
   * Deactivate User
   */
  const handleDeactivateUser = async (userId) => {
    try {
      await userService.deactivateUser(userId);

      toast.success("User deactivated successfully.");

      fetchUsers();
    } catch (error) {
      toast.error(error?.message || "Failed to deactivate user.");
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
   * Execute Confirmation Action
   */
  const handleConfirmation = async () => {
    if (!confirmation.action) return;

    await confirmation.action();

    closeConfirmation();
  };

  /**
   * Open Activate Confirmation Modal
   */
  const openActivateModal = (userId) => {
    setConfirmation({
      open: true,
      title: "Activate User",
      message:
        "Are you sure you want to activate this user? They will be able to sign in and access the system again.",
      confirmText: "Activate",
      confirmButtonColor: "bg-green-600 hover:bg-green-700",
      action: () => handleActivateUser(userId),
    });
  };

  /**
   * Open Deactivate Confirmation Modal
   */
  const openDeactivateModal = (userId) => {
    setConfirmation({
      open: true,
      title: "Deactivate User",
      message:
        "Are you sure you want to deactivate this user? They will no longer be able to sign in to the system.",
      confirmText: "Deactivate",
      confirmButtonColor: "bg-red-600 hover:bg-red-700",
      action: () => handleDeactivateUser(userId),
    });
  };
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.active).length;
  const inactiveUsers = users.filter((user) => !user.active).length;
  const adminUsers = users.filter((user) =>
    ["ORG_ADMIN", "SUPER_ADMIN"].includes(user.roleName),
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: UsersIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Inactive Users",
      value: inactiveUsers,
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Admin Users",
      value: adminUsers,
      icon: ShieldCheck,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Users</h1>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Manage team members, roles, and account status.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setOpenModal(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create User
        </button>
      </div>

      <StatsGrid stats={stats} />

      <UserTable
        users={users}
        loading={loading}
        onEdit={handleEditUser}
        onActivate={openActivateModal}
        onDeactivate={openDeactivateModal}
      />

      <UserFormModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedUser(null);
        }}
        onSubmit={handleCreateOrUpdateUser}
        initialData={selectedUser}
      />

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

export default Users;
