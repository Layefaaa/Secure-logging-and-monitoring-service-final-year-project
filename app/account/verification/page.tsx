"use client"
import { Container, Theme } from "@mui/material";
import Image from "next/image";
import { Label } from "./../../component/Label";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthApi } from "@/app/services/auth";
import { clientIp } from "@/app/lib/getClientIp";
import { handleClientResponse } from "@/app/lib/common";
import {InfoType, useProvider } from "@/app/storage/Provider";
import toast from "react-hot-toast";
export default function Verification() {
  const params = useSearchParams();
  const { setUser,setAccessData } = useProvider();
  const hasRunRef = useRef(false);
  const router = useRouter();
  const [cIp, setClientIp] = useState();
  useEffect(() => {
    if (hasRunRef.current) return;
    const verifyAccount = async () => {
      try {
        const token = params.get("t");
        if (token) {
          const ip = await clientIp();
          setTimeout(async () => {
            const response = await AuthApi.verifyAccount(token, ip);
            if (response) {
              setAccessData(response.info as unknown as InfoType);
              if(response.status === 400){
                toast(response.msg??'Account verified already !', {
                  style: {
                    borderRadius: "8px",
                    background: "#1a1621",
                    color: "#fff",
                  },
                });
                router.push("/");
            
              }else{
                console.log({ddd:response})
                handleClientResponse({
                  status: response.status as number,
                  message: {
                    secure: response.msg,
                    unsecure: "Access Blocked",
                  },
                  callback: () => router.push("/access"),
                });
              }
              if(response.user){
                setUser(response.user);
              }
             
            }
          }, 2000);

          setClientIp(ip);
        }
      } catch (error) {
        console.error("Verification error:", error);
      }
    };

    verifyAccount();
    hasRunRef.current = true;
  }, [params]);

  return (
    <Container sx={styles.container}>
      <Image
        style={styles.verify_icon}
        alt="verify"
        src={"/images/verification.gif"}
        width={100}
        height={100}
      />
      <Label sx={styles.label}>Just a minute</Label>
      <Label sx={styles.title}>Verifying your account</Label>
      {cIp && <Label sx={styles.client}>user [{cIp}]</Label>}
    </Container>
  );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    gap: 2,
  },
  label: (theme: Theme) => ({
    fontSize: "18px",
    fontWeight: "500",
    color: theme.palette.text.primary,
  }),
  title: (theme: Theme) => ({
    fontSize: "20px",
    fontWeight: "600",
    color: theme.palette.text.primary,
  }),
  verify_icon: {
    borderRadius: 50,
  },
  client: {
    color: "green",
    marginTop: 20,
  },
};
