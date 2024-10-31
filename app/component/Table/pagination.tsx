import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { colorTheme } from '@/app/styles/colorTheme';
import { grey } from '@mui/material/colors';

export interface PaginationProps {
    data: any;
    itemsPerPage?: number;
    pagesPerStep?: number;
    updateTable?: (data: any) => void;
}

interface paginationIconProps {
    active: boolean;
    onClickHandler: () => void;
}

interface PaginationItemProps {
    onClickHandler: () => void;
    active: boolean;
    page: number;
}
export const Pagination = ({ data, itemsPerPage = 10, pagesPerStep = 5, updateTable }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const totalSteps = Math.ceil(totalPages / pagesPerStep);

    const getCurrentStep = () => Math.ceil(currentPage / pagesPerStep);

    const handleClick = (page: number) => {
        setCurrentPage(page);
    };

    const handlePrevious = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const handlePreviousStep = () => {
        const currentStep = getCurrentStep();
        const newPage = Math.max((currentStep - 2) * pagesPerStep + 1, 1);
        setCurrentPage(newPage);
    };

    const handleNextStep = () => {
        const currentStep = getCurrentStep();
        const newPage = Math.min(currentStep * pagesPerStep + 1, totalPages);
        setCurrentPage(newPage);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);
    const currentStep = getCurrentStep();
    const startPage = (currentStep - 1) * pagesPerStep + 1;
    const endPage = Math.min(currentStep * pagesPerStep, totalPages);

    useEffect(() => {
        if (updateTable) updateTable(currentData);
    }, [currentPage]);

    if (data.length === 0) return null;
    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ width: '100%', marginTop: '36px', marginBottom: '10px' }}
        >
            <Stack
                direction='row'
                justifyContent={'space-between'}
                sx={{ width: '396px' }}
            >
                <RenderPreviousSkipIcon
                    onClickHandler={handlePreviousStep}
                    active={currentStep === 1}
                />
                <RenderPreviousIcon
                    active={currentPage === 1}
                    onClickHandler={handlePrevious}
                />
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page, index) => (
                    <RenderItem
                        key={page}
                        page={page}
                        active={page === currentPage}
                        onClickHandler={() => handleClick(page)}
                    />
                ))}

                <RenderNextIcon
                    active={currentPage === totalPages}
                    onClickHandler={handleNext}
                />
                <RenderNextSkipIcon
                    onClickHandler={handleNextStep}
                    active={currentStep === totalSteps}
                />
            </Stack>
        </Box>
    );
};

const RenderItem = ({ onClickHandler, active, page }: PaginationItemProps) => {
    return (
        <IconButton onClick={onClickHandler}>
            <Typography
                sx={{
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: active ? grey[400] : 'transparent',
                    borderRadius: '50%',
                    color: active ? grey[700] : 'grey',
                    textAlign: 'center',
                    fontFeatureSettings: "'clig' off, 'liga' off",
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '143%', // or "20.02px"
                    letterSpacing: '0.17px',
                }}
            >
                {page}
            </Typography>
        </IconButton>
    );
};

const RenderPreviousSkipIcon = ({ active, onClickHandler }: paginationIconProps) => {
    return (
        <IconButton onClick={onClickHandler}>
            <SkipPreviousIcon color={active ? 'disabled' : 'action'} />
        </IconButton>
    );
};
const RenderNextSkipIcon = ({ active, onClickHandler }: paginationIconProps) => {
    return (
        <IconButton onClick={onClickHandler}>
            <SkipNextIcon color={active ? 'disabled' : 'action'} />
        </IconButton>
    );
};
const RenderPreviousIcon = ({ active, onClickHandler }: paginationIconProps) => {
    return (
        <IconButton onClick={onClickHandler}>
            <NavigateBeforeIcon color={active ? 'disabled' : 'action'} />
        </IconButton>
    );
};
const RenderNextIcon = ({ active, onClickHandler }: paginationIconProps) => {
    return (
        <IconButton onClick={onClickHandler}>
            <NavigateNextIcon color={active ? 'disabled' : 'action'} />
        </IconButton>
    );
};
