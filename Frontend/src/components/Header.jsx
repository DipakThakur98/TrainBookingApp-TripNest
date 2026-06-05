import React, { useState } from "react";
import FromToCard from "../trains/FromToCard";
import "./HeaderBackground.css";

export default function Header() {
  const [activeTab, setActiveTab] = useState("train");

  return (
    <>
      <section className="min-h-screen grid md:grid-cols-2 header-bg relative">
        <div className="header-sticker">
          <img src="/BGimg/irctc.png" alt="IRCTC Logo" className="h-16 w-auto object-contain" />
          <img src="/BGimg/IndianR_img.png" alt="Bharat Logo" className="h-16 w-auto object-contain" />
          <img src="/BGimg/Azadi_ka.png" alt="Azadi Logo" className="h-16 w-auto object-contain" />
        </div>

            <div className="flex flex-col justify-start md:justify-center md:px-12 lg:px-20 px-6 space-y-6 md:pt-15">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">

            

            Indian Railways <br />

            <span className="text-blue-600">Journey</span>
          </h1>
          <p className="text-green-600 mt-1 font-bold ">
            Safe and Secure
          </p>


          
          {/* Search Box */}
          <div className="w-full flex justify-start">
            {activeTab === "train" ? (
              <FromToCard />
            ) : (
              <p className="p-4 border rounded-lg text-gray-500">
                Flight search coming soon...
              </p>
            )}
          </div>
         
        </div>


        
      </section>

    </>
  );
}
