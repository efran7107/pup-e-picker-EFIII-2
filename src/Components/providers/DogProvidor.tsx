import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, DogTab } from "../../types";
import { Requests } from "../../api";
import toast from "react-hot-toast";

type UpdateSwitch = "like" | "dislike";

type TDogProvider = {
  dogs: Dog[];
  isLoading: boolean;
  dogTab: DogTab;
  updateTab: (filter: DogTab) => void;
  updateDog: (update: UpdateSwitch, dogId: number) => void;
  addDog: (newDog: Omit<Dog, "id">) => void;
  deleteDog: (dogId: number) => void;
};

const DogContext = createContext<TDogProvider>({} as TDogProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dogTab, setDogTab] = useState<DogTab>("all");

  const updateTab = (tab: DogTab) => {
    if (tab !== dogTab) setDogTab(tab);
    else setDogTab("all");
  };

  const refetch = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((dogs) => {
        setDogs(dogs);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetch();
  }, []);

  const updateDog = (update: UpdateSwitch, dogId: number) => {
    setDogs(
      dogs.map((dog) =>
        dog.id === dogId
          ? { ...dog, isFavorite: update === "like" ? true : false }
          : dog
      )
    );
    Requests.patchFavoriteForDog(dogId, update === "like" ? true : false)
      .then((res) => {
        setIsLoading(true);
        if (!res.ok) {
          setDogs(dogs);

          setIsLoading(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addDog = (newDog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(newDog)
      .then((res) => {
        if (!res.ok) {
          setDogs(dogs);
          toast("could not add dog, dog has been removed");
        }
      })
      .finally(() => {
        setIsLoading(false);
        toast("Dog Created");
        refetch();
      });
  };

  const deleteDog = (dogId: number) => {
    setDogs(dogs.filter((dog) => dog.id !== dogId));
    setIsLoading(true);
    Requests.deleteDogRequest(dogId)
      .then((res) => {
        if (!res.ok) {
          setDogs(dogs);
          setIsLoading(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <DogContext.Provider
      value={{
        dogs,
        isLoading,
        dogTab,
        updateTab,
        updateDog,
        addDog,
        deleteDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export const useDogs = () => useContext(DogContext);
