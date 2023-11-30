import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../core/hooks/reduxHooks";
//import { getUser, logout } from "../../core/redux/slices/authSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

  // useEffect(() => {
  //   if (basicUserInfo) {
  //     dispatch(getUser(basicUserInfo.id));
  //   }
  // }, [basicUserInfo]);

  // const handleLogout = async () => {
  //   try {
  //     await dispatch(logout()).unwrap();
  //     navigate("/login");
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <>
      <h1>Home</h1>
      <h4>Name: {userProfileInfo?.name}</h4>
      <h4>Email: {userProfileInfo?.email}</h4>
      {/* <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
        Logout
      </Button> */}
    </>
  );
};

export default Home;
