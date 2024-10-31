"use client";
import { AuthApi } from "@/app/services/auth";
import { useEffect, useState } from "react";
import { Box, Theme, Stack, Divider, Button, CircularProgress } from "@mui/material";
import { Label } from "@/app/component/Label";
import UserAvatar from "@/app/component/UserAvatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { formatDate } from "@/app/lib/formatDate";
import { grey, red,blue,green } from "@mui/material/colors";
import { AuthActivitiesTy } from "@/app/ui/userActivities/type";
import { UserLogger } from "@/server/cluster/schema.interfaces";
import { UserActivitiesList } from "@/app/ui/userActivities/DataList";
import UserDetailSkeleton from "@/app/component/loading/UserDetailSkeleton";
import { Tabs } from "@/app/component/Tabs";
import { InputText } from "@/app/component/InputText";
import { handleClientResponse } from "@/app/lib/common";

export default function UserPage({ params }: { params: { id: string } }) {
  const _id = params.id;
  const [state, setState] = useState<any>();
  const [tab,setTab]=useState(0);
  const handleTabChange=(index:number)=>{
    setTab(index);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthApi.getAccount(_id);
        setState(response);
      } catch (error) {
      } finally {
      }
    };
    fetchData(); // Fetch data immediately when the component mounts
    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);
  if (!state) {
    return <UserDetailSkeleton/>;
  }

  const pages=[
    {
      label:"Details",
      component:<UserDetails state={state}/>
    },
    {
      label:"User Management",
      component:<UserActions state={state}/>
    },
  ]

  return (
     <Tabs items={pages} onChange={handleTabChange} active={tab}/>
   
  
  );
}

const UserDetails=({state}:{state:any})=>{

  const [activities, updateActivities] = useState<AuthActivitiesTy[]>([]);
  const hasLogs = activities.length > 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state) {
          const response = await AuthApi.fetchUserActivities();
          const activitiesTx = response
            .filter((data: UserLogger) => data.email === state.email)
            .map((data: UserLogger) => {
              return {
                region: data.info?.region,
                email: data.email,
                endpoint: data.endpoint,
                ip: data.info?.ip,
                location: `lat- ${data.info?.client_location?.latitude} ~ long- ${data.info?.client_location?.latitude} `,
                method: data.method,
                status: data.status,
                date: formatDate(data.createdAt as unknown as string),
              };
            });

          updateActivities(activitiesTx);
        }
      } catch (error) {
      } finally {
      }
    };

    fetchData(); // Fetch data immediately when the component mounts

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [state]);


  return(
    <Box sx={styles.container} >
    <Stack direction={"row"} sx={styles.stack}>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <UserAvatar firstname={state.firstname} lastname={state.lastname} />
        <Box>
          <Label sx={styles.header}>
            {state.firstname + " " + state.lastname}
          </Label>
          <Label sx={styles.subtitle}>{state.email}</Label>
          <Label sx={styles.dateMobile}>{formatDate(state.createdAt)}</Label>
        </Box>
      </Stack>

      <Stack
        sx={styles.lastJoin}
        direction={"row"}
        alignItems={"center"}
        spacing={1}
      >
        <Label>{formatDate(state.createdAt)}</Label>
        <Box sx={styles.box}>
          <CalendarMonthIcon sx={styles.icon} />
        </Box>
      </Stack>
    </Stack>
    <Divider sx={styles.divider} />

    <Stack direction={"row"} alignItems={"center"} spacing={2}>
      <Label sx={styles.header}>Last seen location</Label>
      <Label sx={styles.subtitle}> @ {formatDate(state.updatedAt)}</Label>
    </Stack>
    <Box>
      <Label sx={styles.header}>Flag</Label>
      <Label sx={styles.subtitle}>
        {Number(state.flags) === 0 ? "Secured" : "InSecured"}
      </Label>
    </Box>

    <Stack direction={"row"} alignItems={"center"} spacing={3}>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Label sx={styles.header}>{state.info.emoji_flag}</Label>
        <Box>
          <Label sx={styles.header}>{state.info.continent_name}</Label>
          <Label sx={styles.subtitle}>{state.info.region}</Label>
          <Label sx={styles.subtitle}>{state.info.city}</Label>
        </Box>
      </Stack>
      <Box>
        <Label sx={styles.header}>IP Address ~ {state.info.ip}</Label>
        <Label sx={styles.subtitle}>
          longitude~ {state.info.client_location.longitude}
        </Label>
        <Label sx={styles.subtitle}>
          latitude ~ {state.info.client_location.longitude}
        </Label>
      </Box>
    </Stack>

    <Divider sx={styles.divider} />
    <Box>{hasLogs && <UserActivitiesList data={activities} />}</Box>
    <Box height={40}/>
  </Box>
  )
}

