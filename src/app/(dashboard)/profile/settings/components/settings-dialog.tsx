"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DialogForm from "./dialog-form";

interface SettingsDialogProps {
  title: string;
  type: string;
  currentValue?: string | number;
  children: React.ReactNode;
  onConfirm: (newValue: string | number | string[]) => void;
  fieldId: string;
}

const SettingsDialog = ({
  title,
  type,
  currentValue,
  children,
  fieldId,
  onConfirm,
}: SettingsDialogProps) => {
  const [step, setStep] = useState<"confirm" | "edit">("confirm");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === "confirm" ? `Edit ${title}?` : `Update ${title}`}
          </DialogTitle>
          <DialogDescription>
            {step === "confirm"
              ? `You're about to change your ${title.toLowerCase()}. Do you want to continue?`
              : "Enter your edit below"}
          </DialogDescription>
        </DialogHeader>
        {step === "confirm" ? (
          <DialogFooter className="flex flex-row w-full justify-center items-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-24">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={() => setStep("edit")}
              className="w-24"
            >
              Continue
            </Button>
          </DialogFooter>
        ) : (
          <DialogForm
            type={type}
            fieldId={fieldId}
            currentValue={currentValue}
            onConfirm={onConfirm}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
