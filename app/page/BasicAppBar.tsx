"use client";
import { AppBar, Avatar, Box, IconButton, Theme, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { ColorModeContext } from "../styles/Theme";
import { ModeType } from "../utils";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import { SignButton } from "../component/SignInButton";
import { UsePathName } from "../hooks/UsePathName";
import { TabsLabel } from "../component/TabLabel";
import { useRouter } from "next/navigation";
import NavMenu from "../layout/mobile-menu-nav";
import { useProvider } from "../storage/Provider";
import UserAvatar from "../component/UserAvatar";
export default function BasicAppBar({
  mode,
  showMenu,
}: {
  mode: ModeType;
  showMenu?: () => void;
}) {
  const colorMode = React.useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const ToggleDrawer = () => {
    setOpen(!open);
  };
  const path = UsePathName();
  const isLoginPage = path === "/account/login";
  const isSignUpPage = path === "/account/register";
  const isHomePage = path === "/";
  const canShowAccessTab = [isLoginPage, isSignUpPage, isHomePage].some(Boolean);
  const router=useRouter()

  const {user} =useProvider();
  
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={styles.app}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={()=>router.push('/')}>
          <Avatar src={"/images/logGuard.png"} sx={styles.img} alt="logo" />
        </IconButton>
        {canShowAccessTab && !user &&  (
          <Box sx={styles.tabs}>
            <Box sx={styles.headerLeftCompoment}>
              <TabsLabel path="/" label="Home" />
              <TabsLabel path="/" label="  About" />
            </Box>
            <Box sx={styles.headerRightComponent}>
              <SignButton
                active={isLoginPage}
                title="Sign in"
                path={"/account/login"}
              />
              <SignButton
                active={isSignUpPage}
                title="Register"
                path={"/account/register"}
              />
            </Box>
          </Box>
        )}
   
        <Box sx={styles.rightComponent}>
        {
          user && 
        <UserAvatar firstname={user.firstname} lastname={user.lastname}/>
        }

          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {mode === "dark" ? (
              <Brightness4Icon color="inherit" />
            ) : (
              <DarkModeIcon color="action" />
            )}
          </IconButton>
          <Box sx={styles.menu}>
            <IconButton sx={{ ml: 1 }} onClick={ToggleDrawer} color="inherit">
              <MenuIcon color="action" />
            </IconButton>
          </Box>
          <NavMenu onCloseNav={ToggleDrawer} openNav={open} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const styles = {
  app:(theme: Theme)=>({
  
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.mode==="light" ? 'transparent':'transparent',
    },
    [theme.breakpoints.down("md")]: {
      backgroundColor: theme.palette.mode==="light" ? theme.palette.grey[50]:theme.palette.grey[900],  
    },
  }),
  tabs: (theme: Theme) => ({
    width: "100%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
 
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    
    },
  }),
  img: (theme: Theme) => ({
    boxShadow: "rgba(17, 12, 46, 0.1) 0px 48px 100px 0px",

    [theme.breakpoints.up("sm")]: {
      height: "40px",
      width: "40px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "30px",
      width: "30px",
    },
  }),

  headerLeftCompoment: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 2,
    gap: 5,
  },
  headerRightComponent: {
    width: "40%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 3,
    gap: 5,
  },

  rightComponent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  menu: (theme: Theme) => ({
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  }),
};
