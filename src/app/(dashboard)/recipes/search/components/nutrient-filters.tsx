import { Slider } from "@/components/ui/slider";
import { filters } from "../config/filters";
import { RecipeSearchValues } from "@/schemas/recipeSearch";
import { UseFormReturn } from "react-hook-form";
import { FormLabel } from "@/components/ui/form";

type NutrientFiltersProps = {
  form: UseFormReturn<RecipeSearchValues>;
};

const NutrientFilters = ({ form }: NutrientFiltersProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Filters</h2>
      {filters.map((filter) => {
        const minFieldName =
          `${filter.name.toLowerCase()}Min` as keyof RecipeSearchValues;
        const maxFieldName =
          `${filter.name.toLowerCase()}Max` as keyof RecipeSearchValues;

        return (
          <div key={filter.name} className="space-y-4">
            <FormLabel className="text-lg font-semibold">
              {filter.name}
            </FormLabel>
            <Slider
              defaultValue={[filter.min, filter.max]}
              onValueCommit={([min, max]) => {
                form.setValue(minFieldName, min, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                });
                form.setValue(maxFieldName, max, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
              min={filter.min}
              max={filter.max}
              step={filter.step}
              minStepsBetweenThumbs={filter.minStepsBetweenThumbs}
              unit={filter.unit}
            />
          </div>
        );
      })}
    </section>
  );
};

export default NutrientFilters;
