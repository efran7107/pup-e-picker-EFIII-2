import { ReactNode } from "react";
import { useDogs } from "./providers/DogProvidor";
import { DogFilter } from "../types";
import toast from "react-hot-toast";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { dogs, filterDogs, dogFilter } = useDogs();

  const setActive = (filter: DogFilter) => {
    if (dogFilter !== filter) filterDogs(filter);
    else filterDogs("all");
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              !dogFilter ? "" : dogFilter === "liked" ? "active" : ""
            }`}
            onClick={() => {
              setActive("liked");
              toast("click favorited");
            }}
          >
            favorited ( {dogs.filter((dogs) => dogs.isFavorite === true).length}
            )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              !dogFilter ? "" : dogFilter === "disliked" ? "active" : ""
            }`}
            onClick={() => {
              setActive("disliked");
              toast("click unfavorited");
            }}
          >
            unfavorited (
            {dogs.filter((dogs) => dogs.isFavorite === false).length} )
          </div>
          <div
            className={`selector ${
              !dogFilter ? "" : dogFilter === "create" ? "active" : ""
            }`}
            onClick={() => {
              setActive("create");
              toast("click create dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
