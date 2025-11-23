import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet } from 'react-router-dom';

export default function Profile() {


    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>

                <ListItem>
                    <ListItemButton component={Link} to="/profile">
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary={"info"} />
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton component={Link} to="orders">
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary={"orders"} />
                    </ListItemButton>
                </ListItem>

                <ListItem>
                    <ListItemButton>
                        <ListItemIcon component={Link} to="setting">

                        </ListItemIcon>
                        <ListItemText primary={"setting"} />
                    </ListItemButton>
                </ListItem>

            </List>
            <Divider />

        </Box>
    );

    return (
       <Box sx={{display:"flex"}}>
         <Drawer variant='permanent' anchor="left"
            sx={{
                '.MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    background: '#f5f5f5',
                    top: "70px",
                    position:"sticky",
                    height:"90vh",
                    left:0,
                },
            }}
        >
            {DrawerList}
        </Drawer>

        <Box sx={{flexGrow:"1",p:3}}> 
            <Outlet />

        </Box>

       </Box>
    );
}
