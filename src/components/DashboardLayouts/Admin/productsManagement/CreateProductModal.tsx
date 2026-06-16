/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { productServices } from "@/services/product.services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface CreateProductModalProps {
  refetch: () => void;
}

const CreateProductModal = ({ refetch }: CreateProductModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await productServices.createProduct(formData as any);
      return res;
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      remainingStock: 0,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("price", String(value.price));
      formData.append("category", value.category);
      formData.append("remainingStock", String(value.remainingStock));

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      try {
        const result = (await mutateAsync(formData)) as any;

        if (!result.success) {
          const errorMsg = result.message || "Product creation failed!";
          setServerError(errorMsg);
          toast.error(errorMsg, { position: "top-center" });
          return;
        }

        toast.success("Product created successfully!", { position: "top-center" });
        form.reset();
        setSelectedFile(null);
        setIsOpen(false);
        refetch();
      } 
      
      catch (error: any) {
        const errorMsg = error?.message || "Product creation failed";
        setServerError(errorMsg);
        toast.error(errorMsg, { position: "top-center" });
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-md font-bold text-primary-01 border border-primary-01 hover:bg-primary-01 hover:text-white hover:cursor-pointer rounded-xl transition-colors duration-200">
          <PlusCircle className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl lg:max-w-4xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <div className="mb-2">
            <p className="inline-flex rounded-full border border-primary-02 bg-primary-02/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-01">
              Product Catalog
            </p>
          </div>
          <DialogTitle className="text-2xl font-semibold tracking-tight text-secondary-01 md:text-3xl">
            Create new product
          </DialogTitle>
          <DialogDescription className="max-w-2xl text-sm leading-6 text-secondary-02">
            Add your product name, description, price, category, stock, and image in a clean minimal layout.
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <div className="mb-2 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-600">
            {serverError}
          </div>
        )}

        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                  Product Name
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="e.g. Premium Rubber Dumbbell"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                  Description <span className="text-secondary-02">(optional)</span>
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Write a detailed description about the product features, material, and specifications."
                  rows={5}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                />
              </div>
            )}
          </form.Field>

          <div className="grid gap-6 md:grid-cols-2">
            <form.Field name="price">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                    Price
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min="0"
                    placeholder="e.g. 1500"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(Number(event.target.value))}
                    className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="category">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                    Category
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30 cursor-pointer appearance-none"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="TRADEMILL">Treadmill</option>
                    <option value="MASSAGER">Massager</option>
                    <option value="DUMMBBELL">Dumbbell</option>
                    <option value="BENCHES">Benches</option>
                    <option value="FLOOR_MAT">Floor Mat</option>
                    <option value="EXERCISE_BIKE">Exercise Bike</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <form.Field name="remainingStock">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                    Remaining Stock
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min="0"
                    placeholder="e.g. 50"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(Number(event.target.value))}
                    className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                  />
                </div>
              )}
            </form.Field>

          <div className="space-y-2">
            <label htmlFor="product-image" className="text-sm font-medium text-secondary-01">
              Product Image
            </label>
            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setSelectedFile(event.target.files[0]);
                }
              }}
              className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-2.5 text-sm text-secondary-01 outline-none transition-colors file:mr-4 file:rounded-xl file:border-0 file:bg-secondary-01 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-secondary-01/90"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-secondary-03 pt-6">
          <DialogClose asChild>
            <button
              type="button"
              className="rounded-2xl border border-secondary-03 px-5 py-3 text-sm font-medium text-secondary-01 transition-colors hover:border-primary-02 hover:bg-primary-02/10"
            >
              Cancel
            </button>
          </DialogClose>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <button
                type="submit"
                className="rounded-2xl bg-primary-01 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-01/90 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;