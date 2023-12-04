import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "core/hooks/reduxHooks";
import SideBar from "app/components/sideBar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import Navbar from "app/components/navbar";

const AppContainer = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const ContentContainer = styled(Box)`

`;

const ProtectedRoute = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (!basicUserInfo) {
    return <Navigate replace to={"/login"} />;
  }

  return (
    <AppContainer>
      <SideBar />
      <ContentContainer sx={{ width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar />
        <Box sx={{ flex: 1, padding: "1%" }}>
          <Outlet />
        </Box>
      </ContentContainer>
    </AppContainer>
  );
};

export default ProtectedRoute;
