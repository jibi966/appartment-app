import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    List, ListItem, ListItemText, ListItemButton
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearOneFlatAction, getOneFlatActionCall} from "../Redux/Home/actions";
import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function SingleFlat() {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();
    const token = localStorage.getItem('token');


    useEffect(() => {
        dispatch(getOneFlatActionCall(id, token));

        return () => {
            dispatch(clearOneFlatAction());
        }

    }, [id]);

    const {oneFlatDetails, userDetails} = useSelector((store: any) => store.HomeReducer.oneFlat);

    return (

        <Box display="flex" justifyContent="center" m={5}>

            {Object.keys(oneFlatDetails || {}).length === 0 ?
                <Typography gutterBottom variant="h5" component="div">Loading...</Typography> :
                <Box>
                    <Box>
                        <Button sx={{m: 5}} onClick={() => navigate('/')} variant="contained" startIcon={<HomeIcon/>}>
                            Home
                        </Button>
                        <Button sx={{m: 5}} onClick={() => navigate(`/add-user/${id}`)} variant="contained"
                                startIcon={<PersonAddAltIcon/>}>
                            Add User
                        </Button>
                    </Box>
                    <Card sx={{minWidth: 500}}>

                        <CardMedia component="img" height="194" alt="flat image" image={oneFlatDetails.flat_image}/>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">Admin
                                - {oneFlatDetails.admin_id?.first_name + " " + oneFlatDetails.admin_id?.last_name}</Typography>
                            <Typography variant="h5">Block - {oneFlatDetails.block}</Typography>
                            <Typography variant="h5">Flat Number - {oneFlatDetails.flat_no}</Typography>
                            <Typography variant="h5">User Type - {oneFlatDetails.user_type}</Typography>
                            <br/>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Typography>User Lists</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {userDetails.length > 0 ?
                                        <List>
                                            {userDetails.map((user: any) => {
                                                return (
                                                    <ListItem key={user._id}>
                                                        <ListItemButton>
                                                            <ListItemText>
                                                                <Box display="flex" justifyContent="space-between">
                                                                    <Typography>{user.name}</Typography>
                                                                    <Typography>{user.age}</Typography>
                                                                    <Typography>{user.gender}</Typography>
                                                                </Box>
                                                            </ListItemText>
                                                        </ListItemButton>
                                                    </ListItem>
                                                )
                                            })}
                                        </List> :
                                        <Typography variant="h5">No Users Assigned</Typography>}
                                </AccordionDetails>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Box>
            }
        </Box>
    )
}


export default SingleFlat;