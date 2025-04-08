import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UserPenIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function DashProfile() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const fileInputRef = useRef(null);

  const { user } = useUser();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profilePic: "",
    password: "",
    confirmPassword: "",
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAdmin`);
      const user = response.data;
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        profilePic: user.profilePic || "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUserData({ ...userData, profilePic: URL.createObjectURL(selectedFile) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) formData.append("profilePic", file);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("email", userData.email);
    formData.append("phone", userData.phone);
    formData.append("address", userData.address);

    // Add password and confirmPassword if they're filled
    if (userData.password) {
      formData.append("password", userData.password);
    }
    if (userData.confirmPassword) {
      formData.append("confirmPassword", userData.confirmPassword);
    }

    try {
      await axios.post(`${BASE_URL}/setAdmin`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!");
      fetchUserData();
    } catch (error) {
      toast.error("Failed to update profile!");
      console.error("Error:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="relative top-14">
      <h1 className="text-4xl font-bold uppercase">Profile</h1>

      <div className="grid md:grid-cols-2 grid-cols-1">
        <form onSubmit={handleSubmit} className="mt-6 max-w-[430px]">
          <input
            type="text"
            name="firstName"
            className="border-0 outline-none border-b-2 border-black w-full my-4"
            placeholder="First Name"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            className="border-0 outline-none border-b-2 border-black w-full my-4"
            placeholder="Last Name"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="border-0 outline-none border-b-2 border-black w-full my-4"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            className="border-0 outline-none border-b-2 border-black w-full my-4"
            placeholder="Phone"
            value={userData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            className="border-0 outline-none border-b-2 border-black w-full my-4"
            placeholder="Address"
            value={userData.address}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="border-0 outline-none border-b-2 border-black w-full my-4"
            placeholder="New Password"
            value={userData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            className="border-0 outline-none border-b-2 border-black w-full my-4"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          <div className="flex justify-end items-center mt-8">
            <Button type="submit" className="md:mr-[300px] w-[100px] uppercase">
              Save
            </Button>
          </div>
        </form>

        <div className="flex justify-center items-center flex-col relative">
          <img
            src={userData.profilePic || "/default-profile.png"}
            alt="profilepic"
            className="w-[250px] h-[250px] rounded-full object-cover"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <UserPenIcon
            className="relative bottom-5 right-0 cursor-pointer bg-white p-1 rounded-full"
            size={30}
            onClick={() => fileInputRef.current.click()}
          />
        </div>
      </div>
    </div>
  );
}

export default DashProfile;
