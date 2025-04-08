import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardSlider() {
  const navigate = useNavigate();
  const sliderMenu = [
    {
      name: "overview",
      icon: "/",
      path: "/dashboard/overview",
    },
    {
      name: "admin Profile",
      icon: "/",
      path: "/dashboard/profile",
    },
    {
      name: "standards",
      icon: "/",
      path: "/dashboard/standards",
    },
    {
      name: "contact messages",
      icon: "/",
      path: "/dashboard/contactMessages",
    },
  ];
  return (
    <div>
      <div className="w-full bg-white h-screen border">
        <div className="flex justify-center items-center flex-col gap-y-5 mt-8">
          {sliderMenu.map((item, index) => (
            <Button
              key={index}
              onClick={() => navigate(`${item.path}`)}
              className={`w-[70%] bg-white text-primary capitalize hover:text-white cursor-pointer`}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardSlider;
