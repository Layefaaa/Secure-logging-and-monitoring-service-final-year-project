import TableRow from "@mui/material/TableRow";
type CrudTy = "POST" | "PUT" | "DELETE" | "GET";
import { RowCell } from "@/app/component/Table";
import { AuthActivitiesTy } from "../type";
import { colorTheme } from "@/app/styles/colorTheme";
import { StatusCodeTy } from "@/app/utils/types";

interface TRowProps extends AuthActivitiesTy {
  selected?: boolean;
  handleClick?: () => void;
}

export function BaseTableRow({
    selected,
    region,
    email,
    endpoint,
    ip,
    location,
    method,
    status,
    date,
  }: TRowProps) {

    return (
   
        <TableRow
          sx={{
            width: '100% !important',
            "&.MuiTableRow-hover:hover": {
              backgroundColor: "rgba(130, 113, 234, 0.08)",
            },
          }}
          hover
        >
          <RowCell component="th" scope="row" padding="none" align="left">
            {region}
          </RowCell>
  
          <RowCell>{email}</RowCell>
          <RowCell sx={{ color:status==403?  colorTheme.status[status as StatusCodeTy] :'',fontWeight:status==403?  '700' :'400' }}>{ip}</RowCell>
          <RowCell>{location}</RowCell>
          <RowCell sx={{ color: colorTheme.crud[method as CrudTy] }}>
            {endpoint}{" "}
          </RowCell>
          <RowCell sx={{ color: colorTheme.crud[method as CrudTy] }}>
            {method}
          </RowCell>
          <RowCell sx={{ color: colorTheme.status[status as StatusCodeTy] }}>
            {status}
          </RowCell>
          <RowCell>{date}</RowCell>
        </TableRow>
       

    );
  }



interface TableBodyProps {
  data: AuthActivitiesTy[];
  selectedData: number[];
  onClickHandler: (_target: number) => void;
}
const TableBody = ({
  data,
  selectedData = [],
  onClickHandler,
}: TableBodyProps) => {
  return (
    <>
      {data.map((row, index) => (
          <BaseTableRow
            key={index}
            {...row}
            selected={selectedData.indexOf(index) !== -1}
            handleClick={() => {
              onClickHandler(index);
            }}
          />
   
      ))}
    
    </>
  );
};

export default TableBody;
