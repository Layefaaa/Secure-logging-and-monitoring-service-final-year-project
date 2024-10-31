import TableRow from "@mui/material/TableRow";
import { RowCell } from "@/app/component/Table";
import { UserTy } from "../type";
import { colorTheme } from "@/app/styles/colorTheme";
import { formatDate } from "@/app/lib/formatDate";
import { useRouter } from "next/navigation";

interface TRowProps extends UserTy {
  selected?: boolean;

}

export function BaseTableRow({
    selected,
    info,
    email,
    firstname,
    lastname,
    image,
createdAt,
_id
  }: TRowProps) {
const router=useRouter();
    const clientGeoLocation = info && ('lat-'+ info.client_location?.latitude +' '+ 'long-'+ info.client_location?.longitude)
    const handleOnClick=()=>{
router.push(`/account/${_id}`)
    }
    return (
   
        <TableRow onClick={handleOnClick}
          sx={{
            width: '100% !important',
            "&.MuiTableRow-hover:hover": {
              backgroundColor: "rgba(130, 113, 234, 0.08)",
            },
          }}
          hover
        >
          <RowCell component="th" scope="row" padding="none" align="left">
            {email}
          </RowCell>
  
          <RowCell>{firstname +' '+ lastname}</RowCell>
          <RowCell>{info?.country_code + "~"+ info?.region + info?.emoji_flag}</RowCell>
          <RowCell sx={{ color:info?.fraud_flag==0?  colorTheme.status[200] :colorTheme.status[403] }}>{info ?info.ip:''}</RowCell>
          <RowCell>{clientGeoLocation}</RowCell>
          <RowCell>
            {formatDate(createdAt)}
          </RowCell>
        </TableRow>
       

    );
  }




interface TableBodyProps {
  data: UserTy[];
  selectedData: number[];
}
const TableBody = ({
  data,
  selectedData = [],
}: TableBodyProps) => {
  return (
    <>
      {data.map((row, index) => (
          <BaseTableRow
          key={index}
          {...row}
            selected={selectedData.indexOf(index) !== -1}
          
          />
      ))}
    </>
  );
};

export default TableBody;
