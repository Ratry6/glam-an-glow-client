import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useRouteMatch
} from "react-router-dom";
import DashboardHome from './DashboardHome/DashboardHome';
import pay from './pay/pay';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import Payment from './Payment/Payment';
import Review from './Review/Review';
import AddProduct from '../Products/AddProduct/AddProduct';
import ManageOrders from '../Orders/ManageOrders/ManageOrders';
import useAuth from '../../hooks/UseFirebase/UseAuth';
import ManageProducts from './ManageProducts/ManageProducts';


const drawerWidth = 200;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const{admin,logout } = useAuth();
  let { path, url } = useRouteMatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Link 
          style={{textDecoration :'none'}}
          to="/home">
            <Button  color="inherit">Home</Button>

          </Link>
          <br/>
      <Link 
          style={{textDecoration :'none'}}
          to="/myorders">
            <Button  color="inherit">My Orders</Button>

          </Link>
          <br/>
      <Link 
          style={{textDecoration :'none'}}
          to={`${url}`}>
            <Button  color="inherit">Dashboard</Button>

          </Link>
          <br/>
      <Link 
          style={{textDecoration :'none'}}
          to={`${url}/payment`}>
            <Button  color="inherit">Pay to go</Button>

          </Link>
      {admin && <Box>
     <Link 
          style={{textDecoration :'none'}}
          to={`${url}/manageOrders`}>
            <Button  color="inherit">Manage Orders</Button>

          </Link>
          <br/>
    
     
        <Link 
          style={{textDecoration :'none'}}
          to={`${url}/makeAdmin`}>
            <Button  color="inherit"> Make Admin</Button>

          </Link>
          <br/>
      <Link 
          style={{textDecoration :'none'}}
          to={`${url}/addproduct`}>
            <Button  color="inherit">Add Product</Button>

          </Link>
      <Link 
          style={{textDecoration :'none'}}
          to={`${url}/manageproducts`}>
            <Button  color="inherit">Manage Products</Button>

          </Link>
     </Box>}
          <br/>
      <Link 
          style={{textDecoration :'none'}}
          to={`${url}/review`}>
            <Button  color="inherit">Review</Button>

          </Link>
          <br/>
      <Link 
          style={{textDecoration :'none'}}
          to={`${url}/logout`}>
            <Button onClick={logout} color="inherit">Log Out</Button>

          </Link>
     
      <Divider />
   
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
           Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Switch>
        <Route exact path={path}>
          <DashboardHome></DashboardHome>
        </Route>
        <Route path={`${path}/payment/:id`}>
          <Payment></Payment>
        </Route>
        <Route path={`${path}/review`}>
          <Review></Review>
        </Route>
        <Route path={`${path}/makeAdmin`}>
         <MakeAdmin></MakeAdmin>
        </Route>
        <Route path={`${path}/addproduct`}>
         <AddProduct></AddProduct>
        </Route>
        <Route path={`${path}/manageOrders`}>
         <ManageOrders></ManageOrders>
        </Route>
        <Route path={`${path}/manageproducts`}>
         <ManageProducts></ManageProducts>
        </Route>
      </Switch>
      
        
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
