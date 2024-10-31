"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  Theme,
  Stack,
  Divider,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { InputText } from "../../component/InputText";
import { Label } from "../../component/Label";
import { blue, grey } from "@mui/material/colors";
import { PageLogButton } from "../../component/SignInButton";
import { PlainButton } from "../../component/PlainButton";
import { useRef, useState } from "react";
import { AuthApi } from "../../services/auth";
import { clientIp } from "@/app/lib/getClientIp";
import { handleClientResponse } from "@/app/lib/common";
import { InfoType, useProvider } from "@/app/storage/Provider";
type FieldValue = {
  value: string;
  error?: boolean;
};
interface SignupFieldProps {
  firstname: FieldValue;
  lastname: FieldValue;
  email: FieldValue;
  password: FieldValue;
  submissionAttempt?: boolean;
}

const initialState: SignupFieldProps = {
  firstname: { value: "", error: true },
  lastname: { value: "", error: true },
  email: { value: "", error: true },
  password: { value: "", error: true },
};

export default function SignUp() {
  const {setAccessData}=useProvider()
  const { data: session } = useSession();
  const hasRunRef = useRef(false);
  if (session) {
    // redirect("/admin");
  }
  const [state, setState] = useState<SignupFieldProps>(initialState);
  const [isloading, setloading] = useState(false);
const router=useRouter()
  const handleChange = (key: keyof SignupFieldProps) => (value: string) => {
    setState((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] as FieldValue),
        value: value,
        error: value.length < 1,
      },
    }));
  };
  const handleSubmit = async () => {
    hasRunRef.current = false;
    const isValid = Object.values(state).every((input) => !input.error);
    if (isValid) {
      setloading(true);
      if (hasRunRef.current) return;
      const ip = await clientIp();
      const response = await AuthApi.signUp({
        lastname: state.lastname.value,
        firstname: state.firstname.value,
        email: state.email.value,
        password: state.password.value,
        ip,
      });

      setloading(false);
      hasRunRef.current = true;
      if (response && response.info) {
        setAccessData(response.info as unknown as InfoType)
        handleClientResponse({
          status: response.status as number,
          message: {
            secure: "Please check your inbox to verify your account",
            unsecure: "Access Blocked",
          },
          callback:()=>router.push('/access')
        });
      }
    } else {
      setState((prev) => ({
        ...prev,
        submissionAttempt: true,
      }));
      scrollTo({ top: 0, left: 0 });
    }
  };

  return (
    <Container sx={styles.container}>
      <Box sx={styles.leftComponent}>
        <Avatar src={"/images/log.png"} sx={styles.img_m} />
        <Label sx={styles.welcome}>{"Welcome to our \n community"}</Label>

        <Stack direction={"row"} width={"100%"}>
          <Box sx={styles.subtitle_container}>
            {" "}
            <Label sx={styles.subtitle}>
              {"A whole new journey \n start right here."}
            </Label>
          </Box>
          <Box sx={styles.leftIcon}>
            <Avatar src={"/images/log.png"} sx={styles.img} />
          </Box>
        </Stack>
      </Box>
      <Box sx={styles.rightComponent}>
        <InputText
          name="firstname"
          placeholder="Enter your first name"
          error={state.submissionAttempt && state.firstname.error}
          errorMessage={"Please enter your first name"}
          value={state.firstname.value}
          handleOnChange={handleChange("firstname")}
        />

        <InputText
          name="lastname"
          placeholder="Enter your surname"
          error={state.submissionAttempt && state.lastname.error}
          errorMessage={"surname field is required"}
          value={state.lastname.value}
          handleOnChange={handleChange("lastname")}
        />
        <InputText
          name="email"
          placeholder="Enter your email address"
          error={state.submissionAttempt && state.email.error}
          errorMessage={"email is required"}
          value={state.email.value}
          handleOnChange={handleChange("email")}
        />
        <InputText
          name="password"
          type="password"
          placeholder="Enter your password"
          error={state.submissionAttempt && state.password.error}
          errorMessage={"Please enter your password"}
          value={state.password.value}
          handleOnChange={handleChange("password")}
        />
        <PageLogButton
          title="Register"
          onClick={handleSubmit}
          loading={isloading}
        />
      </Box>

      <Box></Box>

      <div></div>
    </Container>
  );
}

const styles = {
  container: (theme: Theme) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",

    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      paddingTop: 10,
    },

    [theme.breakpoints.up("xl")]: {
      flexDirection: "row",
      paddingTop: 25,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingTop: 5,
      gap: 3,
    },
  }),
  welcome: (theme: Theme) => ({
    fontWeight: "bold",
    fontStyle: "italic",
    color: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      fontSize: "80px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  }),
  subtitle_container: (theme: Theme) => ({
    width: "100%",
    display: "flex",
    flexDirection: "row",
  }),
  subtitle: (theme: Theme) => ({
    fontWeight: "bold",
    color: theme.palette.mode === "dark" ? grey[500] : grey[600],

    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    },
  }),

  leftComponent: (theme: Theme) => ({
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      alignItems: "center",
    },
  }),
  leftIcon: (theme: Theme) => ({
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      position: "absolute",
      width: "50%",
    },
  }),
  img_m: (theme: Theme) => ({
    width: "150px",
    height: "150px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  }),
  img: (theme: Theme) => ({
    width: "250px",
    height: "250px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      marginLeft: 50,
      marginTop: -20,
    },
  }),
  rightComponent: (theme: Theme) => ({
    width: "40%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,

    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      gap: 1,
    },
  }),
  forgot_password: (theme: Theme) => ({
    fontSize: "14px",
    color: theme.palette.mode === "dark" ? blue[500] : blue[400],
    [theme.breakpoints.up("sm")]: {},
    [theme.breakpoints.down("sm")]: {},
  }),
  divider: (theme: Theme) => ({
    borderStyle: "dashed",
    width: "45%",
    height: "2px",
  }),
  indicator: (theme: Theme) => ({
    color: grey[600],
  }),
};
