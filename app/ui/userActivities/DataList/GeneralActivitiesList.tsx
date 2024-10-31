import { useState } from "react";
import { Gauge } from '@mui/x-charts/Gauge';

interface Option {
  value: string;
  label: string;
}
import { Box, Stack } from "@mui/material";
import TableHeaderBody from "./Header";
import TableBody from "./Row";
import TableBase from "@/app/component/Table";
import { AuthActivitiesTy } from "../type";
import { Label } from "@/app/component/Label";
import { SelectFilter } from "@/app/component/SelectFilter";
import { InputText } from "@/app/component/InputText";

export interface TableProps {
  data: AuthActivitiesTy[];
  itemsPerPage?: number;
  pagesPerStep?: number;
  bodyComponent?: JSX.Element;
  headComponent?: JSX.Element;
}

const GeneralActivitiesList = ({
  data,
  itemsPerPage = 8,
  pagesPerStep = 9,
}: TableProps) => {
  const [pageData, setPageData] = useState<AuthActivitiesTy[]>(
    data.slice(0, itemsPerPage)
  );

  const endPoints = data.map((content) => content.endpoint);
  const uniqueEndpoints = Array.from(new Set(endPoints));

  // Create the options array with unique endpoints and an 'all' option
  const options: Option[] = [
    { value: "all", label: "all" },
    ...uniqueEndpoints.map((target) => ({
      value: target ?? "",
      label: target ?? "",
    })),
  ];

    // Apply the filter based on both endpoint and user
    const applyFilter = ({
        endpoint,
        user,
      }: {
        endpoint: string;
        user: string;
      }) => {
        let filteredData = data;
        if(endpoint === "all") {
            filteredData = data.filter((item) => item.endpoint);
        }
        // Filter by endpoint
        if (endpoint !== "all") {
          filteredData = filteredData.filter((item) => item.endpoint === endpoint);
        }
      
        // Filter by user (email)
        if (user) {
          filteredData = filteredData.filter((item) =>
            item.email.toLowerCase().includes(user.toLowerCase())
          );
        }
    
        setPageData(filteredData);
      };
    
  const [endPoint, selectEndpoint] = useState<Option>(options[0]);
  const [user, selectUser] = useState<string>('');
  const handleSelectEndpoint = (value: string) => {
    applyFilter({endpoint: value,user:user});
    selectEndpoint({ value, label: value });
  };
  const handleUserSelect=(value:string)=>{
    applyFilter({user: value,endpoint:endPoint.value});
    selectUser(value)
  }
  return (
    <Box sx={styles.container}>
      <Box>
        <Box sx={styles.filter}>
          <Label>Filter</Label>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Label>Endpoint</Label>
                <SelectFilter
                  value={endPoint.value}
                  items={options}
                  onChange={handleSelectEndpoint}
                />
              </Stack>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Label>By user</Label>
                <InputText
                  isSmall
                  name="userName"
                  placeholder="email"
                  //   value={state.lastname.value}
                  handleOnChange={handleUserSelect}
                />
              </Stack>
            </Stack>
       
        </Box>
      </Box>
      <TableBase
        outlined={false}
        data={data}
        itemsPerPage={itemsPerPage}
        pagesPerStep={pagesPerStep}
        body={
          <TableBody
            data={pageData}
            selectedData={[]}
            onClickHandler={() => {}}
          />
        }
        header={<TableHeaderBody />}
        emptyRowText={"no data available"}
        updateTablehandler={setPageData}
      />
    </Box>
  );
};

export default GeneralActivitiesList;

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  filter:{
    padding: "10px",
  }
};
