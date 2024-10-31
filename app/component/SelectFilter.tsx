import { Box, MenuItem, Select, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

interface OptionTy {
  value: string;
  label: string;
}

interface Props {
  onChange: (value: string) => void;
  value: string;
  items: OptionTy[];
}
export const SelectFilter = ({ onChange, value, items }: Props) => {
    const handleOnChange = (data: any) =>{

       onChange(data.target.value)
    }
  return (
    <Select
      sx={styles.container}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
     value={value}
      onChange={handleOnChange}
    >
      {items.map((data, index) => {
        return (
          <MenuItem
            key={index}
            className="roomtype"
            value={data.value}
            style={styles.label}
          >
            {data.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1px",
    // color:ColorTheme.text.label
  },
  container:(theme:Theme)=>({
    minWidth: "160px",
    height: "40px",
    fontFamily: "Manrope",
    color: theme.palette.mode==="light" ? "rgb(6, 8, 29)" : grey[300],
  }),
  label: {
    fontSize: "14px",
  },
};
