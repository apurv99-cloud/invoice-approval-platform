import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText,
  confirmColor = "bg-red-500 hover:bg-red-600",
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="flex flex-col items-center px-8 pt-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
            <AlertTriangle size={34} className="text-red-400" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">{title}</h2>

          <p className="mt-3 text-center leading-relaxed text-slate-400">
            {message}
          </p>
        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end gap-4 border-t border-slate-800 px-8 py-6">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`rounded-xl px-6 py-3 font-semibold text-white transition ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
