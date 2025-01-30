"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userBaseSchema } from "@/schemas/authForm";
import { z } from "zod";
import InputField from "./input-field";
import { settingsConfig } from "./config";

type DialogFormProps = {
  fieldId: string;
  title: string;
  currentValue: string | number | undefined;
  onConfirm: (newValue: string | number) => void;
  type: string;
  setStep: (step: "confirm" | "edit") => void;
};

const getFieldSchema = (fieldId: string) => {
  const shape = userBaseSchema.shape;
  return z.object({
    [fieldId]: shape[fieldId as keyof typeof shape],
  });
};

const DialogForm = ({
  fieldId,
  title,
  currentValue,
  onConfirm,
  type,
  setStep,
}: DialogFormProps) => {
  const form = useForm({
    resolver: zodResolver(getFieldSchema(fieldId)),
    defaultValues: {
      [fieldId]: currentValue,
    },
    mode: "onChange",
  });

  const onSubmit = (data: { [x: string]: string | number | undefined }) => {
    const value = data[fieldId];
    if (value !== undefined) {
      onConfirm(value);
      setStep("confirm");
    }
  };

  const formValue = form.watch(fieldId);
  const isValid = form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={fieldId}
          render={({ field }) => (
            <div className="py-4 px-8">
              <FormItem>
                <FormLabel className="text-lg font-semibold capitalize">
                  {title}
                </FormLabel>
                <FormControl>
                  <InputField type={type} field={field} fieldId={fieldId} />
                </FormControl>
                <FormDescription>
                  {
                    settingsConfig
                      .flatMap((section) => section.items)
                      .find((item) => item.id === fieldId)?.placeholder
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <DialogFooter className="flex flex-row w-full justify-center items-center gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-28"
              onClick={() => setStep("confirm")}
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className="w-28"
              disabled={!formValue || !isValid}
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default DialogForm;
