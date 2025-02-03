import { SearchBar } from "./components/search-bar";
import NutrientFilters from "./components/nutrient-filters";

const RecipePage = () => {
  return (
    <main className="flex-1 px-4 pt-8 space-y-4">
      <header>
        <h1 className="text-4xl font-bold">Recipes</h1>
      </header>

      <SearchBar />

      <NutrientFilters />
    </main>
  );
};

export default RecipePage;
