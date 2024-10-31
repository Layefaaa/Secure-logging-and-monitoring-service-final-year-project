import { Theme, Typography, TypographyProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SxProps } from "@mui/system";
import React from "react";

interface LabelProps extends TypographyProps {
  sx?: SxProps<Theme>;
}

export const Label: React.FC<LabelProps> = ({ sx, children, ...props }) => {
  return (
    <Typography
      {...props}
      sx={[styles.label, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Typography>
  );
};

const styles = {
  label: (theme: Theme) => ({
    fontFamily: "Pretendard",
    color: theme.palette.mode === "light" ? grey[900] : grey[300],
    fontSize: "15px",
  }),
};
