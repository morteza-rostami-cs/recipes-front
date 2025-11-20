// src/store/subscribeToRecipes.js
import useRecipesStore from "./recipesStore";

let unsubscribe = null;

export const startRecipeWatcher = () => {
  if (unsubscribe) return;

  unsubscribe = useRecipesStore.subscribe(
    (state) => state, // select whole store
    (current) => {
      console.log("Recipe Store Updated:", current);
    }
  );

  console.log("Recipe watcher started");
};

export const stopRecipeWatcher = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
    console.log("Recipe watcher stopped");
  }
};
