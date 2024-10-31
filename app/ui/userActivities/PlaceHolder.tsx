import { Box } from "@mui/material"
export const Placeholder=()=>{

    const position = [51.505, -0.09]

    return(
        <Box sx={styles.container}>
  
        </Box>
    )
}

const styles={
    container:{
        zIndex:100,
        // position:'absolute',
        minWidth:'100%',
        height:'100vh',
        backgroundColor:'rgba(247, 247, 247,1)',
        borderRadius:'2px',
        // margin:10

    }
}