import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function AddFlat() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        user_type: '',
        block: '',
        flat_no: '',
        flat_image: '',
    });

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            flat_image: file,
        })
    }
    const onChangeHandler = (event: any) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newFormData = new FormData();
        newFormData.append("user_type", formData.user_type);
        newFormData.append("block", formData.block);
        newFormData.append("flat_no", formData.flat_no);
        newFormData.append("flat_image", formData.flat_image);
        axios.post(`/flats/add-flat`, newFormData, {headers: {"Authorization": `Bearer ${token}`}}).then((response) => {
            console.log('File Uploaded');
        }).catch((error) => {
            alert(error);
        }).finally(() => {
            setFormData({
                user_type: '',
                block: '',
                flat_no: '',
                flat_image: '',
            })
        })
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
            <Button sx={{m: 5}} onClick={() => navigate('/')} variant="contained" startIcon={<HomeIcon/>}>
                Home
            </Button>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Box sx={{mt: 1}}>
                    <TextField
                        name="flat_no"
                        required
                        type='number'
                        fullWidth
                        id="flat_no"
                        label="Flat No"
                        autoFocus
                        value={formData.flat_no || ''}
                        onChange={onChangeHandler}
                    />
                    <br/>
                    <br/>
                    <TextField
                        required
                        fullWidth
                        id="Block"
                        label="Block"
                        name="block"
                        value={formData.block || ''}
                        onChange={onChangeHandler}
                    />
                    <br/>
                    <br/>
                    <FormControl required fullWidth>
                        <InputLabel>User Type</InputLabel>
                        <Select onChange={onChangeHandler} value={formData.user_type || ''}
                                label="User Type *"
                                name='user_type'>
                            <MenuItem value='owner'>Owner</MenuItem>
                            <MenuItem value='tenant'>Tenant</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <TextField fullWidth type="file" onChange={handleFileChange}/>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Submit
                    </Button>


                </Box>
            </form>
        </Box>


    )
}

export default AddFlat;