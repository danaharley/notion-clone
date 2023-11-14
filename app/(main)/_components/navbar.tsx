import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Title } from "./title";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({
  isCollapsed,
  onResetWidth,
}) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="flex w-full items-center bg-background px-3 py-2">
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2">
      {isCollapsed && (
        <MenuIcon
          role="button"
          className="h-6 w-6 text-muted-foreground"
          onClick={onResetWidth}
        />
      )}
      <div className="flex w-full items-center justify-between">
        <Title initialData={document} />
      </div>
    </nav>
  );
};
