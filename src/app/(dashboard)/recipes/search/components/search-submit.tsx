import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { RecipeSearchValues } from "@/schemas/recipeSearch";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type SearchSubmitProps = {
  showDialog: boolean;
  setShowDialog: (showDialog: boolean) => void;
  form: UseFormReturn<RecipeSearchValues>;
  handleSearch: (values: RecipeSearchValues) => void;
};

const SearchSubmit = ({
  showDialog,
  setShowDialog,
  form,
  handleSearch,
}: SearchSubmitProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search without query?</DialogTitle>
          <DialogDescription>
            Would you like to search for recipes using only your nutritional
            filters?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(handleSearch)}>
            Search with Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchSubmit;
