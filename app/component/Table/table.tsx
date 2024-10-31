import { Box } from '@mui/material';
import Card from '@mui/material/Card';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Pagination } from './pagination';
import { TableNoData } from './table-no-data.';
export interface TableProps {
    data?: any[];
    itemsPerPage?: number;
    pagesPerStep?: number;
    body?: JSX.Element;
    header?: JSX.Element;
    controller?: JSX.Element;
    emptyRowText: string;
    updateTablehandler?: (data: any[]) => void;
    outlined?: boolean;
}

export function TableBase({
    outlined = true,
    data,
    updateTablehandler,
    itemsPerPage = 9,
    pagesPerStep = 5,
    body,
    header,
    emptyRowText,
    controller,
}: TableProps) {
    return (
        <Box>
            <Card  sx={styles.card}>
                <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ width: '100%' }}>
                        {header}
                        <TableBody>{body}</TableBody>
                    </Table>
                </TableContainer>
                <TableNoData
                    emptyRows={data ? data.length : 0}
                    text={emptyRowText}
                />
            </Card>


            {data && data?.length > itemsPerPage && (
                <Pagination
                    data={data}
                    updateTable={updateTablehandler}
                    itemsPerPage={itemsPerPage}
                    pagesPerStep={pagesPerStep}
                />
            )}
        </Box>
    );
}

const styles={
card:{
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 10px 50px",
}
}