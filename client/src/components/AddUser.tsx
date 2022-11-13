import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import HomeIcon from "@mui/icons-material/Home";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

function AddUser() {
    const navigate = useNavigate();
    const {flatId} = useParams();
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        name: '',
        age: undefined,
        gender: '',
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const config = {headers: {"Authorization": `Bearer ${token}`}};
        axios.post(`/user/add-new-user?flat=${flatId}`, formData, config).then(response => {
            console.log(response);
        }).catch(err => {
            alert(err.message)
        }).finally(() => {
            setFormData({
                name: '',
                age: undefined,
                gender: '',
            })
        });
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Button onClick={() => navigate('/')} variant="contained" startIcon={<HomeIcon/>}>
                Home
            </Button>
            <form onSubmit={handleSubmit}>
                <Box sx={{mt: 3, maxWidth: 400}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                value={formData.name || ''}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                id="age"
                                label="Age"
                                name="age"
                                autoComplete="age"
                                value={formData.age || ''}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl required fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select onChange={handleChange} value={formData.gender || ''}
                                        label="Gender *"
                                        name='gender'>
                                    <MenuItem value='male'>Male</MenuItem>
                                    <MenuItem value='female'>Female</MenuItem>
                                    <MenuItem value='others'>Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Add
                    </Button>

                </Box>
            </form>
        </Box>
    )
}


export default AddUser;