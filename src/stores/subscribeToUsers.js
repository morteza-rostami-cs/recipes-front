// src/store/subscribeTouser.js

import useUsersStore from "./usersStore";

let unsubscribe = null;

export const startUserWatcher = () => {
  if (unsubscribe) return;

  unsubscribe = useUsersStore.subscribe(
    (state) => state, // Listen to entire state
    (current, previous) => {
      console.log("Store updated:", { current, previous });

      // Compare specific fields
      if (current.user !== previous.user) {
        console.log("Public user changed!");
      }
    },
    { equalityFn: (a, b) => a === b } // Optional: shallow compare
  );

  console.log("Recipe watcher started");
};

export const stopUserWatcher = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
    console.log("Recipe watcher stopped");
  }
};
