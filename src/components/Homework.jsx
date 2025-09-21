// components/Homework.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Stack,
  Fade,
  Zoom,
  Alert,
  CircularProgress,
  Badge,
  Divider,
  CardActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarTodayIcon,
  Subject as SubjectIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  MoreVert as MoreVertIcon,
  Assessment as StatsIcon,
  Bookmark as BookmarkIcon,
  Timer as TimerIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const Homework = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingHomework, setEditingHomework] = useState(null);
  const [filterClass, setFilterClass] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [homeworkData, setHomeworkData] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // API Configuration
  const API_BASE_URL = 'http://localhost:3001/api';

  // Classes and Subjects data
  const classes = [
    "Pre-K", "Kindergarten", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"
  ];

  const subjects = [
    "Mathematics", "English", "Science", "Physics", "Chemistry", "Biology",
    "History", "Geography", "Computer Science", "Art", "Music", "Physical Education",
    "Social Studies", "Economics", "Business Studies", "Psychology", "Sociology",
    "Political Science", "Environmental Science", "Literature", "Philosophy"
  ];

  const homeworkStatus = ["active", "pending", "done"];

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    dueDate: '',
    status: 'active',
    assignedDate: new Date().toISOString().split('T')[0],
  });

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    console.log('🔑 Token check:', {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      tokenStart: token ? token.substring(0, 20) + '...' : 'none',
      hasUser: !!user,
      user: user ? JSON.parse(user) : null
    });
    
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  // Check if user is authenticated
  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      setError('You are not logged in. Please login again.');
      return false;
    }
    
    try {
      const userData = JSON.parse(user);
      console.log('👤 Current user:', userData);
      return true;
    } catch (error) {
      setError('Invalid user data. Please login again.');
      return false;
    }
  };

  // API Functions
  const fetchHomework = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        class: filterClass !== 'all' ? filterClass : '',
        subject: filterSubject !== 'all' ? filterSubject : '',
        status: filterStatus !== 'all' ? filterStatus : '',
        page: '1',
        limit: '50',
        sortBy: 'dueDate',
        sortOrder: 'asc',
        search: searchQuery,
      });

      console.log('🔑 Token available:', !!localStorage.getItem('token'));

      const response = await fetch(`${API_BASE_URL}/homework?${params}`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        setHomeworkData(data.homework || data || []);
      } else {
        console.error('Failed to fetch homework:', response.statusText);
        setHomeworkData([]);
      }
    } catch (error) {
      console.error('Error fetching homework:', error);
      setHomeworkData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/homework/stats`, {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        console.error('Failed to fetch stats:', response.statusText);
        // Set default empty stats
        setStats({
          total: 0,
          active: 0,
          pending: 0,
          done: 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default empty stats
      setStats({
        total: 0,
        active: 0,
        pending: 0,
        done: 0
      });
    }
  };

  // Effects
  useEffect(() => {
    setIsLoaded(true);
    fetchHomework();
    fetchStats();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchHomework();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [filterClass, filterSubject, filterStatus, searchQuery]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'done':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon />;
      case 'pending':
        return <PendingIcon />;
      case 'done':
        return <BookmarkIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && 
           !(homeworkData || []).find(hw => hw && hw.dueDate === dueDate)?.status === 'done';
  };

  // Safe filtering function
  const getFilteredHomework = () => {
    try {
      if (!Array.isArray(homeworkData)) {
        return [];
      }
      
      return homeworkData.filter(hw => {
        if (!hw || typeof hw !== 'object') return false;
        
        const classMatch = filterClass === 'all' || (hw.class && hw.class === filterClass);
        const subjectMatch = filterSubject === 'all' || (hw.subject && hw.subject === filterSubject);
        const statusMatch = filterStatus === 'all' || (hw.status && hw.status === filterStatus);
        const searchMatch = searchQuery === '' || 
          (hw.title && hw.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (hw.description && hw.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (hw.subject && hw.subject.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return classMatch && subjectMatch && statusMatch && searchMatch;
      });
    } catch (error) {
      console.error('Error filtering homework:', error);
      return [];
    }
  };

  const filteredHomework = getFilteredHomework();

  const handleOpenDialog = (homework = null) => {
    if (homework) {
      setEditingHomework(homework);
      setFormData(homework);
    } else {
      setEditingHomework(null);
      setFormData({
        title: '',
        description: '',
        subject: '',
        class: '',
        dueDate: '',
        status: 'active',
        assignedDate: new Date().toISOString().split('T')[0],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingHomework(null);
    setFormData({
      title: '',
      description: '',
      subject: '',
      class: '',
      dueDate: '',
      status: 'active',
      assignedDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    // Check authentication first
    if (!checkAuthentication()) {
      setSubmitting(false);
      return;
    }

    try {
      console.log('🚀 Starting homework submission...');
      console.log('📝 Form data:', formData);
      console.log('🔗 API URL:', `${API_BASE_URL}/homework`);
      
      const url = editingHomework 
        ? `${API_BASE_URL}/homework/${editingHomework.id}`
        : `${API_BASE_URL}/homework`;
      
      const method = editingHomework ? 'PUT' : 'POST';
      const headers = getAuthHeaders();
      
      console.log(`📡 Making ${method} request to:`, url);
      console.log('📡 Request headers:', headers);
      
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(formData),
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('📄 Response body:', responseText);

      if (response.ok) {
        let responseData;
        try {
          responseData = JSON.parse(responseText);
          console.log('✅ Parsed response data:', responseData);
        } catch (parseError) {
          console.log('⚠️ Could not parse JSON response, treating as success');
          responseData = { message: 'Success' };
        }
        
        setSuccess(editingHomework ? 'Homework updated successfully!' : 'Homework created successfully!');
        await fetchHomework();
        handleCloseDialog();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (parseError) {
          errorData = { message: responseText || `HTTP ${response.status}: ${response.statusText}` };
        }
        
        let errorMessage = errorData.message || errorData.error || `Server error: ${response.status}`;
        
        // Handle specific error cases
        if (response.status === 401) {
          if (errorMessage.includes('Invalid token')) {
            errorMessage = 'Your session has expired. Please login again.';
            // Optionally redirect to login or clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          } else {
            errorMessage = 'Authentication failed. Please login again.';
          }
        } else if (response.status === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        }
        
        setError(`Failed to save homework: ${errorMessage}`);
        console.error('❌ API Error:', errorData);
        console.error('❌ Response status:', response.status);
      }
    } catch (error) {
      const errorMessage = `Network error: ${error.message}`;
      setError(errorMessage);
      console.error('❌ Network Error:', error);
      console.error('🔍 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/homework/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        if (response.ok) {
          await fetchHomework();
        } else {
          console.error('Failed to delete homework');
        }
      } catch (error) {
        console.error('Error deleting homework:', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/homework/${id}/submit`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchHomework();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <Fade in={isLoaded} timeout={800}>
      <Box>
        {/* Header with Stats */}
        <Box sx={{ mb: 4 }}>
          <Zoom in={isLoaded} timeout={600} style={{ transitionDelay: '200ms' }}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
              color: 'white',
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      📚 Homework Management
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      Manage and track all homework assignments
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Add Homework
                  </Button>
                </Box>
                
                {/* Quick Stats */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                        width: 56, 
                        height: 56, 
                        mx: 'auto', 
                        mb: 1 
                      }}>
                        <AssignmentIcon />
                      </Avatar>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.total || homeworkData.length}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Total Assignments
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ 
                        backgroundColor: 'rgba(76, 175, 80, 0.3)', 
                        width: 56, 
                        height: 56, 
                        mx: 'auto', 
                        mb: 1 
                      }}>
                        <CheckCircleIcon />
                      </Avatar>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.active !== undefined ? stats.active : (homeworkData || []).filter(hw => hw && hw.status === 'active').length}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Active
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ 
                        backgroundColor: 'rgba(255, 152, 0, 0.3)', 
                        width: 56, 
                        height: 56, 
                        mx: 'auto', 
                        mb: 1 
                      }}>
                        <PendingIcon />
                      </Avatar>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.pending !== undefined ? stats.pending : (homeworkData || []).filter(hw => hw && hw.status === 'pending').length}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Pending
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ 
                        backgroundColor: 'rgba(33, 150, 243, 0.3)', 
                        width: 56, 
                        height: 56, 
                        mx: 'auto', 
                        mb: 1 
                      }}>
                        <BookmarkIcon />
                      </Avatar>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stats.done !== undefined ? stats.done : (homeworkData || []).filter(hw => hw && hw.status === 'done').length}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Completed
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Zoom>
        </Box>



        {/* Filters */}
        <Zoom in={isLoaded} timeout={800} style={{ transitionDelay: '400ms' }}>
          <Card sx={{
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            mb: 3,
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FilterIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Filters & Search
                </Typography>
              </Box>
              
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Search homework..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Class</InputLabel>
                    <Select
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                      label="Class"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">All Classes</MenuItem>
                      {classes.map((cls) => (
                        <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Subject</InputLabel>
                    <Select
                      value={filterSubject}
                      onChange={(e) => setFilterSubject(e.target.value)}
                      label="Subject"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">All Subjects</MenuItem>
                      {subjects.map((subject) => (
                        <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      label="Status"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      {homeworkStatus.map((status) => (
                        <MenuItem key={status} value={status}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(status)}
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Zoom>

        {/* Homework List */}
        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            </Grid>
          ) : filteredHomework.length === 0 ? (
            <Grid item xs={12}>
              <Card sx={{ textAlign: 'center', py: 4 }}>
                <CardContent>
                  <AssignmentIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No homework found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or add new homework
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            filteredHomework.map((homework, index) => (
              <Grid item xs={12} md={6} lg={4} key={homework.id}>
                <Zoom in={isLoaded} timeout={600} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Card sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {isOverdue(homework.dueDate) && (
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 0,
                        height: 0,
                        borderLeft: '20px solid transparent',
                        borderTop: '20px solid #f44336',
                        zIndex: 1,
                      }} />
                    )}
                    
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          lineHeight: 1.3,
                          color: 'text.primary',
                          flex: 1,
                          mr: 1,
                        }}>
                          {homework.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(homework)}
                            sx={{ color: 'primary.main' }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(homework.id)}
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" sx={{ 
                        color: 'text.secondary', 
                        mb: 3, 
                        lineHeight: 1.5,
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {homework.description}
                      </Typography>
                      
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SchoolIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {homework.subject} • {homework.class}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarTodayIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Due: {new Date(homework.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip
                            icon={getStatusIcon(homework.status)}
                            label={homework.status.charAt(0).toUpperCase() + homework.status.slice(1)}
                            color={getStatusColor(homework.status)}
                            size="small"
                            sx={{ fontWeight: 500 }}
                          />
                          {isOverdue(homework.dueDate) && (
                            <Chip
                              label="Overdue"
                              color="error"
                              size="small"
                              sx={{ fontWeight: 500 }}
                            />
                          )}
                        </Box>
                      </Stack>
                    </CardContent>
                    
                    <CardActions sx={{ px: 3, pb: 2 }}>
                      <Button
                        size="small"
                        startIcon={<ViewIcon />}
                        sx={{ textTransform: 'none' }}
                      >
                        View Details
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleStatusChange(homework.id, homework.status === 'active' ? 'done' : 'active')}
                        sx={{ textTransform: 'none' }}
                      >
                        {homework.status === 'active' ? 'Mark Done' : 'Mark Active'}
                      </Button>
                    </CardActions>
                  </Card>
                </Zoom>
              </Grid>
            ))
          )}
        </Grid>

        {/* Add/Edit Homework Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
            color: 'white',
            fontWeight: 600,
          }}>
            {editingHomework ? '✏️ Edit Homework' : '➕ Add New Homework'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent sx={{ p: 3 }}>
              {/* Error and Success Messages in Dialog */}
              {error && (
                <Box sx={{ 
                  mb: 3,
                  p: 2,
                  backgroundColor: '#ffebee',
                  border: '1px solid #f44336',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#d32f2f' }}>
                    {error}
                  </Typography>
                  <IconButton size="small" onClick={() => setError(null)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}

              {success && (
                <Box sx={{ 
                  mb: 3,
                  p: 2,
                  backgroundColor: '#e8f5e8',
                  border: '1px solid #4caf50',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#2e7d32' }}>
                    {success}
                  </Typography>
                  <IconButton size="small" onClick={() => setSuccess(null)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}

              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Homework Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Subject</InputLabel>
                      <Select
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        label="Subject"
                        required
                        sx={{ borderRadius: 2 }}
                      >
                        {subjects.map((subject) => (
                          <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Class</InputLabel>
                      <Select
                        value={formData.class}
                        onChange={(e) => setFormData({...formData, class: e.target.value})}
                        label="Class"
                        required
                        sx={{ borderRadius: 2 }}
                      >
                        {classes.map((cls) => (
                          <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Assigned Date"
                      type="date"
                      value={formData.assignedDate}
                      onChange={(e) => setFormData({...formData, assignedDate: e.target.value})}
                      InputLabelProps={{ shrink: true }}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Due Date"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                      InputLabelProps={{ shrink: true }}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        label="Status"
                        sx={{ borderRadius: 2 }}
                      >
                        {homeworkStatus.map((status) => (
                          <MenuItem key={status} value={status}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getStatusIcon(status)}
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
              <Button 
                onClick={handleCloseDialog}
                sx={{ textTransform: 'none' }}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained"
                disabled={submitting}
                startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{
                  background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #002244 0%, #00335E 100%)',
                  },
                  '&:disabled': {
                    background: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)',
                  }
                }}
              >
                {submitting 
                  ? (editingHomework ? 'Updating...' : 'Adding...') 
                  : (editingHomework ? 'Update' : 'Add') + ' Homework'
                }
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </Fade>
  );
};

export default Homework;
