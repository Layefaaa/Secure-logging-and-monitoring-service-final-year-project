"use client";

import { Box, Container, Theme, Stack, Divider } from "@mui/material";

import { grey } from "@mui/material/colors";

export default function UserDetailSkeleton() {
  return (
    <Container sx={styles.container}>
      <Stack direction={"row"} sx={styles.stack}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Box sx={styles.box}/>
          <Stack spacing={0.3}>
            <Box sx={styles.header}/>
            <Box sx={styles.subtitle}/>
            <Box sx={styles.dateMobile}/>
          </Stack>
        </Stack>

        <Stack
          sx={styles.lastJoin}
          direction={"row"}
          alignItems={"center"}
          spacing={1}
        >
          <Box sx={styles.header}/>
          <Box sx={styles.box}/>
           
        
        </Stack>
      </Stack>
      <Divider sx={styles.divider} />

      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Box sx={styles.header}/>
        <Box sx={styles.subtitle}/> 
      </Stack>
      <Stack spacing={0.3}>
        <Box sx={styles.header}/>
        <Box sx={styles.subtitle}/>
      </Stack>

      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Box sx={styles.box}/>
          <Stack spacing={0.3}>
            <Box sx={styles.header}/>
            <Box sx={styles.subtitle}/>
            <Box sx={styles.subtitle}/>
          </Stack>
        </Stack>
        <Stack spacing={0.3} >
          <Box sx={styles.header}/>
          <Box sx={styles.subtitle}/>
           
          <Box sx={styles.subtitle}/>
          
        </Stack>
      </Stack>

      <Divider sx={styles.divider} />
      <Stack spacing={0.3}>
      {[...Array(3)].map((_, index) => (
  <Box key={index} sx={styles.boxLoader} />
))}
    
      
      </Stack>
     
      <Box height={40}/>
    </Container>
  );
}

const styles = {
  container: {
    marginTop: 3,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  header:(theme:Theme) =>({
    fontSize: "18px",
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor:theme.palette.mode==="light" ? grey[300]:grey[900],
    width:250,
    height:30
  }),
  subtitle:(theme:Theme) =>( {
    fontSize: "14px",
    fontWeight: "normal",
    backgroundColor:theme.palette.mode==="light" ? grey[300]:grey[900],
    width:150,
    height:20
  }),
  stack: (theme: Theme) => ({
    display: "flex",
    width: "100%",
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
    padding: 1,
    borderRadius: 3,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  }),
  box: (theme: Theme) => ({
    borderRadius: 5,
    width: "40px",
    height: "40px",
    backgroundColor: theme.palette.mode === "light" ? grey[200] : grey[900],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }),
  divider: (theme: Theme) => ({
    borderStyle: "dashed",
    width: "100%",
    height: "2px",
  }),
  lastJoin: (theme: Theme) => ({
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }),
  dateMobile: (theme: Theme) => ({
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      fontSize: "13px",
      color: theme.palette.mode === "light" ? grey[600] : grey[500],
    },
  }),
  boxLoader:(theme:Theme) =>({
    backgroundColor:theme.palette.mode==="light" ? grey[300]:grey[900],
    width:'98%',
    height:50
  })

  
};
