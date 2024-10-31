"use client";

import { Box, Container, Theme, Stack, Divider } from "@mui/material";

import { grey } from "@mui/material/colors";

export default function LoggerSkeleton() {
  return (
    <Container sx={styles.container}>
  
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Box sx={styles.header}/>
      </Stack>
      <Stack spacing={10} direction={'row'}>
    <Stack spacing={1} alignItems={"center"} >
  
<Box sx={styles.gauge}/>
<Stack spacing={0.3}>
<Box sx={styles.subtitle}/>
<Box sx={styles.subtitle_small}/>
<Box sx={styles.subtitle}/>        
        </Stack>

        </Stack>
        <Stack spacing={1} alignItems={"center"} >
<Box sx={styles.gauge}/>
<Stack spacing={0.3}>
<Box sx={styles.subtitle}/>
<Box sx={styles.subtitle_small}/>
<Box sx={styles.subtitle}/>        
        </Stack>
        </Stack>
        <Stack spacing={1} alignItems={"center"} >
<Box sx={styles.gauge}/>
<Stack spacing={0.3}>
<Box sx={styles.subtitle}/>
<Box sx={styles.subtitle_small}/>
<Box sx={styles.subtitle}/>        
        </Stack>
        </Stack>
      </Stack>
      <Box  sx={{marginTop:10}}>
      <Box sx={styles.header}/>
      </Box>
      <Stack spacing={0.3} sx={{marginTop:10}}>
   
     

      {[...Array(8)].map((_, index) => (
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
  gauge:(theme:Theme)=>({
width:180,height:180,
borderRadius:30,
backgroundColor:theme.palette.mode==="light" ? grey[300]:grey[900],
  }),
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
  subtitle_small:(theme:Theme) =>( {
    fontSize: "14px",
    fontWeight: "normal",
    backgroundColor:theme.palette.mode==="light" ? grey[300]:grey[900],
    width:120,
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
