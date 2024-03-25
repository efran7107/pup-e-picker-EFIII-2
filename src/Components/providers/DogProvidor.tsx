import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog } from "../../types";
import { Requests } from "../../api";

type UpdateSwitch = "like" | "dislike" | "delete";

type TDogProvider = {
  dogs: Dog[];
  isLoading: boolean;
  updateDog: (update: UpdateSwitch, dogId: number) => void;
};

const DogContext = createContext<TDogProvider>({} as TDogProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = () => Requests.getAllDogs().then((dogs) => setDogs(dogs));

  useEffect(() => {
    setIsLoading(true);
    refetch().then(() => setIsLoading(false));
  }, []);

  const updateDog = (update: UpdateSwitch, dogId: number) => {
    switch (update) {
      case "like":
        setDogs(
          dogs.map((dog) =>
            dog.id === dogId ? { ...dog, isFavorite: true } : dog
          )
        );
        Requests.patchFavoriteForDog(dogId, true).then((res) => {
          if (!res.ok) {
            setDogs(dogs);
          } else return;
        });
        break;
      case "dislike":
        setDogs(
          dogs.map((dog) =>
            dog.id === dogId ? { ...dog, isFavorite: false } : dog
          )
        );
        Requests.patchFavoriteForDog(dogId, false).then((res) => {
          if (!res.ok) {
            setDogs(dogs);
          } else return;
        });
        break;
      case "delete":
        return;
      default:
        return;
    }
  };

  return (
    <DogContext.Provider
      value={{
        dogs,
        isLoading,
        updateDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export const useDogs = () => useContext(DogContext);
