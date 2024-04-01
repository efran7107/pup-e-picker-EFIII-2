// Right now these dogs are constant, but in reality we should be getting these from our server
import { filteredDogs } from "../functions";
import { DogCard } from "./DogCard";
import { useDogs } from "./providers/DogProvidor";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const { dogs, dogTab, isLoading, updateDog, deleteDog } = useDogs();
  const selectedDogs = filteredDogs(dogs, dogTab);
  return (
    <>
      {selectedDogs.map((dog) => (
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
