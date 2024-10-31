import { useState } from "react";
import { Box, Stack } from "@mui/material";
import TableHeaderBody from "./Header";
import TableBody from "./Row";
import TableBase from "@/app/component/Table";
import { UserTy } from "../type";
import { Label } from "@/app/component/Label";

import { InputText } from "@/app/component/InputText";

export interface TableProps {
  data: UserTy[];
  itemsPerPage?: number;
  pagesPerStep?: number;
  bodyComponent?: JSX.Element;
  headComponent?: JSX.Element;
}

const AccountDataList = ({
  data,
  itemsPerPage = 8,
  pagesPerStep = 9,
}: TableProps) => {
  const [pageData, setPageData] = useState<UserTy[]>(
    data.slice(0, itemsPerPage)
  );
    // Apply the filter based on both endpoint and user
    const applyFilter = ({
        user,
      }: {
        user: string;
      }) => {
        let filteredData = data;
        // Filter by user (email)
        if (user) {
          filteredData = filteredData.filter((item) =>
            item.email.toLowerCase().includes(user.toLowerCase())
          );
        }
        setPageData(filteredData);
      };
  const [user, selectUser] = useState<string>('');
  const handleUserSelect=(value:string)=>{
    applyFilter({user: value});
    selectUser(value)
  }
  return (
    <Box sx={styles.container}>
      <Box>
        <Box sx={styles.filter}>
          <Label>Filter</Label>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
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
          />
        }
        header={<TableHeaderBody />}
        emptyRowText={"no data available"}
        updateTablehandler={setPageData}
      />
    </Box>
  );
};

export default AccountDataList;

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
