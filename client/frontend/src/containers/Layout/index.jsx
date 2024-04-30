import { Outlet } from "react-router-dom";

import TopNav from "@/components/TopNav";

const Layout = () => {
  const handleSignup = () => {};
  const handleSignout = () => {};
  const handleSubscribe = () => {};

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
