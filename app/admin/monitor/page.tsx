"use client";
import { Box, Container, Stack, Theme } from "@mui/material";
import { Label } from "../../component/Label";
import { useEffect, useState } from "react";
import { AuthApi } from "../../services/auth";
import { IStatusCodeCounter, UserLogger } from "@/server/cluster/schema.interfaces";
import UserActivitiesListData from "@/app/ui/userActivities/DataList";
import { AuthActivitiesTy, EndPointCallTy } from "@/app/ui/userActivities/type";
import { formatDate } from "@/app/lib/formatDate";
import { HealthCheck } from "@/app/ui/healthCheck";
import { Tabs } from "@/app/component/Tabs";
import AccountDataList from "@/app/ui/accounts/DataList";
import LoggerSkeleton from "@/app/component/loading/LoggerSkeleton";
import UsersSkeleton from "@/app/component/loading/UserSkeleton";

export default function Monitor() {
  const pages=[
    {
      label:"Activities",
      component:<ActivitiesPage/>
    },
    {
      label:"Users",
      component:<AccountsPage/>
    },
  ]
  const [tab,setTab]=useState(0);
  const handleTabChange=(index:number)=>{
    setTab(index);
  }
  

  return (
    <Container sx={styles.container}>
     <Tabs items={pages} onChange={handleTabChange} active={tab}/>
    </Container>
  );
}

const ActivitiesPage=()=>{
  const [state, setState] = useState<AuthActivitiesTy[]>([]); 
  const [endPointCalls,setEndpointCalls]=useState<EndPointCallTy[]>([])
  const [statusCodeCounters, setStatusCodeCounters] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthApi.fetchUserActivities();
        const activitiesTx = response.map((data: UserLogger) => {
          return {
            region: data.info?.region,
            email: data.email,
            endpoint: data.endpoint,
            ip: data.info?.ip,
            location:`lat- ${data.info?.client_location?.latitude} ~ long- ${data.info?.client_location?.latitude} ` ,
            method: data.method,
            status: data.status,
            date: formatDate(data.createdAt as unknown as string),
          };
        });
        setState(activitiesTx);
      } catch (error) {
        console.error("Error fetching user activities:", error);
      } finally {
      }
    };

    fetchData(); // Fetch data immediately when the component mounts

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);


  useEffect(() => {
    const fetchRequestCounter = async () => {
      try {
        const response = await AuthApi.fetchApiCall();
        const activitiesTx :EndPointCallTy[]= response.map((data: IStatusCodeCounter) => {
          return {
          endpoint:data.endpoint,
          statusCodes:data.statusCodes
          };
        });
        setEndpointCalls(activitiesTx);
      } catch (error) {
        console.error("Error fetching user activities:", error);
      } finally {
      }
    };

    fetchRequestCounter(); 
    const intervalId = setInterval(() => {
      fetchRequestCounter(); // Fetch data every 10 seconds
    }, 2000);
    return () => clearInterval(intervalId); 
  }, []);



  useEffect(() => {
    setStatusCodeCounters(new Map())
    endPointCalls.forEach((endPointCall) => {
        Object.entries(endPointCall.statusCodes).map(([key, value]) =>{
          setStatusCodeCounters((prevMap) => {
            const newMap = new Map(prevMap); 
              const currentValue = newMap.get(Number(key)) || 0;
              newMap.set(Number(key), currentValue + value);
            return newMap; 
          })
      });
  
    });
  }, [endPointCalls]);
  
  const hasData=state.length > 0;
  if(!hasData){
    return <LoggerSkeleton/>
  }
  return(
    <Box sx={styles.page}>
        <Label sx={styles.header}>Health checks</Label>
      <HealthCheck data={statusCodeCounters}/>
      <Label sx={styles.header}>User Activities</Label>
        <Box>{state.length > 0 && <UserActivitiesListData data={state} />}</Box>
    </Box>

  )
}












const AccountsPage=()=>{
  const [state, setState] = useState<any[]>([]); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthApi.getAccounts();
   
        setState(response);
      } catch (error) {
        console.error("Error fetching user activities:", error);
      } finally {
      }
    };

    fetchData(); // Fetch data immediately when the component mounts

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);


  
  const hasData=state.length > 0;
  if(!hasData){
    return <UsersSkeleton/>
  }
  
  return(
    <Box sx={styles.page}>
        <Label sx={styles.header}>Accounts</Label>
        <Box>{state.length > 0 && <AccountDataList data={state} />}</Box> 
    </Box>

  )
}

const styles = {
  container: (theme: Theme) => ({
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "40px 0px",

  }),
  page:{
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px 0px",
    gap: 5,
  },
  header: {
    fontSize: 30,
  },
  section: (theme: Theme) => ({
    width: "98%",
    height: 500,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    borderRadius: 3,
    padding: "10px",
    overflowY: "auto",
  }),
};
