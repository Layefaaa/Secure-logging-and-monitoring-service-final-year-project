import { alpha, FormControl, InputBase, InputProps, Theme } from "@mui/material";
import { Label } from "./Label";
import { grey } from "@mui/material/colors";

interface InputProp extends InputProps {
  placeholder: string;
  handleOnChange: (value: string) => void;
  type?: string;
  name?: string;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  isSmall?:boolean
}
export const InputText: React.FC<InputProp> = ({
  placeholder,
  handleOnChange,
  type = "text",
  name,
  value,
  errorMessage,
  error,
  isSmall=false,...props
  
}) => {
  const styles=getStyles(isSmall)
  return (
    <FormControl variant="standard">
      <InputBase
      {...props}
        name={name}
        type={type as "text" | "password"}
        onChange={(el) => {
          handleOnChange(el.target.value);
        }}
        value={value}
        error={error}
        placeholder={placeholder}
        sx={styles.input}
      />
      {error && <Label sx={styles.errorMessasge}>{errorMessage}</Label>}
    </FormControl>
  );
};

const getStyles =(isSmall:boolean)=>
{  return {
  input: (theme: Theme) => ({
    "& input::placeholder": { fontSize: "13px" },
    "& .MuiInputBase-input": {
      borderRadius:isSmall ?1: 4,
      position: "relative",
      backgroundColor:isSmall ? 'transparent' : theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
      border: "1px solid",
      borderColor: theme.palette.mode === "light" ?  isSmall ? grey[400]:  "#E0E3E7" : isSmall ? grey[700]: "#2D3843",
      fontSize: 16,
      width: isSmall ? '300px' :"100%",
      padding: isSmall ?  "8px 12px" : "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }),
  errorMessasge: {
    color: "red",
    fontSize: "10px",
    height: "20px",
    marginLeft: "20px",
    marginTop: "5px",
  },
};
}