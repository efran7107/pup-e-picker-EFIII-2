// Right now these dogs are constant, but in reality we should be getting these from our server
import { DogCard } from "./DogCard";
import { useDogs } from "./providers/DogProvidor";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const { dogs, isLoading, updateDog } = useDogs();

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          isLoading={isLoading}
          onTrashIconClick={() => {}}
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
