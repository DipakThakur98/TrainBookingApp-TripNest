import React from "react";
// import FromToCard from "../trains/FromToCard";
import TrainList from "../trains/TrainList";

export default function Train() {
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex gap-6">
        {/* Left: Booking Form */}
        <div className="">
          {/* <FromToCard /> */}
          <TrainList />
        </div>
      </div>
    </div>
  );
}
