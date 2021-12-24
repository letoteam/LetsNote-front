import React from 'react';
import {Box, Container, Typography, Button} from '@mui/material';
import { Link } from "react-router-dom";


const Welcome = (props:any) => {
    return (
        <Container maxWidth={"lg"}>
            <Box sx={{
                display: 'flex',
                height: '90vh',
                mt: '100px',
                alignItems: 'flex-start'
            }}>
                <Box sx={{
                    minWidth: '500px',
                    width: '500px'
                }}>
                    <Typography
                        variant="h1"
                        component={'h1'}
                        fontSize={"5.5rem"}
                        sx={{
                            mb: '20px'
                        }}
                    >
                        The <span className={'accent-primary'}>simplest</span> way to keep notes
                    </Typography>

                    <Typography
                        variant={"h6"}
                        component={'p'}
                    >
                        Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        mt: '35px',
                    }}>
                        <Button variant="contained" size="large">
                            <Link to={'/sign-up'} className={'welcome-button'}>Try it now</Link>
                        </Button>
                    </Box>

                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <img className={"welcome-img"} src="img/welcome.jpg" alt="lets note"/>
                </Box>

            </Box>
        </Container>
    )
};

export default Welcome;