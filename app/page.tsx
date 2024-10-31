"use client";
import { Box, colors, Container, Theme,Avatar } from "@mui/material";
// import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { Label } from "./component/Label";
import { Icon } from "./component/Icon";
import { blue } from "@mui/material/colors";
import { motion } from "framer-motion"
export default function Home() {
  const { data: session } = useSession();
  if (session === null) {
    // redirect("/login");
  }


  return (
    <Box sx={styles.container}>
      <Box sx={styles.main}>
    

<Box sx={styles.leftContainer}>
<motion.div
      initial={{ opacity: 0, scale: 0.5,y:100 }}
      animate={{ opacity: 1, scale: 1,y:0 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],}}
>

          <Label sx={styles.header}>
            Experience the most<span style={styles.highlights}> secure </span>{" "}
            and <span style={styles.highlights}>transparent </span> asset
            auction marketplace with{" "}
            <span style={styles.highlights}> real-time </span>monitoring and
            advanced user authentication
          </Label>
          </motion.div>
        </Box>

    
        <Box sx={styles.rightComponent}>
        <motion.div
      initial={{ opacity: 0, scale: 0.5,y:100 }}
      animate={{ opacity: 1, scale: 1,y:0 }}
      transition={{
        duration: 0.4,
        ease: [0, 0.71, 0.2, 1.01],}}
>
<Avatar
            alt="flow"
            src={"/images/landpage.png"}
            sx={styles.landpage}
          
         
          />
</motion.div>
        
          <Icon animate={0.7} path="/images/secure1.png" style={styles.icon3}  />
          <Icon animate={0.9} path="/images/key.png" style={styles.icon2} />
          <Icon animate={0.9} path="/images/auction.png" style={styles.icon1}  />
        </Box>
      </Box>
    </Box>
  );
}
const styles = {
  icon1:(theme:Theme)=>({
    [theme.breakpoints.down("md")]: {
      marginTop: 20, marginLeft: -30

      },
      [theme.breakpoints.up("md")]: {
        marginTop: 25, marginLeft:20
      },
      [theme.breakpoints.up("xl")]: {
        marginTop: 50, marginLeft:20
      },
  }),

  icon2:(theme:Theme)=>({
   

    [theme.breakpoints.down("md")]: {
      marginTop: -5, marginLeft: 35

      },
      [theme.breakpoints.down("sm")]: {
        marginTop: -5, marginLeft: 25
  
        },
      [theme.breakpoints.up("md")]: {
        marginTop:  -20, marginLeft:  40
      },
      [theme.breakpoints.up("xl")]: {
        marginTop:  -20, marginLeft:  80
      },
  }),

  icon3:(theme:Theme)=>({
    [theme.breakpoints.down("md")]: {
      marginTop: -30, marginLeft: 0

      },
      [theme.breakpoints.up("md")]: {
        marginTop:-40
      },
      [theme.breakpoints.up("xl")]: {
        marginTop:-50
      },
  }),
  container:(theme:Theme)=>( {
    width: "100%",

    [theme.breakpoints.down("md")]: {
      paddingTop: 20,

      },
      [theme.breakpoints.up("md")]: {
        paddingTop: 10,
      },

  }),
  main: (theme: Theme) => ({
    display: "flex",

    [theme.breakpoints.down("md")]: {
      justifyContent: "space-between",
      flexDirection: "column-reverse",
      gap:10
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-between",
      flexDirection: "row",
    },
  }),
  leftContainer:(theme:Theme)=>( {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
   
  
    [theme.breakpoints.down("md")]: {
      width:"100%",
    },
    [theme.breakpoints.up("md")]: {
      width:"50%",
    },

  }),
  rightComponent:(theme:Theme)=>( {
    display:'flex',
    flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
   
    [theme.breakpoints.down("md")]: {
      width:"100%",
    },
    [theme.breakpoints.up("md")]: {
      width:"50%",
    },
  }),
  header: (theme: Theme) => ({
    fontWeight: "bold",
    width:'95%',
    fontFamily:'StarlightStreet-Regular',
    [theme.breakpoints.down("md")]: {
      fontSize: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },

    [theme.breakpoints.up("lg")]: {
      fontSize: "30px",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "40px",
    },
  }),
  highlights:{
    color: blue[500]
  },
  landpage:(theme:Theme)=>({
    zIndex:100,
    [theme.breakpoints.down("md")]: {
    width:'300px',height:"300px"
    },
    [theme.breakpoints.down("sm")]: {
      width:'200px',height:"200px"
      },
    [theme.breakpoints.up("lg")]: {
      width:'250px',height:"250px"
      },
      [theme.breakpoints.up("xl")]: {
        width:'500px',height:"500px"
        },
   
  })
};
