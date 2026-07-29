import React from "react";
import { X } from "lucide-react";

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "bg-red-600 hover:bg-red-700",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

          <button onClick={onCancel} className="rounded p-1 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="px-6 py-5">
          <p className="text-gray-600 leading-7">{message}</p>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-lg px-4 py-2 text-white ${confirmButtonColor}`}
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
