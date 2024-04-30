import Cookies from "js-cookie";

export const isAuthenticated = () => {
  return (
    localStorage.getItem("userDetails") !== undefined &&
    Cookies.get("userinfo") !== null
  );
};
