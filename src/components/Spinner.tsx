import React, {FC} from "react";
import {Box, CircularProgress} from "@mui/material";

const Spinner: FC = () => {
    return(
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            margin: '0 auto'
        }}>
            <CircularProgress />
        </Box>
    )
}

export default Spinner;