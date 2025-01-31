import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";

function Navbar() {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => fetchUserProfile(tokenInfo),
    onError: (error) => console.error("Login Error:", error),
  });

  const fetchUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log("User Profile:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
<div className="shadow-md bg-gradient-to-r p-2 bg-white flex justify-between items-center text-black w-full">
  <a href="/">
    <img src="/logo.png" alt="Logo" className="h-16 w-22" />
  </a>

  {/* Mobile Menu Toggle */}
  <button
    className="md:hidden text-black"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
  </button>

  {/* Navigation Links */}
  <div
    className={`md:flex gap-4 text-lg font-medium absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 transition-transform ${
      menuOpen ? "block" : "hidden md:flex"
    }`}
  >
    <Link to="/docs" className="text-black hover:underline block md:inline">
      Docs
    </Link>
    <Link to="/about" className="text-black hover:underline block md:inline">
      About
    </Link>

    {/* Authentication */}
    {user ? (
      <Popover className="bg-transparent">
        <PopoverTrigger className="bg-transparent">
          <img
            src={user.picture}
            alt="User"
            className="h-[45px] w-[45px] rounded-full"
          />
        </PopoverTrigger>
        <PopoverContent className="cursor-pointer p-2">
          <h2
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </h2>
        </PopoverContent>
      </Popover>
    ) : (
      <button
        onClick={() => setOpenDialog(true)}
        className="bg-yellow-300 text-blue-800 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition"
      >
        Sign In
      </button>
    )}
  </div>

  {/* Sign-In Modal */}
  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    <DialogContent className="bg-white">
      <DialogHeader>
        <DialogDescription className="text-center">
          <img src="./logo.png" alt="Logo" className="mx-auto h-10 w-15" />
          <h2 className="font-bold text-lg text-black">
            Sign In with Google
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Securely authenticate with Google
          </p>
          <button
            onClick={login}
            className="bg-black text-white w-full mt-5 flex gap-4 items-center justify-center border p-2 rounded-lg shadow-md hover:bg-gray-900 transition"
          >
            <FcGoogle className="h-7 w-7" />
            Sign In With Google
          </button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</div>
  );
}

export default Navbar;
