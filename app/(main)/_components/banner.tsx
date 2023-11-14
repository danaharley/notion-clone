"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner: React.FC<BannerProps> = ({ documentId }) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId }).then(() => {
      router.push("/documents");
    });

    toast.promise(promise, {
      loading: "Deleting note..",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note..",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>This page is in the Trash</p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRestore}
        className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
