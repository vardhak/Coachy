import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import waves from "@/assets/img/waves-white.svg";
import React from "react";

function NewsUpdate() {
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${waves})` }}
        className="flex flex-col justify-center items-center bg-[#303555] w-full text-white min-h-[270px]"
      >
        <h1 className="text-xl capitalize">be the first to see the news</h1>
        <p className="w-[60%] text-center text-slate-300 mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quaerat
          explicabo dolores ratione dicta adipisci quasi. Ab, pariatur?
        </p>
        <div className="flex gap-2 mt-5">
          <Input placeholder="provide us email" />
          <Button className="cursor-pointer">Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default NewsUpdate;
