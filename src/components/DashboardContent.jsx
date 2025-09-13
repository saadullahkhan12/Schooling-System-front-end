// components/DashboardContent.jsx
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  Payment as PaymentIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  PersonAdd as PersonAddIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const DashboardContent = () => {
  const stats = [
    { 
      title: 'Total Students', 
      value: 156, 
      change: '+12%',
      changeType: 'positive',
      icon: <PeopleIcon />,
      color: 'primary',
      bgColor: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)'
    },
    { 
      title: 'Pending Fees', 
      value: 23, 
      change: '-8%',
      changeType: 'negative',
      icon: <PaymentIcon />,
      color: 'warning',
      bgColor: 'linear-gradient(135deg, #c99228 0%, #d4a847 100%)'
    },
    { 
      title: "Today's Reports", 
      value: 8, 
      change: '+25%',
      changeType: 'positive',
      icon: <AssignmentIcon />,
      color: 'success',
      bgColor: 'linear-gradient(135deg, #c99228 0%, #d4a847 100%)'
    },
    { 
      title: 'Active Staff', 
      value: 12, 
      change: '+2',
      changeType: 'neutral',
      icon: <TrendingUpIcon />,
      color: 'info',
      bgColor: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)'
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'student_added',
      message: 'New student John Doe enrolled in Class 10',
      time: '2 hours ago',
      icon: <PersonAddIcon />,
      color: 'success',
    },
    {
      id: 2,
      type: 'fee_paid',
      message: 'Sarah Wilson paid monthly fees',
      time: '4 hours ago',
      icon: <PaymentIcon />,
      color: 'primary',
    },
    {
      id: 3,
      type: 'homework_assigned',
      message: 'Math homework assigned to Class 9',
      time: '6 hours ago',
      icon: <AssignmentIcon />,
      color: 'warning',
    },
    {
      id: 4,
      type: 'student_updated',
      message: 'Student profile updated for Mike Johnson',
      time: '1 day ago',
      icon: <CheckCircleIcon />,
      color: 'info',
    },
  ];

  const upcomingEvents = [
    { title: 'Parent-Teacher Meeting', date: 'Tomorrow, 2:00 PM', type: 'meeting' },
    { title: 'Monthly Fee Due', date: 'In 3 days', type: 'fee' },
    { title: 'Science Fair', date: 'Next Week', type: 'event' },
  ];

  return (
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: '#00335E',
            mb: 1
          }}
        >
          Welcome back, Admin!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Here's what's happening at Baseline Academy today
      </Typography>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card 
              sx={{
                background: stat.bgColor,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      width: 48,
                      height: 48,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      backgroundColor: stat.changeType === 'positive' ? 'rgba(16, 185, 129, 0.2)' : 
                                     stat.changeType === 'negative' ? 'rgba(239, 68, 68, 0.2)' : 
                                     'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3}>
      {/* Recent Activity */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Recent Activity
        </Typography>
              </Box>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: `${activity.color}.main`, width: 40, height: 40 }}>
                          {activity.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.message}
                        secondary={activity.time}
                        primaryTypographyProps={{ fontWeight: 500 }}
                        secondaryTypographyProps={{ color: 'text.secondary' }}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events & Quick Stats */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Upcoming Events */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Upcoming Events
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {upcomingEvents.map((event, index) => (
                    <Box key={index} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {event.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {event.date}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Quick Stats
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Attendance Rate</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>94%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={94} sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Fee Collection</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>87%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={87} color="success" sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Homework Completion</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>92%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={92} color="warning" sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;