"use client";

// import { SearchBar } from "./components/search-bar";
// import NutrientFilters from "./components/nutrient-filters";
// import { Form } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { recipeSearchSchema, RecipeSearchValues } from "@/schemas/recipeSearch";
import { useState } from "react";
import SearchSubmit from "./components/search-submit";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, SearchIcon, X } from "lucide-react";

const SearchForm = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [recipe, setRecipe] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const router = useRouter();

  const addIngredient = (ingredient: string) => {
    if (ingredient === "") return;
    setList([...list, ingredient]);
    setShowDialog(false);
    setIngredient("");
    console.log(list);
  };

  const handleSearch = async (list: string[]) => {
    const params = new URLSearchParams();

    if (list.length === 0 && recipe === "") {
      setShowDialog(true);
      return;
    }

    if (recipe !== "") {
      params.set("query", recipe);
    }

    if (list.length > 0) {
      params.set("includeIngredients", list.join(","));
    }
    router.push(`/recipes/results?${params.toString()}`);
  };

  return (
    <section className=" pt-8 space-y-4 h-full flex flex-col">
      <header className="px-4 pb-2 border-b border-black/20 shadow-lg">
        <h1 className="text-4xl font-bold">Recipes</h1>
      </header>
      <div className=" flex flex-col pt-32 p-4 flex-1 ">
        <div className="space-y-4">
          <h2 className="text-2xl ">Search for a recipe by name</h2>
          <div className="border-b border-black flex gap-2">
            <SearchIcon className="w-6 h-6 text-black" />
            <input
              placeholder="Enter recipe name"
              className="w-full ring-0 outline-none text-xl bg-transparent"
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 mt-32">
          <h2 className="text-2xl mt-8">Add ingredients to exclude</h2>
          <div className=" flex  gap-2 border-b border-black">
            <input
              placeholder="Add an ingredient"
              className="w-full ring-0 outline-none text-xl bg-transparent"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addIngredient(ingredient);
                }
              }}
            />
            <button onClick={() => addIngredient(ingredient)}>
              <Plus className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mx-4">
        {list.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              const newList = list.filter((_, i) => i !== index);
              setList(newList);
            }}
            className="bg-gray-200 pr-2 text-md py-2 text-center group rounded-md flex items-center gap-2 group pl-6 hover:bg-gray-300 transition-colors">
            {item}
            <X className="w-4 h-4 text-red-500 cursor-pointer opacity-0 group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center fixed bottom-20 w-full inset-x-0 px-4">
        <Button
          onClick={() => handleSearch(list)}
          className="w-full text-lg py-3 h-auto"
          size="lg"
          type="submit">
          Search For Recipes
        </Button>
      </div>
      {/* </form>
      </Form> */}

      <SearchSubmit
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        // form={form}
        // handleSearch={handleSearch}
        router={router}
      />
    </section>
  );
};

export default SearchForm;
