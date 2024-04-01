import { Dog, DogTab } from "./types";

export const filteredDogs = (dogs: Dog[], filter: DogTab): Dog[] => {
  if (filter !== "create") {
    switch (filter) {
      case "liked":
        return dogs.filter((dog) => dog.isFavorite === true);
      case "disliked":
        return dogs.filter((dog) => dog.isFavorite === false);
      default:
        return dogs;
    }
  } else return [];
};
