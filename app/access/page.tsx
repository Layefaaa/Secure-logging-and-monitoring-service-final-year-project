"use client";
import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { useProvider } from "../storage/Provider";

export default function CheckId() {
  const { accessData } = useProvider();
  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Typography variant="h3" sx={styles.title}>
          Access Blocked
        </Typography>
        <Typography variant="body1" sx={styles.message}>
          It appears that you are using Proxy service to access our site. For
          security reasons, access is restricted when using such services.
        </Typography>
        <Typography variant="body1" sx={styles.instructions}>
          Please disable your Proxy and try accessing the site again. If you
          believe this is an error, contact our support team.
        </Typography>
        <Box sx={styles.infoContainer}>
          <Typography variant="body1" sx={styles.infoText}>
            <strong>IP Address:</strong> {accessData?.ip}
          </Typography>
          {accessData && (
            <Typography variant="body1" sx={styles.infoText}>
              <strong>Location:</strong> {accessData?.emoji_flag} {accessData?.city},{" "}
              {accessData?.continent_name},
            </Typography>
          )}
          <Box sx={styles.flagContainer}></Box>
        </Box>
        <Button sx={styles.btn}>Home</Button>
      </Box>
    </Box>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "white",
    position: "absolute",
    zIndex: 10000,
    top: 0,
    left: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "400px",
    width: "80%",
    backgroundColor: "white",
  },
  btn: {
    marginTop: 10,
  },
};
