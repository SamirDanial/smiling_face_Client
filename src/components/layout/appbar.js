import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Appbar = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Smiling Face
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>Models</Button>
                    <Button color="inherit" onClick={() => navigate('/createmodel')}>Create</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Appbar;
