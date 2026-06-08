import { SquarePen } from "lucide-react";

const ChangeStatusControl = () => {
  return (
    <div>
      <button className="inline-flex items-center gap-1 px-2 py-1 text-[11px] lg:text-xs font-bold text-primary-01 bg-primary-02/40 hover:bg-primary-02/60 rounded-lg transition-colors duration-200 h-7 shrink-0">
        <SquarePen className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
        <span>Change Status</span>
      </button>
    </div>
  );
};

export default ChangeStatusControl;