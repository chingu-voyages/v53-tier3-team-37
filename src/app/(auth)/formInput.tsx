import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Path } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = LoginFormValues & {
  confirmPassword: string;
};

type FormInputProps<T extends LoginFormValues | RegisterFormValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type: string;
  description: string;
};

const FormInput = <T extends LoginFormValues | RegisterFormValues>({
  form,
  name,
  label,
  placeholder,
  type,
  description,
}: FormInputProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-lg">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              className="py-6 px-4 text-lg"
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
