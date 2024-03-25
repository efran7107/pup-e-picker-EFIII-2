import { Dog } from "./types";

const baseUrl = "http://localhost:3000";

const getAllDogs = (): Promise<Dog[]> =>
  fetch(`${baseUrl}/dogs`).then((dogs) => dogs.json());

const postDog = () => {
  // fill out method
};
const deleteDogRequest = (dogId: number) =>
  fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

const patchFavoriteForDog = (
  dogId: number,
  isFav: boolean
): Promise<Response> =>
  fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isFavorite: isFav }),
  });

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
