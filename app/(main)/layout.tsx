"use client";

import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";

import { Spinner } from "@/components/spinner";
import { Navigation } from "./_components/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="flex h-full">
      <Navigation />
      <div className="h-full flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default MainLayout;
