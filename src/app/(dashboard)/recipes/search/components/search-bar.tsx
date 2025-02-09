import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { RecipeSearchValues } from "@/schemas/recipeSearch";
import { Search } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type SearchBarProps = {
  form: UseFormReturn<RecipeSearchValues>;
};

export const SearchBar = ({ form }: SearchBarProps) => {
  return (
    <FormField
      control={form.control}
      name="search"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2 border-b border-black h-10 ">
            <Search className="w-5 h-5 text-black shrink-0" />
            <FormControl>
              <input
                placeholder="Search for a recipe"
                className="w-full h-full ring-0 outline-none bg-transparent"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  form.setValue("search", e.target.value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
};
