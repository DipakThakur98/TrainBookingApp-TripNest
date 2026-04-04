import React from "react";
// import './Home.css';
  import Header from "../components/Header";
import WhyChoose from "../components/WhyChoose";
import Destinations from "../components/Destinations";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
   
      <Header />
      <WhyChoose />
      <Destinations />
      <Footer />
    </>    
  );
}
