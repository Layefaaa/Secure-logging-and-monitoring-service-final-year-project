import { Box, Container, Stack, Theme } from "@mui/material"
import { Label } from "./Label"
import { blue, grey } from "@mui/material/colors"
import { verifyAccount } from '../services/auth/verifyAccount';



interface TabsProps{
    items:{
        label:string,
        component:React.ReactNode,
    }[],
    onChange:(_index:number)=>void,
    active:number
}
export const Tabs:React.FC<TabsProps>=({items,onChange,active})=>{
  const activeComponent=items[active].component
    return(
        <Container sx={styles().layout}>
       <Stack sx={styles().container}>
            {items.map((item,index)=>(
                <Box sx={styles(active===index).tab} key={index} onClick={()=>onChange(index)}>
                    <Label sx={styles(active===index).label}>{item.label}</Label>
                </Box>
            ))}
        </Stack>

{activeComponent}   
        </Container>
 
    )
}


const styles=(active?:boolean)=>
   {return {
    layout:{
width:'100%',
    },
    container:(theme:Theme)=>({
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:2,
        borderBottomWidth:'1px',
        borderBottomStyle:'solid',
        borderBottomColor:theme.palette.mode==="light" ? grey[300]:grey[900],
        

    }),
    tab:(theme:Theme)=>({
        cursor:'pointer',
        padding:'2px 0',
        borderBottomStyle:'solid',
        borderBottomWidth:'1.5px',
        borderBottomColor:active ? theme.palette.mode==="light" ? blue[600]:blue[300]: 'transparent',

    }),
    label:(theme:Theme)=>({
        fontSize:'18px',
        color:active ? theme.palette.mode==="light" ? blue[600]:blue[300]: theme.palette.mode==="light" ? grey[700]:grey[400],

    }),
    component:{
        display:'flex',
        width:'100%',
        flexDirection:'column'
    }

}
}