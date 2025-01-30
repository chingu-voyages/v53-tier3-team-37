"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { surveySchema } from "@/schemas/authForm";
import { z } from "zod";
import { questions } from "@/app/(auth)/register/survey/config";

type DialogFormProps = {
  fieldId: string;
  currentValue: string | number | undefined;
  onConfirm: (newValue: string | number) => void;
  type: string;
};

type Question = (typeof questions)[number];

const getFieldSchema = (fieldId: string) => {
  const shape = surveySchema.shape;
  return z.object({
    [fieldId]: shape[fieldId as keyof typeof shape],
  });
};

const DialogForm = ({
  fieldId,
  currentValue,
  onConfirm,
  type,
}: DialogFormProps) => {
  const form = useForm({
    resolver: zodResolver(getFieldSchema(fieldId)),
    defaultValues: {
      [fieldId]: currentValue,
    },
  });

  const question = questions.find((q) => q.id === fieldId) as Question;

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (currentValue !== undefined) onConfirm(currentValue);
        }}
      >
        <FormField
          control={form.control}
          name={fieldId}
          render={({ field }) => (
            <div className="py-4">
              <FormItem>
                <FormLabel>{fieldId}</FormLabel>
                <FormControl>
                  {type === "number" ? (
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : ""
                        )
                      }
                    />
                  ) : type === "select" && question?.inputType === "select" ? (
                    <Select {...field} value={field.value?.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${fieldId}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {question.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input type={type} {...field} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <DialogFooter className="flex flex-row w-full justify-center items-center gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-24">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="w-24"
            disabled={currentValue === undefined}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default DialogForm;
