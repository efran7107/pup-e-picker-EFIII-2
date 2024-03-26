// Right now these dogs are constant, but in reality we should be getting these from our server
import { DogCard } from "./DogCard";
import { useDogs } from "./providers/DogProvidor";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const { dogs, dogFilter, isLoading, updateDog, deleteDog } = useDogs();
  const showDogs =
    dogFilter !== "create"
      ? dogFilter !== "all"
        ? dogFilter === "liked"
          ? dogs.filter((dog) => dog.isFavorite === true)
          : dogs.filter((dog) => dog.isFavorite === false)
        : dogs
      : [];
  return (
    <>
      {showDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          isLoading={isLoading}
          onTrashIconClick={() => {
            deleteDog(dog.id);
          }}
          onEmptyHeartClick={() => {
            updateDog("like", dog.id);
          }}
          onHeartClick={() => {
            updateDog("dislike", dog.id);
          }}
        />
      ))}
    </>
  );
};
