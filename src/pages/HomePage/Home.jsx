import React, { useEffect } from "react";
import homeCoaching from "@/assets/img/homeCoaching.jpg";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import WhatYouGet from "./WhatYouGet";
import OurProvider from "./OurProvider";
import NewsUpdate from "./NewsUpdate";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div
        className="relative w-full min-h-screen bg-cover bg-center flex justify-center md:justify-start items-center"
        style={{ backgroundImage: `url(${homeCoaching})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#33102b] opacity-60"></div>

        {/* Content */}
        <div className="text-white z-10 relative w-[90%] md:w-[60%] md:ml-8 my-8">
          <h1 className="capitalize text-5xl font-bold">
            we help you to upgrade your knowledge effectively
          </h1>
          <p className="mt-2 text-lg text-slate-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt a
            laboriosam nemo, dolorum nihil nam distinctio, itaque vitae unde,
            facere praesentium consectetur provident eaque ducimus.
          </p>
          <Link to="/learning">
            <Button className="mt-4 cursor-pointer">
              Learn More <MoveRight />
            </Button>
          </Link>
        </div>
      </div>
      {/* // calling what do you get component */}
      <WhatYouGet />
      {/* calling our provider component */}
      <OurProvider />
      <div className="mt-20"></div>
      {/* news update */}
      <NewsUpdate />
    </div>
  );
}

export default Home;
