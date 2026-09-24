const ConfirmDialog = ({isOpen,  title = "Confirm deletion",message,onConfirm,onCancel,isSubmitting,}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-gray-900">
                    {title}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    {message}
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-red-400 disabled:opacity-70"
                    >
                        {isSubmitting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;