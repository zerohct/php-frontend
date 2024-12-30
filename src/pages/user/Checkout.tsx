import React from "react";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import Checkout from "src/components/user/checkout";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Checkout />
      <Footer />
    </div>
  );
};

export default Home;
