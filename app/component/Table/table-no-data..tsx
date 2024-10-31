import { Box, Typography } from '@mui/material';
// ----------------------------------------------------------------------

export function TableNoData({ emptyRows, text }: { emptyRows: number; text: string }) {
    if (emptyRows !== 0) {
        return null;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                width: '1085px',
                height: '53px',
                padding: '20px',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography
                sx={{
                    color: 'rgba(189, 192, 198, 1)',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '143%',
                    letterSpacing: '0.138px',
                }}
            >
                {text}
            </Typography>
        </Box>
    );
}
