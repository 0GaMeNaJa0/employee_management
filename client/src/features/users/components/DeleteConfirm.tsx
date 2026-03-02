import { User } from "../types/type";

interface DeleteConfirmProps {
  user: User;
  onConfirm: (userId : number) => void;
  onCancel: () => void;
}

export function DeleteConfirm({ user, onConfirm, onCancel }: DeleteConfirmProps) {
  return (
    <div className="text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </div>
      <div>
        <p className="text-white font-medium">Remove {user.name}?</p>
        <p className="text-zinc-500 text-sm mt-1">This action cannot be undone.</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-all"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(user.userId)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium transition-all"
        >
          Remove
        </button>
      </div>
    </div>
  );
}