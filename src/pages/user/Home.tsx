import React from "react";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import Product from "../../components/user/Home";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Product />
      <Footer />
    </div>
  );
};

export default Home;
