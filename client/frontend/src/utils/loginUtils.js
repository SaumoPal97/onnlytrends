export const isAuthenticated = () => {
  return (
    localStorage.getItem("access_token") !== undefined &&
    localStorage.getItem("access_token") !== null
  );
};
