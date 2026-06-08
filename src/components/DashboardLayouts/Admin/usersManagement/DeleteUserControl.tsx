import { Trash2 } from "lucide-react";

const DeleteUserControl = () => {
  return (
    <div>
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors duration-200">
        <Trash2 className="w-3.5 h-3.5" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default DeleteUserControl;