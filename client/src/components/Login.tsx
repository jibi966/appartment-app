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

export default function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setLoading(true);
        axios.post(`/login`, formData).then((response) => {
            localStorage.setItem('token', response.data.token);
            navigate('/');
        }).catch((error) => {
            alert('Please Provide a valid email address or password');
        }).finally(() => {
            setFormData({
                email: '',
                password: '',
            });
            setLoading(false);
        });
    };

    const onChangeHandler = (event: any) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box display="flex" justifyContent="center" alignContent="center" alignItems="center" gap={2} p={2}>
                    <Button disabled={loading} onClick={() => navigate('/')} variant="contained"
                            startIcon={<HomeIcon/>}>
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
                        Sign in
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email}
                                onChange={onChangeHandler}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={onChangeHandler}
                            />

                            <Button
                                disabled={loading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                {loading ? "Loading.." : "Sign In"}
                            </Button>

                            <Grid display='flex' p={1} justifyContent="flex-end">
                                {/*<Link href="#" variant="body2">*/}
                                {/*    Forgot password?*/}
                                {/*</Link>*/}
                                {/*may be in future*/}
                                <Link href="/create-account" variant="body2">
                                    {"Don't have an account?"}
                                </Link>
                            </Grid>
                        </Box>
                    </form>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}