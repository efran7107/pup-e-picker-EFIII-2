import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "./providers/DogProvidor";
import { Dog } from "../types";

export const CreateDogForm = () =>
  // no props allowed
  {
    const { dogTab, isLoading, addDog } = useDogs();

    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const defaultDog = {
      name: "",
      image: selectedImage,
      description: "",
      isFavorite: false,
    };
    const [dog, setDog] = useState<Omit<Dog, "id">>(defaultDog);

    return (
      <>
        {dogTab === "create" && (
          <form
            action=""
            id="create-dog-form"
            onSubmit={(e) => {
              e.preventDefault();

              setDog(defaultDog);
              addDog(dog);
            }}
          >
            <h4>Create a New Dog</h4>
            <label htmlFor="name">Dog Name</label>
            <input
              type="text"
              onChange={(e) => {
                setDog({ ...dog, name: e.target.value });
              }}
              disabled={isLoading}
              value={dog.name}
            />
            <label htmlFor="description">Dog Description</label>
            <textarea
              name=""
              id=""
              cols={80}
              rows={10}
              onChange={(e) => {
                setDog({ ...dog, description: e.target.value });
              }}
              disabled={isLoading}
              value={dog.description}
            ></textarea>
            <label htmlFor="picture">Select an Image</label>
            <select
              id=""
              onChange={(e) => {
                setSelectedImage(e.target.value);
                setDog({ ...dog, image: e.target.value });
              }}
              value={selectedImage}
              disabled={isLoading}
            >
              {Object.entries(dogPictures).map(([label, pictureValue]) => {
                return (
                  <option value={pictureValue} key={pictureValue}>
                    {label}
                  </option>
                );
              })}
            </select>
            <input type="submit" value="submit" disabled={isLoading} />
          </form>
        )}
      </>
    );
  };
