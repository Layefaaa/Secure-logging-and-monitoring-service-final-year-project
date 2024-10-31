import { AppBar, Avatar, Box, IconButton, Theme, Toolbar } from "@mui/material";
import React, { useState } from "react";

import { UsePathName } from "../hooks/UsePathName";
import { grey } from "@mui/material/colors";
import { Label } from "../component/Label";
export default function AppFooter() {

  const path = UsePathName();
  const isLogin = path === "/account/login";
  const isSignUp = path === "/account/register";
  const isVerification = path === "/account/verification";
  return (
  <Box sx={styles.container}>
    <Box sx={styles.left}>
      <Box sx={styles.brand}>
        <Avatar src={"/images/logGuard.png"}/>
        <Label sx={styles.brandName}>Log Guard</Label>
      </Box>
      <Label sx={styles.poweredBy}>Powered by</Label>
      <Label sx={styles.coporate}>LogGuard.inc</Label>
      <Label sx={styles.establish}>@2024</Label>
    </Box>
    <Box>

    </Box>

  </Box>
  );
}

const styles = {
  container: (theme: Theme) => ({
    width: "100%",
    display: "flex",
    backgroundColor:theme.palette.mode==="light"? "#021636":grey[900],
    marginTop:5,
    [theme.breakpoints.up("md")]: {
      height: "150px",
    },
    [theme.breakpoints.down("md")]: {  // height: "100px",
      flexDirection: "column",
  
 
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
  left:{
    padding:2,
    gap:1
  },brand:{
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    gap:1
    ,
    marginBottom:"10px"
  },
  brandName:(theme:Theme)=>({
  fontSize:20
  ,
  fontWeight:'bold'
  ,
  color:theme.palette.mode==="dark" ? grey[400]:grey[400]
  })
,
poweredBy:(theme:Theme)=>({
  fontSize:14
  , color:theme.palette.mode==="dark" ? grey[400]:grey[400]
  }),
  coporate:(theme:Theme)=>({
    fontSize:14
    , color:theme.palette.mode==="dark" ? grey[400]:grey[400]
    }),
    establish:(theme:Theme)=>({
      fontSize:13
      , color:theme.palette.mode==="dark" ? grey[500]:grey[500]
      })
};
