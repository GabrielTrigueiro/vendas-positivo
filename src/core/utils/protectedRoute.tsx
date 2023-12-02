import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "core/hooks/reduxHooks";
import SideBar from "app/components/sideBar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const AppContainer = styled(Box)``;

const ProtectedRoute = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <AppContainer>
      <SideBar />
      <Outlet />
    </AppContainer>
  );
};

export default ProtectedRoute;
