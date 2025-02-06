"use client";

import { SearchBar } from "./components/search-bar";
import NutrientFilters from "./components/nutrient-filters";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { recipeSearchSchema, RecipeSearchValues } from "@/schemas/recipeSearch";
import { useState } from "react";
import SearchSubmit from "./components/search-submit";

const SearchPage = () => {
  const [showDialog, setShowDialog] = useState(false);

  const form = useForm<RecipeSearchValues>({
    resolver: zodResolver(recipeSearchSchema),
    defaultValues: {
      search: "",
      caloriesMin: 0,
      caloriesMax: 0,
      proteinMin: 0,
      proteinMax: 0,
      fatMin: 0,
      fatMax: 0,
      carbohydratesMin: 0,
      carbohydratesMax: 0,
    },
  });

  const handleSearch = (values: RecipeSearchValues) => {
    if (values.search === "") {
    }
    console.log(values);
  };

  return (
    <main className="flex-1 pt-8 space-y-4">
      <header className="px-4">
        <h1 className="text-4xl font-bold">Recipes</h1>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          className="space-y-4 px-4"
        >
          <SearchBar form={form} />

          <NutrientFilters form={form} />
        </form>
      </Form>

      <SearchSubmit
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        form={form}
        handleSearch={handleSearch}
      />
    </main>
  );
};

export default SearchPage;
