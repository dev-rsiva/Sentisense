import React from "react";
import Header from "../components/Header";
import YoutubeTitleGenerator from "../components/titleGenerator/YoutubeTitleGenerator";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
const HomePage = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomePage;
