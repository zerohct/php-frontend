import React from "react";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import Order from "src/components/user/orderlist";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Order />
      <Footer />
    </div>
  );
};

export default Home;
