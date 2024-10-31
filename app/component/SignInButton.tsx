import { Box, Button, CircularProgress, SxProps, Theme } from "@mui/material";
import React from "react";
import { Label } from "./Label";

import { blue, grey } from "@mui/material/colors";
import Link from "next/link";

interface SignProps {
  title: string;
  onClick?: () => void;
  active?: boolean;
  sx?: SxProps<Theme>;
  path: string;
}
interface ButtonProps {
  title: string;
  onClick?: () => void;
  active?: boolean;
  sx?: SxProps<Theme>;
  loading?: boolean;
}
export const SignButton: React.FC<SignProps> = ({
  title,
  onClick,
  active,
  sx,
  path,
}) => {
  return (
    <Box sx={styles.container}>
      {active ? (
        <RenderActiveLabel title={title} />
      ) : (
        <Link href={path}>
          <Button sx={styles.button} onClick={onClick}>
            <Label sx={styles.normal_label}>{title}</Label>
          </Button>
        </Link>
      )}
    </Box>
  );
};

export const PageLogButton: React.FC<ButtonProps> = ({
  title,
  onClick,
  loading,
}) => {
  return (
    <Box sx={styles.container}>
      <Button disabled={loading}  sx={styles.pageButton} onClick={onClick}>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Label sx={styles.pblabel}>{title}</Label>
        )}
      </Button>
    </Box>
  );
};

const RenderActiveLabel = ({ title }: { title: string }) => {
  return (
    <Box sx={styles.active_c}>
      <Label sx={styles.active_label}>{title}</Label>
      <Box sx={styles.active_underline}></Box>
    </Box>
  );
};
const styles = {
  container: {
    // boxShadow: 'red 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  },

  button: (theme: Theme) => ({
    backgroundColor: theme.palette.mode === "dark" ? grey[600] : grey[200],
    borderRadius: 10,
    padding: "5px 15px",
    boxShadow: "rgba(0, 0, 0, 0.26) 0px 22px 70px 4px",
    textTransform: "none",
  }),

  active_c: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  active_label: (theme: Theme) => ({
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.mode === "dark" ? grey[100] : blue[500],
  }),
  normal_label: (theme: Theme) => ({
    fontSize: 13,
    fontWeight: 600,
    color: theme.palette.mode === "dark" ? grey[800] : blue[500],
  }),
  active_underline: (theme: Theme) => ({
    width: "40%",
    height: "3px",
    borderRadius: 20,

    backgroundColor: theme.palette.mode === "dark" ? grey[100] : blue[500],
  }),
  pageButton: (theme: Theme) => ({
    width: "100%",
    height: "40px",
    backgroundColor: theme.palette.mode === "dark" ? blue[300] : blue[300],
    borderRadius: 4,
    padding: "5px 15px",
    boxShadow: "rgba(0, 0, 0, 0.26) 0px 22px 70px 4px",
    textTransform: "none",
  }),
  pblabel: (theme: Theme) => ({
    fontSize: 13,
    fontWeight: 600,
    color: theme.palette.mode === "dark" ? grey[100] : blue[900],
  }),
};
