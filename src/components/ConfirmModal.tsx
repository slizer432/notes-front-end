const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg flex flex-col gap-4">
        <p className="text-zinc-300 mb-4 text-lg">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-zinc-600 text-zinc-300 font-bold py-2 px-4 rounded hover:bg-zinc-500 transition-colors cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors cursor-pointer"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
