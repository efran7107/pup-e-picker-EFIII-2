import { BaseSyntheticEvent, ReactNode } from "react";
import { useDogs } from "./providers/DogProvidor";
import { DogFilter } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { dogs, filterDogs } = useDogs();

  const setActive = (
    target: EventTarget & HTMLElement,
    isActive: boolean,
    filter: DogFilter
  ) => {
    if (isActive) {
      target.classList.remove("active");
      filterDogs("all", dogs);
    } else {
      if (document.querySelectorAll(".active").length > 0)
        document.querySelectorAll(".active")[0].classList.remove("active");
      target.classList.add("active");
      filterDogs(filter, dogs);
    }
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector`}
            onClick={(e) => {
              setActive(
                e.currentTarget,
                e.currentTarget.classList.contains("active"),
                "liked"
              );
              alert("click favorited");
            }}
          >
            favorited ( {dogs.filter((dogs) => dogs.isFavorite === true).length}{" "}
            )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector`}
            onClick={(e) => {
              setActive(
                e.currentTarget,
                e.currentTarget.classList.contains("active"),
                "disliked"
              );
              alert("click unfavorited");
            }}
          >
            unfavorited ({" "}
            {dogs.filter((dogs) => dogs.isFavorite === false).length} )
          </div>
          <div
            className={`selector`}
            onClick={(e) => {
              setActive(
                e.currentTarget,
                e.currentTarget.classList.contains("active"),
                "create"
              );
              alert("clicked create dog");
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
