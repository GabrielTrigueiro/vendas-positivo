import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "core/hooks/reduxHooks";

const DefaultRoute = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (basicUserInfo) {
    return <Navigate replace to={"/dashboard"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default DefaultRoute;
