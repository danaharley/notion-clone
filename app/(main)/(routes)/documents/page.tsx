"use client";

import Image from "next/image";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const router = useRouter();

  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note..",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height={300}
        width={300}
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height={300}
        width={300}
        alt="Empty"
        className="hidden dark:block"
      />

      <h2>Welcome to {user?.firstName}&apos;s Notion</h2>
      <Button onClick={onCreate}>
        <PlusCircle className="mr-2 h-4 w-4" /> Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
