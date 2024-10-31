import { HeaderCell } from '@/app/component/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


interface HeadCell {
    id: string;
    label: string;
    align?: 'left' | 'center' | 'right' | 'inherit' | 'justify' | undefined;
}



const TableHeaderBody = () => {
    return (
        <>
            <Header headLabel={HeaderData} />
        </>
    );
};

export default TableHeaderBody;


function Header({ headLabel }: usersTableHeadProps) {
    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell: HeadCell) => (
                    <HeaderCell
                        sx={{ color: 'dark' }}
                        key={headCell.id}
                        align={headCell.align || 'left'}
                    >
                        {headCell.label}
                    </HeaderCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
interface usersTableHeadProps {
    headLabel: { id: string; label: string; align?: 'center' | 'left' | 'right' }[];
}
const HeaderData = 
    [
       
        { id: 'email', label: 'email' },
        { id: 'name', label: 'name' },
        { id: 'region', label: 'last region' },
        { id: 'ip', label: 'last-client IP  '},
        { id: 'location', label: 'last client location'},
        { id: 'date', label: 'last joined' },

    ]

    