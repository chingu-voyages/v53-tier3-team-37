import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { RecipeSearchValues } from "@/schemas/recipeSearch";
// import { UseFormReturn } from "react-hook-form";

type SearchSubmitProps = {
  showDialog: boolean;
  setShowDialog: (showDialog: boolean) => void;
  // handleSearch: (list: string[]) => void;
  router: AppRouterInstance;
};

const SearchSubmit = ({
  showDialog,
  setShowDialog,
  router,
}: SearchSubmitProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get random results?</DialogTitle>
          <DialogDescription>
            Would you like to search for recipes using only your nutritional
            preset settings?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              router.push(`/recipes/results`);
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchSubmit;
