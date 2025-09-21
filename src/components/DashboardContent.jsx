// components/DashboardContent.jsx
import React, { useState, useEffect } from 'react';
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
  IconButton,
  Fade,
  Zoom,
  Button,
  Stack,
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
  ArrowForward as ArrowForwardIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon2,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const DashboardContent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Animate stats counters
    const timer = setTimeout(() => {
      setAnimatedStats([156, 23, 8, 12]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      title: 'Total Students', 
      value: 156, 
      animatedValue: animatedStats[0],
      change: '+12%',
      changeType: 'positive',
      icon: <PeopleIcon />,
      color: 'primary',
      bgColor: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
      trendIcon: <TrendingUpIcon2 sx={{ fontSize: 16 }} />
    },
    { 
      title: 'Pending Fees', 
      value: 23, 
      animatedValue: animatedStats[1],
      change: '-8%',
      changeType: 'negative',
      icon: <PaymentIcon />,
      color: 'warning',
      bgColor: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      trendIcon: <TrendingDownIcon sx={{ fontSize: 16 }} />
    },
    { 
      title: "Today's Reports", 
      value: 8, 
      animatedValue: animatedStats[2],
      change: '+25%',
      changeType: 'positive',
      icon: <AssignmentIcon />,
      color: 'success',
      bgColor: 'linear-gradient(135deg, #4ECDC4 0%, #7EDDD3 100%)',
      trendIcon: <TrendingUpIcon2 sx={{ fontSize: 16 }} />
    },
    { 
      title: 'Active Staff', 
      value: 12, 
      animatedValue: animatedStats[3],
      change: '+2',
      changeType: 'neutral',
      icon: <TrendingUpIcon />,
      color: 'info',
      bgColor: 'linear-gradient(135deg, #c99228 0%, #d4a847 100%)',
      trendIcon: <TrendingUpIcon2 sx={{ fontSize: 16 }} />
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
    <Fade in={isLoaded} timeout={800}>
      <Box>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Zoom in={isLoaded} timeout={600} style={{ transitionDelay: '200ms' }}>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Welcome back, Admin! 
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, opacity: 0.8 }}>
                Here's what's happening at Baseline Academy today
              </Typography>
            </Box>
          </Zoom>
        </Box>
      
        {/* Stats Cards */}
        <Box sx={{ 
          width: '90%', 
          mx: 'auto', 
          mb: 4,
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
          {stats.map((stat, index) => (
            <Box 
              key={index}
              sx={{ 
                flex: '1 1 calc(25% - 18px)',
                minWidth: '250px',
                '@media (max-width: 1200px)': {
                  flex: '1 1 calc(50% - 18px)',
                },
                '@media (max-width: 600px)': {
                  flex: '1 1 100%',
                },
              }}
            >
              <Zoom in={isLoaded} timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card 
                  sx={{
                    background: stat.bgColor,
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      pointerEvents: 'none',
                    }
                  }}
                >
                  <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.25)',
                          width: 56,
                          height: 56,
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        {stat.icon}
                      </Avatar>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {stat.trendIcon}
                        <Chip
                          label={stat.change}
                          size="small"
                          sx={{
                            backgroundColor: stat.changeType === 'positive' ? 'rgba(76, 175, 80, 0.3)' : 
                                           stat.changeType === 'negative' ? 'rgba(244, 67, 54, 0.3)' : 
                                           'rgba(255, 255, 255, 0.3)',
                            color: 'white',
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      {stat.animatedValue}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Box>
          ))}
        </Box>
      
        <Grid container spacing={3}>
          {/* Recent Activity */}
          <Grid item xs={12} lg={8}>
            <Zoom in={isLoaded} timeout={800} style={{ transitionDelay: '400ms' }}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                },
                transition: 'all 0.3s ease-in-out',
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        backgroundColor: 'primary.main', 
                        mr: 2,
                        width: 40,
                        height: 40,
                        boxShadow: '0 4px 12px rgba(0, 51, 94, 0.3)',
                      }}>
                        <SchoolIcon />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        Recent Activity
                      </Typography>
                    </Box>
                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <List sx={{ p: 0 }}>
                    {recentActivities.map((activity, index) => (
                      <React.Fragment key={activity.id}>
                        <ListItem 
                          sx={{ 
                            px: 0, 
                            py: 2,
                            borderRadius: 2,
                            '&:hover': {
                              backgroundColor: 'action.hover',
                              transform: 'translateX(4px)',
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ 
                              backgroundColor: `${activity.color}.main`, 
                              width: 44, 
                              height: 44,
                              boxShadow: `0 4px 12px ${activity.color}.main`,
                              opacity: 0.9,
                            }}>
                              {activity.icon}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={activity.message}
                            secondary={activity.time}
                            primaryTypographyProps={{ 
                              fontWeight: 600,
                              color: 'text.primary',
                              fontSize: '0.95rem',
                            }}
                            secondaryTypographyProps={{ 
                              color: 'text.secondary',
                              fontSize: '0.8rem',
                            }}
                          />
                        </ListItem>
                        {index < recentActivities.length - 1 && (
                          <Divider 
                            variant="inset" 
                            component="li" 
                            sx={{ 
                              ml: 7,
                              opacity: 0.3,
                            }} 
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 600,
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'white',
                        },
                      }}
                    >
                      View All Activities
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>

          {/* Upcoming Events & Quick Stats */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Upcoming Events */}
              <Zoom in={isLoaded} timeout={800} style={{ transitionDelay: '600ms' }}>
                <Card sx={{
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar sx={{ 
                        backgroundColor: 'primary.main', 
                        mr: 2,
                        width: 36,
                        height: 36,
                        boxShadow: '0 4px 12px rgba(0, 51, 94, 0.3)',
                      }}>
                        <ScheduleIcon />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        Upcoming Events
                      </Typography>
                    </Box>
                    <Stack spacing={2}>
                      {upcomingEvents.map((event, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            p: 2.5, 
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                            borderRadius: 2.5,
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, color: 'text.primary' }}>
                            {event.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                            {event.date}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Zoom>

              {/* Quick Stats */}
              <Zoom in={isLoaded} timeout={800} style={{ transitionDelay: '800ms' }}>
                <Card sx={{
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        Quick Stats
                      </Typography>
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <RefreshIcon />
                      </IconButton>
                    </Box>
                    <Stack spacing={3}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>Attendance Rate</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>94%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={94} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            backgroundColor: 'rgba(0, 51, 94, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
                            }
                          }} 
                        />
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>Fee Collection</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main' }}>87%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={87} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                            }
                          }} 
                        />
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>Homework Completion</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'warning.main' }}>92%</Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={92} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 152, 0, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              background: 'linear-gradient(135deg, #c99228 0%, #d4a847 100%)',
                            }
                          }} 
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Zoom>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default DashboardContent;