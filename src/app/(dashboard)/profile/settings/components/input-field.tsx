import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";
import { settingsConfig } from "./config";
import { Checkbox } from "@/components/ui/checkbox";

type InputFieldProps = {
  type: string;
  field: ControllerRenderProps<
    {
      [x: string]: string | number | undefined;
    },
    string
  >;
  fieldId: string;
};

const InputField = ({ type, field, fieldId }: InputFieldProps) => {
  const setting = settingsConfig
    .flatMap((section) => section.items)
    .find((item) => item.id === fieldId);

  switch (type) {
    case "number":
      return (
        <Input
          type="number"
          {...field}
          onChange={(e) =>
            field.onChange(e.target.value ? Number(e.target.value) : "")
          }
          placeholder={setting?.placeholder}
        />
      );

    case "select":
      return (
        <Select {...field} value={field.value?.toString()}>
          <SelectTrigger>
            <SelectValue
              placeholder={setting?.placeholder || `Select ${fieldId}`}
            />
          </SelectTrigger>
          <SelectContent>
            {setting?.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "multiselect":
      const checkboxValues = (field.value || []) as string[];
      const isNoneSelected = checkboxValues.includes("NONE");
      return (
        <div className="space-y-2">
          {setting?.options?.map(({ value, label }) => {
            const isDisabled =
              (isNoneSelected && value !== "NONE") ||
              (!isNoneSelected &&
                value === "NONE" &&
                checkboxValues.length > 0);

            return (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  checked={checkboxValues.includes(value)}
                  disabled={isDisabled}
                  onCheckedChange={(checked) => {
                    if (value === "NONE") {
                      field.onChange(checked ? ["NONE"] : []);
                    } else {
                      const newValues = checked
                        ? [...checkboxValues.filter((v) => v !== "NONE"), value]
                        : checkboxValues.filter((v) => v !== value);
                      field.onChange(newValues);
                    }
                  }}
                />
                <label
                  htmlFor={`${fieldId}-${value}`}
                  className={isDisabled ? "text-gray-400" : ""}
                >
                  {label}
                </label>
              </div>
            );
          })}
        </div>
      );

    default:
      return (
        <Input type={type} {...field} placeholder={setting?.placeholder} />
      );
  }
};

export default InputField;
