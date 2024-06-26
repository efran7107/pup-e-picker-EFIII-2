import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogProvider } from "./Components/providers/DogProvidor";

export function App() {
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <DogProvider>
        <Section label={"Dogs: "}>
          <Dogs />
          <CreateDogForm />
        </Section>
      </DogProvider>
    </div>
  );
}
