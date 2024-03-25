import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "./providers/DogProvidor";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const { createDog } = useDogs();
    return (
      <>
        {createDog === true && (
          <form
            action=""
            id="create-dog-form"
            onSubmit={(e) => {
              e.preventDefault();
              document
                .querySelectorAll(".active")[0]
                .classList.remove("active");
            }}
          >
            <h4>Create a New Dog</h4>
            <label htmlFor="name">Dog Name</label>
            <input type="text" />
            <label htmlFor="description">Dog Description</label>
            <textarea name="" id="" cols={80} rows={10}></textarea>
            <label htmlFor="picture">Select an Image</label>
            <select
              id=""
              onChange={(e) => {
                setSelectedImage(e.target.value);
              }}
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
