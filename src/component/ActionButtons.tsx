"use client";

interface ActionButtonsProps {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

const base =
    "rounded-lg border px-3 py-1.5 text-xs font-medium transition cursor-pointer";

// Only the buttons whose handler is passed are rendered,
// so every page can pick the actions that make sense for its table.
export default function ActionButtons({
    onView,
    onEdit,
    onDelete,
}: ActionButtonsProps) {
    return (
        <div className="flex items-center gap-2">
            {onView && (
                <button
                    type="button"
                    onClick={onView}
                    className={`${base} border-slate-200 text-slate-600 hover:bg-slate-100`}
                >
                    View
                </button>
            )}
            {onEdit && (
                <button
                    type="button"
                    onClick={onEdit}
                    className={`${base} border-indigo-200 text-indigo-600 hover:bg-indigo-50`}
                >
                    Edit
                </button>
            )}
            {onDelete && (
                <button
                    type="button"
                    onClick={onDelete}
                    className={`${base} border-red-200 text-red-600 hover:bg-red-50`}
                >
                    Delete
                </button>
            )}
        </div>
    );
}
