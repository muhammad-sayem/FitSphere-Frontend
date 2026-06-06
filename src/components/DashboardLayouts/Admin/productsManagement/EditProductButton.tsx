import { Edit } from "lucide-react";
import { IProduct } from "./ProductsManagement";

const EditProductButton = ({ product }: { product: IProduct }) => {
  return (
    <div>
      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary-01 bg-primary-02/40 hover:bg-primary-02/60 rounded-xl transition-colors duration-200">
        <Edit className="w-3.5 h-3.5" />
        <span>Edit</span>
      </button>
    </div>
  );
};

export default EditProductButton;