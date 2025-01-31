import { Input } from "@/components/ui/input";
import React from "react";

const RecipePage = () => {
  return (
    <main className="flex-1 px-4 pt-8 space-y-4">
      <header>
        <h1 className="text-4xl font-bold">Recipes</h1>
      </header>

      <Input placeholder="Search for a recipe" />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Filters</h2>
      </section>
    </main>
  );
};

export default RecipePage;
