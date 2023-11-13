"use client";

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent } from "./ui/dialog";
import { AlertDialogHeader } from "./ui/alert-dialog";
import { Label } from "./ui/label";
import { ModeToggle } from "./mode-toggle";

export const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <AlertDialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </AlertDialogHeader>
        <div className="flex flex-col gap-y-1">
          <Label>Appearance</Label>
          <span className="text-[0.8rem] text-muted-foreground">
            Customize how Notion looks on your device
          </span>
        </div>
        <ModeToggle />
      </DialogContent>
    </Dialog>
  );
};
