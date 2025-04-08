import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function AdminRoute({ children }) {
  const { user, isLoaded } = useUser();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getAdmin");
        const fetchedAdminEmail = response.data.email;

        const userEmail = user?.primaryEmailAddress?.emailAddress;

        setIsAdmin(fetchedAdminEmail === userEmail);
      } catch (err) {
        console.error("Error fetching admin email:", err);
        setIsAdmin(false);
      }
    };

    if (isLoaded) {
      checkAdmin();
    }
  }, [user, isLoaded]);

  if (!isLoaded || isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (isAdmin) {
    return children;
  }

  // Not an admin, redirect to the current location or fallback
  return <Navigate to="/unkonwn" state={{ from: location }} replace />;
}
