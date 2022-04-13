import React from "react";

// Importing Sections of the Website
import Home from "./components/Home";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
// import LogoCloud from "./components/LogoCloud"
import FindUs from "./components/FindUs";
import Head from "next/head";

const Views = () => {
  return (
    <>
      <Head>
        <title>Vicious Streak Salon</title>
      </Head>
      <Home />
      <Services />
      <Testimonials />
      {/* <LogoCloud /> */}
      <FindUs />
    </>
  );
};

export default Views;
