import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "./providers/DogProvidor";
import { Dog } from "../types";

export const CreateDogForm = () =>
  // no props allowed
  {
    const { dogs, createDog, addDogs } = useDogs();

    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const [dogObj, setDogObj] = useState<Dog>({
      id: 0,
      name: "",
      image: selectedImage,
      description: "",
      isFavorite: false,
    });

    return (
      <>
        {createDog === true && (
          <form
            action=""
            id="create-dog-form"
            onSubmit={(e) => {
              e.preventDefault();
              setDogObj({
                id: 0,
                name: "",
                image: dogPictures.BlueHeeler,
                description: "",
                isFavorite: false,
              });
              document
                .querySelectorAll(".active")[0]
                .classList.remove("active");

              addDogs({ ...dogObj, id: dogs[dogs.length - 1].id + 1 });
            }}
          >
            <h4>Create a New Dog</h4>
            <label htmlFor="name">Dog Name</label>
            <input
              type="text"
              onChange={(e) => {
                setDogObj({ ...dogObj, name: e.target.value });
              }}
            />
            <label htmlFor="description">Dog Description</label>
            <textarea
              name=""
              id=""
              cols={80}
              rows={10}
              onChange={(e) => {
                setDogObj({ ...dogObj, description: e.target.value });
              }}
            ></textarea>
            <label htmlFor="picture">Select an Image</label>
            <select
              id=""
              onChange={(e) => {
                setSelectedImage(e.target.value);
                setDogObj({ ...dogObj, image: e.target.value });
              }}
              value={selectedImage}
            >
              {Object.entries(dogPictures).map(([label, pictureValue]) => {
                return (
                  <option value={pictureValue} key={pictureValue}>
                    {label}
                  </option>
                );
              })}
            </select>
            <input type="submit" value="submit" />
          </form>
        )}
      </>
    );
  };
