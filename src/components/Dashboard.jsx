// components/Dashboard.jsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  Payment as PaymentIcon,
  Assignment as AssignmentIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import myLogo from '../assets/my_logo.jpeg';
import DashboardContent from './DashboardContent';
import AddStudentForm from './AddStudentForm';
import SearchStudent from './SearchStudent';
import FeeStatus from './FeeStatus';
import Homework from './Homework';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const TabPanel = ({ children, value, index }) => {
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && (
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  const menuItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', index: 0 },
    { icon: <PersonAddIcon />, label: 'Add Student', index: 1 },
    { icon: <SearchIcon />, label: 'Search Student', index: 2 },
    { icon: <PaymentIcon />, label: 'Fee Status', index: 3 },
    { icon: <AssignmentIcon />, label: 'Homework', index: 4 },
  ];

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 4px 16px rgba(0, 51, 94, 0.2)',
            overflow: 'hidden',
            border: '2px solid #c99228',
          }}
        >
          <img 
            src={myLogo} 
            alt="Baseline Academy Logo" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#00335E' }}>
          Baseline Academy
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Admin Dashboard
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.index} disablePadding>
            <ListItemButton
              selected={activeTab === item.index}
              onClick={() => handleTabChange(null, item.index)}
              sx={{
                mx: 1,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 2 }} />
        <ListItem disablePadding>
          <ListItemButton
            onClick={onLogout}
            sx={{
              mx: 1,
              borderRadius: 2,
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'error.light',
                color: 'white',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top App Bar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: 'white',
            borderBottom: '1px solid',
            borderColor: 'divider',
            color: 'text.primary',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              {menuItems[activeTab]?.label || 'Dashboard'}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                icon={<NotificationsIcon />}
                label="3"
                color="error"
                size="small"
                sx={{ mr: 1 }}
              />
              <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <TabPanel value={activeTab} index={0}>
            <DashboardContent />
          </TabPanel>
          
          <TabPanel value={activeTab} index={1}>
            <AddStudentForm />
          </TabPanel>
          
          <TabPanel value={activeTab} index={2}>
            <SearchStudent />
          </TabPanel>
          
          <TabPanel value={activeTab} index={3}>
            <FeeStatus />
          </TabPanel>
          
          <TabPanel value={activeTab} index={4}>
            <Homework />
          </TabPanel>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            py: 2,
            px: 3,
            backgroundColor: 'grey.50',
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Baseline Academy. All rights reserved.
          </Typography>
        </Box>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Dashboard;