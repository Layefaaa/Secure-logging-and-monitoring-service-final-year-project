import { Box, Container, SxProps } from "@mui/material";
import React from "react";
import { SignButton } from "./SignInButton";

interface AppLayoutProps {
  children: React.ReactNode;
}
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Container sx={styles.container}>
      <AppHeader />

      <Box>{children}</Box>
    </Container>
  );
};

const AppHeader: React.FC = () => {
  return (
    <Box sx={styles.headerContainer}>
      <Box sx={styles.headerLeftCompoment}></Box>
      <Box sx={styles.headerRightComponent}>
        <SignButton path="" title="Sign in" onClick={() => {}} />
      </Box>
    </Box>
  );
};
const styles: Record<string, SxProps> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    fontSize: 20,
  },
  headerLeftCompoment: {
    width: "60%",
  },
  headerRightComponent: {
    width: "40%",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 3,
  },
};
