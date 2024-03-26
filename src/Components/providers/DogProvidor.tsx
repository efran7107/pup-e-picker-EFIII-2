import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, DogFilter } from "../../types";
import { Requests } from "../../api";
import toast from "react-hot-toast";

type UpdateSwitch = "like" | "dislike";

type TDogProvider = {
  dogs: Dog[];
  isLoading: boolean;
  updateDog: (update: UpdateSwitch, dogId: number) => void;
  addDog: (newDog: Dog) => void;
  deleteDog: (dogId: number) => void;
  filterDogs: (filter: DogFilter) => void;
  createDog: boolean;
  dogFilter: DogFilter;
};

const DogContext = createContext<TDogProvider>({} as TDogProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createDog, setCreateDog] = useState(false);
  const [dogFilter, setDogFilter] = useState<DogFilter>("all");

  const refetch = () =>
    Requests.getAllDogs().then((dogs) => {
      setIsLoading(true);
      setDogs(dogs);
    });

  useEffect(() => {
    refetch().finally(() => setIsLoading(false));
  }, []);

  const filterDogs = (filter: DogFilter) => {
    setDogFilter(filter);
    if (filter !== "create") {
      setCreateDog(false);
    } else {
      setCreateDog(true);
    }
  };

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
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addDog = (newDog: Dog) => {
    setDogs([...dogs, newDog]);
    Requests.postDog(newDog)
      .then((res) => {
        setIsLoading(true);
        if (!res.ok) {
          setDogs(dogs);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteDog = (dogId: number) => {
    setDogs(dogs.filter((dog) => dog.id !== dogId));
    Requests.deleteDogRequest(dogId)
      .then((res) => {
        setIsLoading(true);
        if (!res.ok) {
          setDogs(dogs);
        } else {
          toast("DogCreated");
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
        updateDog,
        addDog,
        deleteDog,
        filterDogs,
        createDog,
        dogFilter,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export const useDogs = () => useContext(DogContext);
