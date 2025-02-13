"use client";

// import { SearchBar } from "./components/search-bar";
// import NutrientFilters from "./components/nutrient-filters";
// import { Form } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { recipeSearchSchema, RecipeSearchValues } from "@/schemas/recipeSearch";
import { useState } from "react";
// import SearchSubmit from "./components/search-submit";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

const SearchForm = () => {
  // const [showDialog, setShowDialog] = useState(false);
  const [ingredient, setIngredient] = useState<string>("");
  const [list, setList] = useState<string[]>([]);
  const router = useRouter();

  // const form = useForm<RecipeSearchValues>({
  //   resolver: zodResolver(recipeSearchSchema),
  //   defaultValues: {
  //     search: "",
  //     caloriesMin: 0,
  //     caloriesMax: 0,
  //     proteinMin: 0,
  //     proteinMax: 0,
  //     fatMin: 0,
  //     fatMax: 0,
  //     carbohydratesMin: 0,
  //     carbohydratesMax: 0,
  //   },
  // });

  // const onSubmit = (values: RecipeSearchValues) => {
  //   if (values.search === "") {
  //     // setShowDialog(true);
  //     return;
  //   }
  //   handleSearch(values);
  // };

  const addIngredient = (ingredient: string) => {
    if (ingredient === "") return;
    setList([...list, ingredient]);
    setIngredient("");
    console.log(list);
  };

  const handleSearch = (list: string[]) => {
    const params = new URLSearchParams();

    if (list.length > 0) {
      params.set("includeIngredients", list.join(","));
    }

    // Object.entries(values).forEach(([key, value]) => {
    //   if (value !== undefined && value !== "" && value !== 0) {
    //     params.set(key, value.toString());
    //   }
    // });

    router.push(`/recipes/results?${params.toString()}`);
    // setShowDialog(false);
  };

  return (
    <main className="flex-1 pt-8 space-y-4">
      <header className="px-4">
        <h1 className="text-4xl font-bold">Recipes</h1>
      </header>

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4"> */}
      {/* <SearchBar form={form} /> */}

      {/* <NutrientFilters form={form} /> */}

      <div className="flex items-center gap-2 border-b border-black h-10 mx-4 ">
        <input
          placeholder="Add an ingredient"
          className="w-full h-full ring-0 outline-none bg-transparent"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button onClick={() => addIngredient(ingredient)}>
          <Plus className="w-5 h-5 text-black" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mx-4">
        {list.map((item, index) => (
          <span
            key={index}
            className="bg-gray-200 pr-2  py-2 text-center rounded-md flex items-center gap-2 group text-sm pl-6"
          >
            {item}
            <X
              className="w-4 h-4 text-red-500 cursor-pointer opacity-0 group-hover:opacity-100"
              onClick={() => {
                const newList = list.filter((_, i) => i !== index);
                setList(newList);
              }}
            />
          </span>
        ))}
      </div>

      <div className="flex justify-center items-center fixed bottom-20 w-full inset-x-0 px-4">
        <Button
          onClick={() => handleSearch(list)}
          className="w-full text-lg py-3 h-auto"
          size="lg"
          type="submit"
        >
          Search For Recipes
        </Button>
      </div>
      {/* </form>
      </Form> */}

      {/* <SearchSubmit
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        form={form}
        handleSearch={handleSearch}
      /> */}
    </main>
  );
};

export default SearchForm;
