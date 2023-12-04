import { SvgIconTypeMap, Button, ListItemButton } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import useSideBarHook from "core/hooks/sideBarHook";
import { IconType } from "react-icons";
import { useResolvedPath, useMatch, Link } from "react-router-dom";

type TSideBarItem = {
  icon:
    | IconType
    | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string });
  link: string;
  label: string;
};

function SideBarItem({ icon: Icon, label, link }: TSideBarItem) {
  const { isOpen } = useSideBarHook();
  const resolvedPath = useResolvedPath(link);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  return (
    <Link style={{ width: "100%", borderRadius: "10px" }} to={link}>
      <ListItemButton
        selected={!!match}
        sx={{
          "&.Mui-selected": {
            background: (theme) => theme.palette.primary.main,
            color: "#fff",
            ":hover": { background: (theme) => theme.palette.primary.main },
          },
          animation: "ease",
          transition: "all 0.3s ease",
          width: "100%",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 2,
          padding: "5%",
          ...(!isOpen && {
            height: 40,
            justifyContent: "center ",
          }),
        }}
      >
        {!isOpen ? (
          <Icon />
        ) : (
          <>
            <Icon />
            {label}
          </>
        )}
      </ListItemButton>
    </Link>
  );
}

export default SideBarItem;
