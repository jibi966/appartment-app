import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © Apartment Management'}
            {" "}
            {new Date().getFullYear()}
        </Typography>
    );
}

const theme = createTheme();

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        axios.post(`/register`, formData).then((response) => {
            console.log(response);
            if (response.data.error) {
                alert(response.data.message);
            } else {
                navigate(`/log-in`);
            }
        }).catch((error) => {
            alert("User Already Registered");
        }).finally(() => {
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            });
        });
    };

    const onChangeHandler = (event: any) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box display="flex" justifyContent="center" alignContent="center" alignItems="center" gap={2} p={2}>
                    <Button onClick={() => navigate('/')} variant="contained" startIcon={<HomeIcon/>}>
                        Home
                    </Button>
                </Box>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="first_name"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={formData.first_name || ''}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="last_name"
                                        autoComplete="family-name"
                                        value={formData.last_name || ''}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email || ''}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={formData.password || ''}
                                        onChange={onChangeHandler}
                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/log-in" variant="body2">
                                        Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}