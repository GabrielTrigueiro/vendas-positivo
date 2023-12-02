import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "core/hooks/reduxHooks";
import SideBar from "app/components/sideBar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const AppContainer = styled(Box)`
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  overflow: hidden;
`;

const ContentContainer = styled(Box)`
  background-color: #ccc;
  flex: 8;
`;

const ProtectedRoute = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <AppContainer>
      <SideBar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </AppContainer>
  );
};

export default ProtectedRoute;
