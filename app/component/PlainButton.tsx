import { Avatar, Button, Theme } from "@mui/material";

import { Label } from "./Label";
import { blue } from "@mui/material/colors";

interface SignProps {
  title: string;
  onClick?: () => void;
 icon?:string
 
}
export const PlainButton: React.FC<SignProps> = ({ title, onClick ,icon}) => {
  return (
    <Button sx={styles.pageButton} onClick={onClick}>
        <Avatar alt="image" src={icon} sx={{width:20,height:20,marginRight:1}}/>
      <Label sx={styles.pblabel}>{title}</Label>
    </Button>
  );
};

const styles = {
  pageButton: (theme: Theme) => ({
    width: "100%",
    height: "40px",
    backgroundColor: 'transparent',
    borderColor:theme.palette.mode==='dark' ? blue[300]:blue[300],
    borderRadius: 4,
    padding: "5px 15px",
    boxShadow: "rgba(0, 0, 0, 0.26) 0px 22px 70px 4px",
    textTransform: "none",
    borderWidth:'1px',borderStyle:"solid"
  }),
  pblabel: (theme: Theme) => ({
    fontSize: 13,
    fontWeight: 600,
    // color: theme.palette.mode === "dark" ? grey[100] : blue[900],
  }),
};