const UserActions=({state}:{state:any})=>{
  const [msg,setMsg]=useState('')
  const [buttonLoading,toggleButton]=useState(false)
  const [userAccessLoading,toggleAccessBtn]=useState(false)
  const handleChange=(value:string)=>{
    setMsg(value)
  }
  const handleSendMsg=async ()=>{
    try {
      toggleButton(true)
     const response= await AuthApi.sendNotification({
        id:state._id,
        msg
      });
if(response){
  handleClientResponse({
    status: response.status as number,
    message: {
      secure: response.msg,
      unsecure: "Access Blocked",
      unauthenticated:response.msg
    },
   
  });
}
      toggleButton(false)
      setMsg('')
    } catch (error) {
      console.log(error);
    }
  }


  const toggleUserAcces= async()=>{
    toggleAccessBtn(true)
  const response=await AuthApi.controlUser(state._id)
  toggleAccessBtn(false)
console.log({sss:response})
  }
  return(
    <Box sx={styles.container} >
       <Box>
          <Label sx={styles.header}>Status</Label>
          <Label sx={styles.subtitle}>{state.active===true ? 'Active' :'Blocked'}</Label>
        </Box>
        <Box>
          <Label sx={styles.header}>Hot action</Label>
         <ActionButton loading={userAccessLoading} active={state.active} onClick={toggleUserAcces} label={state.active===true ? `block ${state.firstname}` :`unblock ${state.firstname}`}/>
        </Box>
        <Divider sx={styles.divider} />

        <InputText
          name="msg"
          placeholder={`Type your notification message for ${state.firstname + " " + state.lastname} here ....`}
          value={msg}
          multiline
          minRows={15}
          handleOnChange={handleChange}
        />
        <Button disabled={buttonLoading} onClick={handleSendMsg} sx={styles.sendMsg}>
        {buttonLoading ? (
          <CircularProgress size={20} />
        ) :'Send message'}
          </Button>
    </Box>
  )
}


const ActionButton=({onClick,label,active,loading}:{label:string,onClick:()=>void,active:boolean ,loading:boolean})=>{
  const styles=btnStyles(active)
  return (<Button disabled={loading} sx={styles.button} onClick={onClick}> 
  
  {loading ? (
          <CircularProgress size={20} />
        ):
        label}
  
  
  </Button>)
}



const btnStyles=(active:boolean)=>
{ 
  return {
  button:(theme:Theme)=>({
    backgroundColor:active ? theme.palette.mode==="light" ? red[600] :red[600] : green[600],
    color:active  ? theme.palette.mode==="light" ? grey[200]:grey[300] :grey[100],
    textTransform:'none',
    width:120,
    borderRadius:3,
    marginTop:2,
    fontWeight:'600',
    boxShadow: "rgba(0, 0, 0, 0.26) 0px 22px 70px 4px",
    borderColor:active ? theme.palette.mode==="light" ? red[700] :red[700] : green[700],

    "&:focus": {
      backgroundColor:!active ? theme.palette.mode==="light" ? red[800] :red[800] : green[800],
    }
  }),
}}
const styles = {

  container: {
    marginTop: 5,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  icon:(theme:Theme)=>({
    color:theme.palette.mode=='light'? grey[600]:grey[400]
  }),
  sendMsg:(theme:Theme)=>({
    width:200,
    backgroundColor:theme.palette.mode==="light" ? blue[600] : grey[900],
    color:theme.palette.mode==="light" ? grey[100] : grey[100],
    textTransform:'none',
    borderRadius:3
  }),
 layout:{
  width: "100%",
  backgroundColor: "red",
  display: "flex",
  flexDirection: "column",
  gap: 5,

 },
  header: {
    fontSize: "18px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: "14px",
    fontWeight: "normal",
  },
  stack: (theme: Theme) => ({
    display: "flex",
    width: "100%",
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
    padding: 1,
    borderRadius: 3,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  }),
  box: (theme: Theme) => ({
    borderRadius: 5,
    width: "40px",
    height: "40px",
    backgroundColor: theme.palette.mode === "light" ? grey[200] : grey[900],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }),
  divider: (theme: Theme) => ({
    borderStyle: "dashed",
    width: "100%",
    height: "2px",
  }),
  lastJoin: (theme: Theme) => ({
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }),
  dateMobile: (theme: Theme) => ({
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      fontSize: "13px",
      color: theme.palette.mode === "light" ? grey[600] : grey[500],
    },
  }),
};
