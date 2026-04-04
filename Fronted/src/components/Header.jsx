import React, { useState } from "react";
// import TrainSearchBox from "./TrainSearchBox";
import { FaArrowRight } from "react-icons/fa";
import FromToCard from "../trains/FromToCard";

export default function Header() {
  const [activeTab, setActiveTab] = useState("train");

  return (
    <>
      <section className="min-h-screen grid md:grid-cols-2">

        <div className="flex flex-col justify-start md:justify-center md:px-12 lg:px-20 px-6 
                        space-y-6 bg-gradient-to-r from-white to-blue-400  md:pt-15">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <div className="flex items-center space-x-2 m-10">
              <img
                src="/BGimg/irctc.png"
                alt="IRCTC Logo"
                className="h-20 w-auto object-contain mt-10"
              />
              <img
                src="/BGimg/IndianR_img.png"
                alt="Bharat Logo"
                className="h-20 w-auto object-contain mt-10"
              />
              <div className="flex item-right ">
                
              <img
                src="/BGimg/Azadi_ka.png"
                alt="Bharat Logo"
                className="h-20 w-auto object-contain mt-10 ml-20 "
              />
              </div>
            </div>
            

            Indian Railways <br />

            <span className="text-blue-600">Journey</span>
          </h1>
          <p className="text-green-600 mt-1 font-bold ">
            Safe and Secure
          </p>

          {/* <div className="flex space-x-4 ml-20">
            <button
              onClick={() => setActiveTab("train")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition 
                ${activeTab === "train" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Train
            </button>
            <button
              onClick={() => setActiveTab("flight")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition 
                ${activeTab === "flight" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Flight
            </button>
          </div> */}

          {/* Search Box */}
          <div className="w-full">
            {activeTab === "train" ? (
              <FromToCard />
            ) : (
              <p className="p-4 border rounded-lg text-gray-500">
                Flight search coming soon...
              </p>
            )}
          </div>
         
        </div>
        <div className="flex items-center justify-center bg-blue-400 ">
          <img
            src="/BGimg/VandeBharat.png"
            alt="Train"
            className="object-contain max-h-450 w-350 border-2"
          />
          
        </div>
        
      </section>

    </>
  );
}
