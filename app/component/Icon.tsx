import { Avatar, Box, SxProps, Theme } from "@mui/material";
import { motion } from "framer-motion"
interface IconProps {
  style: any;
  path: string;
  animate?:number
}

export const Icon: React.FC<IconProps> = ({
  style,
  animate,
  path,
}) => {
  return (
    <Box sx={[styles.img, style]} className="icon">
             <motion.div
      initial={{ opacity: 0, scale: 0.5,y:100 }}
      animate={{ opacity: 1, scale: 1,y:0 }}
      transition={{
        duration:animate?? 0.4,
        ease: [0, 0.71, 0.2, 1.01],}}
> 

 <Box sx={styles.wrapper}>
 <Avatar sx={styles.img} src={path} />

 </Box>
 </motion.div>
    
    </Box>
  );
};

const styles = {
  wrapper:(theme:Theme)=>({
 backgroundColor:theme.palette.mode==="light"? "rgba(216, 221, 222,0.4)":"rgba(3, 1, 18,0.2)",
 borderRadius:50,
   display:"flex",
   flexDirection:'center',
   alignItems: 'center',
   [theme.breakpoints.down("md")]: {
    width: 100,
    height: 100,
    },
    [theme.breakpoints.down("sm")]: {
      width: 60,
      height: 60,
      },
    [theme.breakpoints.up("md")]: {
        width: 100,
        height: 100,
  
    },
    [theme.breakpoints.up("xl")]: {
      width: 200,
      height: 200,
   
  },
  }),
  img:(theme:Theme)=>( {
    borderRadius:50,
   
    zIndex:10,
   


    [theme.breakpoints.down("md")]: {
        width: 100,
        height: 100,
        },
        [theme.breakpoints.down("sm")]: {
          width: 60,
          height: 60,
          },
        [theme.breakpoints.up("md")]: {
            width: 100,
            height: 100,
             padding:1.5,
        },
        [theme.breakpoints.up("xl")]: {
          width: 200,
          height: 200,
           padding:1.5,
      },
  }),
};
