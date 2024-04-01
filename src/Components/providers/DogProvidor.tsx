import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { Dog, DogFilter } from '../../types';
import { Requests } from '../../api';

type UpdateSwitch = 'like' | 'dislike';

type TDogProvider = {
	dogs: Dog[];
	isLoading: boolean;
	updateFilter: (filter: DogFilter) => void;
	updateDog: (update: UpdateSwitch, dogId: number) => void;
	addDog: (newDog: Dog) => void;
	deleteDog: (dogId: number) => void;
	dogFilter: DogFilter;
};

const DogContext = createContext<TDogProvider>({} as TDogProvider);

export const DogProvider = ({ children }: { children: ReactNode }) => {
	const [dogs, setDogs] = useState<Dog[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dogFilter, setDogFilter] = useState<DogFilter>('all');

	const updateFilter = (filter: DogFilter) => {
		if (filter !== dogFilter) setDogFilter(filter);
		else setDogFilter('all');
	};

	const refetch = () =>
		Requests.getAllDogs().then((dogs) => {
			setIsLoading(true);
			setDogs(dogs);
		});

	useEffect(() => {
		refetch().finally(() => setIsLoading(false));
	}, []);

	const updateDog = (update: UpdateSwitch, dogId: number) => {
		setDogs(
			dogs.map((dog) =>
				dog.id === dogId
					? { ...dog, isFavorite: update === 'like' ? true : false }
					: dog
			)
		);
		Requests.patchFavoriteForDog(dogId, update === 'like' ? true : false)
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
				updateFilter,
				updateDog,
				addDog,
				deleteDog,
				dogFilter
			}}>
			{children}
		</DogContext.Provider>
	);
};

export const useDogs = () => useContext(DogContext);
