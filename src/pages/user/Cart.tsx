import React from "react";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";
import Cart from "src/components/user/cart";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Cart />
      <Footer />
    </div>
  );
};

export default Home;
