import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { filters } from "../config/filters";
import { RecipeSearchValues } from "@/schemas/recipeSearch";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";

type NutrientFiltersProps = {
  form: UseFormReturn<RecipeSearchValues>;
};

const NutrientFilters = ({ form }: NutrientFiltersProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const updateFilterValues = (name: string, values: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    const safeName = name.replace(/[^a-zA-Z]/g, "");

    params.set(`${safeName}Min`, values[0].toString());
    params.set(`${safeName}Max`, values[1].toString());

    // Need to include pathname in router.push
    router.push(`/recipes?${params.toString()}`);
  };
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Filters</h2>

      {filters.map((filter) => (
        <div key={filter.name} className="space-y-4">
          <FormField
            control={form.control}
            name={
              filter.name
                .toLowerCase()
                .replace(" ", "Min") as keyof RecipeSearchValues
            }
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  {filter.name}
                </FormLabel>
                <FormControl>
                  <Slider
                    value={field.value ? [Number(field.value)] : undefined}
                    onValueCommit={(values) =>
                      updateFilterValues(filter.name, values)
                    }
                    defaultValue={[
                      Number(
                        searchParams.get(
                          `${filter.name.replace(/[^a-zA-Z]/g, "")}Min`
                        )
                      ) || filter.min,
                      Number(
                        searchParams.get(
                          `${filter.name.replace(/[^a-zA-Z]/g, "")}Max`
                        )
                      ) || filter.max,
                    ]}
                    {...filter}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      ))}
    </section>
  );
};

export default NutrientFilters;
