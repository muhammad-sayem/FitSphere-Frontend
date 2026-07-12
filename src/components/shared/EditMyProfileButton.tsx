"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditMyProfileModal from "@/components/shared/EditMyProfileModal";

interface EditMyProfileButtonProps {
  initialName?: string;
  initialImage?: string;
  onSaved?: (name: string, image: string) => void;
}

const EditMyProfileButton = ({
  initialName,
  initialImage,
  onSaved,
}: EditMyProfileButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="bg-primary-01 hover:bg-primary-01/90 text-white font-bold uppercase tracking-widest rounded-lg shadow-sm gap-1.5 px-3.5 w-full md:w-auto"
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit Profile
      </Button>

      <EditMyProfileModal
        initialName={initialName}
        initialImage={initialImage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSaved={onSaved}
      />
    </>
  );
};


export default EditMyProfileButton;