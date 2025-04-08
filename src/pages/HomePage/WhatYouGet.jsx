import { Image } from "lucide-react";
import React from "react";

function WhatYouGet() {
  return (
    <>
      <div className="flex justify-center items-center w-full mt-8 mb-4">
        <h1 className="text-primary text-4xl font-bold capitalize">
          What do you get
        </h1>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 w-[87%] mx-auto mt-8">
        <div className="border shadow-lg rounded-lg p-4 flex flex-col justify-center items-center text-center">
          <Image
            src="/icons/checked.svg"
            alt="img"
            className="w-6 h-6 mb-2.5"
          />
          <h1 className="text-xl mb-1.5 capitalize">high quality courses</h1>
          <p className="text-slate-500 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim aut
            commodi sit accusamus qui necessitatibus ab optio dolor?
          </p>
        </div>
        <div className="border shadow-lg rounded-lg p-4 flex flex-col justify-center items-center text-center">
          <Image
            src="/icons/checked.svg"
            alt="img"
            className="w-6 h-6 mb-2.5"
          />
          <h1 className="text-xl mb-1.5 capitalize">personal mentor</h1>
          <p className="text-slate-500 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim aut
            commodi sit accusamus qui necessitatibus ab optio dolor?
          </p>
        </div>
        <div className="border shadow-lg rounded-lg p-4 flex flex-col justify-center items-center text-center">
          <Image
            src="/icons/checked.svg"
            alt="img"
            className="w-6 h-6 mb-2.5"
          />
          <h1 className="text-xl mb-1.5 capitalize">premium support</h1>
          <p className="text-slate-500 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim aut
            commodi sit accusamus qui necessitatibus ab optio dolor?
          </p>
        </div>
        <div className="border shadow-lg rounded-lg p-4 flex flex-col justify-center items-center text-center">
          <Image
            src="/icons/checked.svg"
            alt="img"
            className="w-6 h-6 mb-2.5"
          />
          <h1 className="text-xl mb-1.5 capitalize">24hours refund</h1>
          <p className="text-slate-500 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim aut
            commodi sit accusamus qui necessitatibus ab optio dolor?
          </p>
        </div>
      </div>
    </>
  );
}

export default WhatYouGet;
