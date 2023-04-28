import React, { useContext } from "react";
import { Context } from "../Store";

const Home = () => {
  const [state] = useContext(Context);
  console.log("HOME PAGE: ", state.user?.name, "    ", state.user?.email);
  return (
    <div>
      <h1>HOME</h1>
      <p>{JSON.stringify(state)}</p>
    </div>
  );
};

export default Home;
