
import { Label } from "@/app/component/Label";
import { Box, Stack, Theme } from "@mui/material"
import {GaugeContainer,
    GaugeValueArc,
    GaugeReferenceArc,useGaugeState, 
    gaugeClasses} from "@mui/x-charts/Gauge"
import { useEffect, useState } from "react";
import { colorTheme } from "@/app/styles/colorTheme";
import { statusText } from "../userActivities/type";
import { StatusCodeTy } from "@/app/utils/types";
import { grey } from "@mui/material/colors";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();
  if (valueAngle === null) {
    // No value to display
    return null;
  }
  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

const getPercentage = (total: number, value?: number) => {
  if (total === 0) return 0; // Prevent division by zero
  return (value ?? 0) / total * 100;
}
interface HealthCheckTy{
  data:Map<number,number>
}
export const HealthCheck:React.FC<HealthCheckTy>=({data})=>{
  const [total_request,setRequest]=useState<number>(0)
  const keys = Array.from(data.keys()); 

  useEffect(()=>{
    setRequest(0);
    data.forEach((value, key) => {
      setRequest((prev)=>{
        return prev + value;
      })
    });

  },[data])

    return(
        <Box>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 5 }}>
        {keys.map((key, index) => (
          <GaugeBox key={index} value={getPercentage(total_request,data.get(key))} status={key} requests={data.get(key) ??0} /> // Passing the value to GaugeBox
        ))}
    </Stack>
        </Box>
    )
}



// Wrapper component for GaugeValueArc
const StyledGaugeValueArc = ({status }:{status:number}) => {
  return (
    <Box
  
      component={GaugeValueArc}
      sx={{
        fill: `${colorTheme.status[status as StatusCodeTy]} !important`, // Apply fill color based on status
      }}
    />
    
  );
};

const GaugeBox = ({ value, status, requests }: { value: number; status: number; requests: number; }) => {
  const styles=getStyles(status)
  return (
    <Stack direction={"column"} spacing={1} alignItems={"center"}>
      <GaugeContainer
        width={200}
        height={200}
        startAngle={-110}
        endAngle={110}
        value={value}
        aria-labelledby="battery_level_label"
      >
        <GaugeReferenceArc />
        <StyledGaugeValueArc status={status} /> 
        <GaugePointer />
      </GaugeContainer>
      <Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Label sx={styles.label}>Status</Label>
          <Label sx={styles.indicator}> {statusText[status as StatusCodeTy]}</Label>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Label sx={styles.label}>Code</Label>
          <Label>{status}</Label>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Label sx={styles.label}>Total requests</Label>
          <Label>{requests}</Label>
        </Stack>
      </Stack>
    </Stack>
  );
};


const getStyles=(status:number)=>{
  return{

    indicator:(theme:Theme)=>({
      fontFamily: "Pretendard",
      fontWeight:'600',
      color:colorTheme.status[status as StatusCodeTy],
      // theme.palette.mode ==="light" ? grey[900]:grey[100],
      fontSize: "15px",
    })
,
  label:(theme:Theme)=>({
    fontFamily: "Pretendard",
    color:theme.palette.mode ==="light" ? grey[700]:grey[600],
    fontSize: "15px",
  })
}}