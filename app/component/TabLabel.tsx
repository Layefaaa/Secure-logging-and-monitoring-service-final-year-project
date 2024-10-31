import { Button, Theme } from "@mui/material";
import Link from "next/link";
import { Label } from "./Label";

export const TabsLabel = ({ label, path }: { path: string; label: string }) => {
  return (
    <Link href={path}>
      {" "}
      <Button variant="text">
        <Label sx={styles.label}>{label}</Label>{" "}
      </Button>
    </Link>
  );
};

const styles = {
  container: {},
  label: (theme: Theme) => ({
    fontSize: "14px",
    textTransform:'none'
  }),
};
