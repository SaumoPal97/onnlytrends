import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import TopNav from "@/components/TopNav";
import { API_URL } from "@/utils/apiUtils";

const Layout = () => {
  const [userDetails, setUserDetails] = useState({});

  const handleSignup = () => {
    window.location.href = "/auth/login";
  };

  const handleSignout = () => {
    // Clear any stored user information
    setUserDetails({});
    localStorage.removeItem("userDetails");

    // Redirect to Choreo logout with session_hint
    const sessionHint = Cookies.get("session_hint");
    window.location.href = `/auth/logout?session_hint=${sessionHint}`;

    Cookies.remove("userinfo", { path: "/" });
  };
  const handleSubscribe = async () => {
    if (userDetails) {
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userDetails }),
      });
    }
  };

  useEffect(() => {
    let isUserInfoSet = false;
    if (import.meta.env.VITE_NODE_ENV === "dev") {
      // Mock the authentication flow
      const mockUserInfo = {
        name: "Test User",
        email: "email@test.com",
      };
      localStorage.setItem("userDetails", JSON.stringify(mockUserInfo));
      isUserInfoSet = true;
    }

    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setUserDetails(userDetails);
      isUserInfoSet = true;
    }

    if (!isUserInfoSet) {
      const encodedUserInfo = Cookies.get("userinfo");
      if (encodedUserInfo) {
        const userInfo = JSON.parse(atob(encodedUserInfo));
        setUserDetails(userInfo);
        localStorage.setItem("userDetails", JSON.stringify(userInfo));
      }
    }
  }, []);

  return (
    <div className="h-screen">
      <TopNav
        handleSignup={handleSignup}
        handleSignout={handleSignout}
        handleSubscribe={handleSubscribe}
      />
      <div className="bg-gray-300 w-full h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
