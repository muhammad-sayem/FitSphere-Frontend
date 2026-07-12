/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { editMyProfileAction } from "@/actions/myProfile.action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditMyProfileModalProps {
  initialName?: string;
  initialImage?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSaved?: (name: string, image: string) => void;
}

const EditMyProfileModal = ({
  initialName = "",
  initialImage = "",
  isOpen,
  setIsOpen,
  onSaved,
}: EditMyProfileModalProps) => {
  const router = useRouter();
  const [name, setName] = useState<string>(initialName ?? "");
  const [image, setImage] = useState<string>(initialImage ?? "");
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setName(initialName ?? "");
      setImage(initialImage ?? "");
      setServerError(null);
    }
  }, [isOpen, initialName, initialImage]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { name: string; image: string }) => {
      const res = await editMyProfileAction(payload);
      return res;
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const trimmedName = name.trim();
    const trimmedImage = image.trim();

    if (!trimmedName) {
      const msg = "Name is required";
      setServerError(msg);
      toast.error(msg, { position: "top-center" });
      return;
    }

    try {
      const result = (await mutateAsync({
        name: trimmedName,
        image: trimmedImage,
      })) as any;

      if (result && result.success === false) {
        const errorMsg = result.message || "Profile update failed";
        setServerError(errorMsg);
        toast.error(errorMsg, { position: "top-center" });
        return;
      }

      toast.success("Profile updated successfully", { position: "top-center" });

      onSaved?.(trimmedName, trimmedImage);
      router.refresh();
      setIsOpen(false);
    } catch (error: any) {
      const errorMsg = error?.message || "Profile update failed";
      setServerError(errorMsg);
      toast.error(errorMsg, { position: "top-center" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <div className="mb-1">
            <p className="inline-flex rounded-full border border-primary-01/30 bg-primary-01/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary-01">
              My Profile
            </p>
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight text-black">
            Edit profile
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary-01">
            Update your display name and profile image. Both fields are stored as strings.
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-sm text-rose-600 font-medium">
            {serverError}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="edit-my-profile-name"
              className="text-[10px] font-black uppercase tracking-[0.18em] text-secondary-01"
            >
              Name
            </label>
            <Input
              id="edit-my-profile-name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 h-auto text-sm text-black placeholder:text-secondary-01/70 focus-visible:border-primary-01 focus-visible:ring-primary-01/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="edit-my-profile-image"
              className="text-[10px] font-black uppercase tracking-[0.18em] text-secondary-01"
            >
              Image URL
            </label>
            <Input
              id="edit-my-profile-image"
              name="image"
              type="text"
              placeholder="https://example.com/avatar.jpg"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              className="rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 h-auto text-sm text-black placeholder:text-secondary-01/70 focus-visible:border-primary-01 focus-visible:ring-primary-01/30"
            />
            {image.trim() && (
              <div className="pt-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-01 mb-1.5">
                  Preview
                </p>
                <div className="w-16 h-16 rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.trim()}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                    onError={(event) => {
                      (event.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-5">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-neutral-200 px-5 h-auto py-2.5 text-sm font-medium text-secondary-01 hover:bg-neutral-50"
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="default"
              className="bg-primary-01 hover:bg-primary-01/90 text-white font-bold uppercase tracking-widest rounded-xl px-5 h-auto py-2.5 text-sm gap-1.5"
              disabled={isPending}
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMyProfileModal;