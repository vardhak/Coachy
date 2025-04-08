import React, { useEffect, useState } from "react";
import DashboardSlider from "./components/DashboardSlider";
import { Outlet } from "react-router-dom";
import { SignedIn, useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

function Dashboard() {
  const [adminEmail, setAdminEmail] = useState();
  const [isad, setIsad] = useState(false);
  const { isSignedIn } = useAuth();
  const user = useUser();

  useEffect(() => {
    checkAdmin();
  }, [adminEmail]);
  const checkAdmin = async () => {
    try {
      const response = axios.get("http://localhost:3000/getAdminData");
      console.log((await response).data);
      setAdminEmail((await response).data);
    } catch (e) {
      console.log(e);
    }
    if (adminEmail === user.user?.primaryEmailAddress?.emailAddress) {
      setIsad(true);
    }
  };
  return (
    <>
      (
      <div className="flex h-screen">
        {/* Sidebar - Fixed Position */}
        <div className="hidden md:block w-[20%] h-screen fixed left-0 top-18 border-r  bg-gray-100">
          <DashboardSlider />
        </div>

        {/* Dynamic Content - Scrollable */}
        <div className="w-full md:w-[80%] md:ml-[20%] h-screen  p-5">
          <Outlet />
        </div>
      </div>
      )
    </>
  );
}

export default Dashboard;
