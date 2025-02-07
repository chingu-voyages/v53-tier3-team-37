"use client";

import { useSearchParams } from "next/navigation";
import { recipeSearchSchema } from "@/schemas/recipeSearch";

const ResultsTest = () => {
  const searchParams = useSearchParams();

  const parseSearchParams = () => {
    const params: Record<string, string | number> = {};

    searchParams.forEach((value, key) => {
      if (key.endsWith("Min") || key.endsWith("Max")) {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          params[key] = numValue;
        }
      } else {
        params[key] = value;
      }
    });

    const result = recipeSearchSchema.safeParse(params);

    if (result.success) {
      return result.data;
    }

    console.error("Search params validation failed:", result.error);
    return null;
  };

  const validatedParams = parseSearchParams();
  console.log("Validated params:", validatedParams);

  return <div>ResultsTest</div>;
};

export default ResultsTest;
