import { Button } from "@/components/ui/button";
import React from "react";
import StandaradBox from "./StandaradBox";

function DashStandards() {
  const stdList = [
    {
      std: "1st",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
    {
      std: "2nd",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
    {
      std: "3rd",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
    {
      std: "4th",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
    {
      std: "5th",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
    {
      std: "6th",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
    {
      std: "7th",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
    {
      std: "8th",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
    {
      std: "9th",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
    {
      std: "10th",
      para: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, inventore pariatur ratione quia in delectus nihil ducimus et quis aperiam.",
    },
  ];

  return (
    <div className="relative top-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {stdList.map((item, index) => (
          <StandaradBox key={index} std={item.std} para={item.para} page={item.std}/>
        ))}
      </div>
    </div>
  );
}

export default DashStandards;
