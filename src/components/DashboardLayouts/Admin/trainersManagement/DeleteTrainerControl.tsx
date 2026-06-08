import { Trash2 } from "lucide-react";

const DeleteTrainerControl = () => {
  return (
    <div>
      <button className="inline-flex items-center gap-1 px-2 py-1 text-[11px] lg:text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors duration-200 h-7 shrink-0">
        <Trash2 className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default DeleteTrainerControl;