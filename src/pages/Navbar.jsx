import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignInButton,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import axios from "axios";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      checkAdmin();
    }
  }, [isSignedIn, isLoaded]);

  const checkAdmin = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAdmin`);
      const fetchedAdminEmail = response.data.email;

      const currentUserEmail = user?.primaryEmailAddress?.emailAddress;

      if (fetchedAdminEmail === currentUserEmail) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (e) {
      console.log("Error fetching admin email:", e);
    }
  };

  return (
    <nav className="bg-white p-4 text-black shadow-md z-50 w-full fixed">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-extrabold uppercase text-primary">
          Coachly
        </h1>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul
          className={`z-20 flex-col flex justify-center items-center md:flex md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white p-4  md:p-0 transition-transform ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="py-2 px-4">
            <Link
              onClick={() => setIsOpen(false)}
              to="/"
              className="block hover:text-primary transition ease-in-out"
            >
              Home
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block hover:text-primary transition ease-in-out"
            >
              About
            </Link>
          </li>

          <SignedIn>
            {isAdmin && (
              <li className="py-2 px-4">
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-primary transition ease-in-out"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </SignedIn>

          <li className="py-2 px-4">
            <Link
              to="/learning"
              onClick={() => setIsOpen(false)}
              className="block hover:text-primary transition ease-in-out"
            >
              Learning
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block hover:text-primary transition ease-in-out"
            >
              Contact
            </Link>
          </li>
        </ul>

        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton className="bg-primary px-2 py-1 rounded-md text-white" />
        )}
      </div>
    </nav>
  );
}
