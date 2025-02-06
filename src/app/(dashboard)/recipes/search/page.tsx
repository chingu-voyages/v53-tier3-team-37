"use client";

import { SearchBar } from "./components/search-bar";
import NutrientFilters from "./components/nutrient-filters";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { recipeSearchSchema, RecipeSearchValues } from "@/schemas/recipeSearch";
import { useState } from "react";
import SearchSubmit from "./components/search-submit";
import { Button } from "@/components/ui/button";

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

  const onSubmit = (values: RecipeSearchValues) => {
    if (values.search === "") {
      setShowDialog(true);
      return;
    }
    handleSearch(values);
  };

  const handleSearch = (values: RecipeSearchValues) => {
    console.log(values);
    // Your search logic here
    setShowDialog(false);
  };

  return (
    <main className="flex-1 pt-8 space-y-4">
      <header className="px-4">
        <h1 className="text-4xl font-bold">Recipes</h1>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
          <SearchBar form={form} />

          <NutrientFilters form={form} />

          <div className="flex justify-center items-center fixed bottom-20 w-full inset-x-0 px-4">
            <Button
              className="w-full text-lg py-3 h-auto"
              size="lg"
              type="submit"
            >
              Search For Recipes
            </Button>
          </div>
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
