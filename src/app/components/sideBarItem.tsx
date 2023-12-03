import { IconType } from "react-icons";
import React from "react";
import { Link } from "react-router-dom";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Box, SvgIconTypeMap } from "@mui/material";
import useSideBarHook from "core/hooks/sideBarHook";

type TSideBarItem = {
  icon:
  | IconType
  | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string });
  link: string;
  label: string;
};

function SideBarItem({ icon: Icon, label, link }: TSideBarItem) {
  const { isOpen } = useSideBarHook();

  return (
    <Link style={{ width: "100%", borderRadius: "10px" }} to={link}>
      <Box sx={{
        width: "100%",
        background: (theme) => theme.palette.secondary.light,
        borderRadius: "5px",
        display: "flex",
        justifyContent: "flex-start",
        gap: 2,
        padding: 1
      }}>
        {!isOpen ? (
          <Icon />
        ) : (
          <>
            <Icon />
            {label}
          </>
        )}
      </Box>
    </Link>
  );
}

export default SideBarItem;
