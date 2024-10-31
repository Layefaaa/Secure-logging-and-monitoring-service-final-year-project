import { Checkbox, TableCell, TableCellProps, Theme, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export interface tableCellProps extends TableCellProps {
    text?: string;
}

export interface headerProps {
    id: string;
    label: string;
    align?: 'center' | 'left' | 'right';
}

export const RowCell = ({ text, sx, padding, ...props }: tableCellProps) => {
    return (
        <TableCell
            padding='none'
            {...props}
            sx={[styles.cell,...(Array.isArray(sx) ? sx:[sx])]}
        >
            {props.children}
        </TableCell>
    );
};

export const HeaderCell = ({ text, sx, ...props }: tableCellProps) => {
    return (
        <TableCell
            padding='none'
            {...props}
            sx={[styles.header,...(Array.isArray(sx) ? sx : [sx])]}
        >
            {props.children}
        </TableCell>
    );
};

const styles={
    header:(theme:Theme)=>({
        color: '#7566D3',
        backgroundColor: theme.palette.mode==="light" ? '#EFF2F5' :grey[300] ,
        borderColor: '#D6DDE5',
        fontFeatureSettings: "'clig' off, 'liga' off",
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '24px', // or 1.71429 for relative units
        letterSpacing: '0.17px',
        padding: '8px',
      
    })

    ,
    cell:(theme:Theme)=>(
        {
            borderColor: 'transparent',
            color: theme.palette.mode==="light"? '#232423' :grey[500],
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: '143%', // or '20.02px' based on your preference
            letterSpacing: '0.138px',
            padding: '16px 8px',
            cursor:'pointer'
          
        })
    
}