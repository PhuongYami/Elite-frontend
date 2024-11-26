import React from "react";
import Banner from "../components/Banner";
import Introduction from "../components/Introduction";
import Features from "../components/Features";
import CallToAction from "../components/CallToAction";

const Home = () => {
  return (
    <div>
      <Banner />
      <Introduction />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Home;
