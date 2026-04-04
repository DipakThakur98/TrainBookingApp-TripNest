// Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">  
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
}
