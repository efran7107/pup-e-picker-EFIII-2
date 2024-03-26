import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, DogFilter } from "../../types";
import { Requests } from "../../api";

type UpdateSwitch = "like" | "dislike" | "delete";

type TDogProvider = {
  dogs: Dog[];
  dogsFiltered: Dog[];
  isLoading: boolean;
  updateDog: (update: UpdateSwitch, dogId: number) => void;
  filterDogs: (filter: DogFilter, dogs: Dog[]) => void;
  addDogs: (newDog: Dog) => void;
  createDog: boolean;
};

const DogContext = createContext<TDogProvider>({} as TDogProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dogsFiltered, setDogFilterd] = useState<Dog[]>([]);
  const [createDog, setCreateDog] = useState(false);
  const [filter, setFilter] = useState<DogFilter>("all");

  const refetch = () =>
    Requests.getAllDogs().then((dogs) => {
      setDogs(dogs);
      setDogFilterd(dogs);
    });

  useEffect(() => {
    setIsLoading(true);
    refetch().then(() => setIsLoading(false));
  }, []);

  const filterDogs = (filter: DogFilter, dogs: Dog[]) => {
    setDogs(dogs);
    switch (filter) {
      case "liked":
        setDogFilterd(dogs.filter((dog) => dog.isFavorite === true));
        setCreateDog(false);
        setFilter(filter);
        break;
      case "disliked":
        setDogFilterd(dogs.filter((dog) => dog.isFavorite === false));
        setCreateDog(false);
        setFilter(filter);
        break;
      case "create":
        setDogFilterd([]);
        setCreateDog(true);
        setFilter(filter);
        break;
      case "all":
        setDogFilterd(dogs);
        setCreateDog(false);
        setFilter(filter);
        break;
    }
  };

  const updateDog = (update: UpdateSwitch, dogId: number) => {
    if (update !== "delete") {
      filterDogs(
        filter,
        dogs.map((dog) =>
          dog.id === dogId
            ? { ...dog, isFavorite: update === "like" ? true : false }
            : dog
        )
      );
      Requests.patchFavoriteForDog(
        dogId,
        update === "like" ? true : false
      ).then((res) => {
        if (!res.ok) {
          setDogs(dogs);
        } else return;
      });
    } else {
      filterDogs(
        filter,
        dogs.filter((dog) => dog.id !== dogId)
      );
      Requests.deleteDogRequest(dogId).then((res) => {
        if (!res.ok) {
          setDogs(dogs);
        }
      });
    }
  };

  const addDogs = (newDog: Dog) => {
    dogs.push(newDog);
    filterDogs("all", dogs);
    Requests.postDog(newDog).then((res) => {
      if (!res.ok) {
        dogs.pop();
        setDogs(dogs);
      } else return;
    });
  };

  return (
    <DogContext.Provider
      value={{
        dogs,
        dogsFiltered,
        isLoading,
        updateDog,
        filterDogs,
        addDogs,
        createDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export const useDogs = () => useContext(DogContext);
