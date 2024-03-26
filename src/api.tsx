import { Dog } from "./types";

const baseUrl = "http://localhost:3000";

const getAllDogs = () => {
  return fetch(`${baseUrl}/dogs`).then((dogs) => dogs.json() as Promise<Dog[]>);
};
const postDog = (newDog: Omit<Dog, "id">) =>
  fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(newDog),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

const deleteDogRequest = (dogId: number) =>
  fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

const patchFavoriteForDog = (dogId: number, isFav: boolean) =>
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
