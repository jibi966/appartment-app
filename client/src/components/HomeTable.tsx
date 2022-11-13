import * as React from 'react';
import {
    Box,
    Button,
    MenuItem,
    Select,
    TablePagination,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, FormControl, InputLabel, Typography
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import AddHomeIcon from '@mui/icons-material/AddHome';
import {useEffect} from "react";
import {
    getAllFlatsActionCall,
    clearAllFlatsAction,
    filterActionCall,
    sortActionCall,
    getAllFlatsAction, paginationActionCall
} from "../Redux/Home/actions";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";


function HomeTable() {
    const navigate: any = useNavigate();
    const dispatch: any = useDispatch();

    const {flats} = useSelector((store: any) => store.HomeReducer.allFlats);
    const {countFlats} = useSelector((store: any) => store.HomeReducer.allFlats);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const isToken = !!localStorage.getItem('token');
    const authToken = localStorage.getItem('token');

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        dispatch(paginationActionCall(authToken));
    }, [page, rowsPerPage])

    const Logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    useEffect(() => {
        dispatch(getAllFlatsActionCall(authToken));
        return () => {
            dispatch(clearAllFlatsAction());
        }

    }, []);

    const handleFilterChange = (e: any) => {
        const key = 'user_type';
        const value = e.target.value;
        dispatch(filterActionCall(key, value, authToken));
    }
    const handleSortChange = (e: any) => {
        const key = 'flat_no';
        const value = e.target.value;
        dispatch(sortActionCall(key, value, authToken));
    }

    const handleSearch = (e: any) => {
        const key = 'block';
        const value = e.target.value;
        if (value.length === 0) {
            dispatch(getAllFlatsActionCall(authToken));
        } else if (e.key === 'Enter' && value.length === 1) {
            dispatch(filterActionCall(key, value, authToken));
        } else {
            return
        }
    }

    return (
        <Paper sx={{overflow: 'hidden', p: 2}}>
            <Box display='flex' justifyContent='space-between' m={2}>
                {isToken && <Box display="flex" gap={2}>
                    <FormControl>
                        <InputLabel>Filter</InputLabel>
                        <Select sx={{minWidth: 200}} label="Filter" onChange={handleFilterChange}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="tenant">Tenant</MenuItem>
                            <MenuItem value="owner">Owner</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel>Sort</InputLabel>
                        <Select sx={{minWidth: 200}} label='Sort' onChange={handleSortChange}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="asc">Ascending Flat No.</MenuItem>
                            <MenuItem value="desc">Descending Flat No.</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="outlined-basic" label="Enter block" variant="outlined" onKeyPress={handleSearch}/>
                    <Button variant="contained" startIcon={<AddHomeIcon/>} onClick={() => navigate('/add-new-flat')}>Add
                        Flat</Button>
                </Box>}
                {isToken ? <Button onClick={Logout} variant="contained" startIcon={<LogoutIcon/>}>
                    Logout
                </Button> : <Button onClick={() => navigate('/log-in')} variant="contained" startIcon={<LoginIcon/>}>
                    Login
                </Button>
                }
            </Box>
            {isToken ? <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Block</TableCell>
                            <TableCell>Number</TableCell>
                            <TableCell>Total Residents</TableCell>
                            <TableCell>Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {flats && flats.length > 0 ? flats.map((row: any) => (
                            <TableRow
                                onClick={() => navigate(`/${row._id}`)}
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.user_type}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.block}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.flat_no}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.users_count || 0}
                                </TableCell>
                                <TableCell component="th" scope="row" width={300}>
                                    <img
                                        width="100%"
                                        height={200}
                                        src={row.flat_image}
                                        alt="flat img"/>
                                </TableCell>

                            </TableRow>
                        )) : <Typography variant="h5" component="div">Loading...</Typography>}
                    </TableBody>
                </Table>
            </TableContainer> : <Typography>Please Login to Manage Your Apartment</Typography>}
            {/*{flats && flats.length > 0 ? <TablePagination*/}
            {/*    rowsPerPageOptions={[5, 15, 50]}*/}
            {/*    count={countFlats}*/}
            {/*    rowsPerPage={rowsPerPage}*/}
            {/*    page={page}*/}
            {/*    onPageChange={handleChangePage}*/}
            {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
            {/*    component='div'*/}
            {/*/> : null}*/}
        </Paper>
    );
}

export default HomeTable;