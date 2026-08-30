import type { FC } from "react";
import Hero from "./Hero";
import Category from "./Category";
import Info from "./Info";

const Home: FC = () => {
  return (
    <div>
      <Hero />

      <div className="p-5">
        <Category />

        <Info />
      </div>
    </div>
  );
};

export default Home;
