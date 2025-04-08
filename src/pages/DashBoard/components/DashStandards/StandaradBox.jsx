import { Button } from "@/components/ui/button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function StandaradBox({ std, para,page }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="gap-y-4 flex flex-col justify-center items-center border-primary border shadow-lg p-4 rounded-lg">
      <h2 className="text-2xl font-bold">{std}</h2>
      <p className="text-center line-clamp-4">{para}</p>
      <Button
        className={`text-sm cursor-pointer`}
        onClick={() => {
          navigate(`${location.pathname}/${page}`);
        }}
      >
        Managaes
      </Button>
    </div>
  );
}

export default StandaradBox;
