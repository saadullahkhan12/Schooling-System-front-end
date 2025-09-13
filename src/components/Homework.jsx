// components/Homework.jsx
import React, { useState } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SubjectIcon from '@mui/icons-material/Subject';

const Homework = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingHomework, setEditingHomework] = useState(null);
  const [filterClass, setFilterClass] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    dueDate: '',
    priority: 'Medium',
  });

  // Mock data - replace with actual API calls
  const mockHomework = [
    {
      id: 1,
      title: 'Mathematics Chapter 5',
      description: 'Complete exercises 1-20 from Chapter 5. Show all working steps.',
      subject: 'Mathematics',
      class: '10th',
      dueDate: '2024-02-15',
      priority: 'High',
      assignedDate: '2024-02-10',
      status: 'Active',
    },
    {
      id: 2,
      title: 'English Essay',
      description: 'Write a 500-word essay on "The Importance of Education"',
      subject: 'English',
      class: '9th',
      dueDate: '2024-02-20',
      priority: 'Medium',
      assignedDate: '2024-02-12',
      status: 'Active',
    },
    {
      id: 3,
      title: 'Science Project',
      description: 'Create a model of the solar system with accurate proportions',
      subject: 'Science',
      class: '11th',
      dueDate: '2024-02-25',
      priority: 'High',
      assignedDate: '2024-02-08',
      status: 'Completed',
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'info';
  };

  const filteredHomework = mockHomework.filter(hw => {
    const classMatch = filterClass === 'all' || hw.class === filterClass;
    const subjectMatch = filterSubject === 'all' || hw.subject === filterSubject;
    return classMatch && subjectMatch;
  });

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
        priority: 'Medium',
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
      priority: 'Medium',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Homework data:', formData);
    // Implement save functionality
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    console.log('Delete homework:', id);
    // Implement delete functionality
  };

  return (
    <Box className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent>
          <Box className="flex justify-between items-center">
            <Typography variant="h5" className="text-primary-main">
              Homework Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add Homework
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent>
          <Box className="flex gap-4 items-center">
            <FormControl className="min-w-40">
              <InputLabel>Class</InputLabel>
              <Select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                label="Class"
              >
                <MenuItem value="all">All Classes</MenuItem>
                <MenuItem value="9th">9th</MenuItem>
                <MenuItem value="10th">10th</MenuItem>
                <MenuItem value="11th">11th</MenuItem>
                <MenuItem value="12th">12th</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl className="min-w-40">
              <InputLabel>Subject</InputLabel>
              <Select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                label="Subject"
              >
                <MenuItem value="all">All Subjects</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Social Studies">Social Studies</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Homework List */}
      <Grid container spacing={3}>
        {filteredHomework.map((homework) => (
          <Grid item xs={12} md={6} lg={4} key={homework.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent>
                <Box className="flex justify-between items-start mb-3">
                  <Typography variant="h6" className="font-semibold line-clamp-2">
                    {homework.title}
                  </Typography>
                  <Box className="flex gap-1">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(homework)}
                      className="text-blue-600"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(homework.id)}
                      className="text-red-600"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-3">
                  {homework.description}
                </Typography>
                
                <Box className="space-y-2">
                  <Box className="flex items-center gap-2">
                    <SubjectIcon className="text-gray-500" fontSize="small" />
                    <Typography variant="caption" className="text-gray-600">
                      {homework.subject} - {homework.class}
                    </Typography>
                  </Box>
                  
                  <Box className="flex items-center gap-2">
                    <CalendarTodayIcon className="text-gray-500" fontSize="small" />
                    <Typography variant="caption" className="text-gray-600">
                      Due: {homework.dueDate}
                    </Typography>
                  </Box>
                  
                  <Box className="flex gap-2">
                    <Chip
                      label={homework.priority}
                      color={getPriorityColor(homework.priority)}
                      size="small"
                    />
                    <Chip
                      label={homework.status}
                      color={getStatusColor(homework.status)}
                      size="small"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Homework Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingHomework ? 'Edit Homework' : 'Add New Homework'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box className="space-y-4">
              <TextField
                fullWidth
                label="Homework Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Subject</InputLabel>
                    <Select
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      label="Subject"
                      required
                    >
                      <MenuItem value="Mathematics">Mathematics</MenuItem>
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="Science">Science</MenuItem>
                      <MenuItem value="Social Studies">Social Studies</MenuItem>
                      <MenuItem value="Computer Science">Computer Science</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Class</InputLabel>
                    <Select
                      value={formData.class}
                      onChange={(e) => setFormData({...formData, class: e.target.value})}
                      label="Class"
                      required
                    >
                      <MenuItem value="9th">9th</MenuItem>
                      <MenuItem value="10th">10th</MenuItem>
                      <MenuItem value="11th">11th</MenuItem>
                      <MenuItem value="12th">12th</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Due Date"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      label="Priority"
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingHomework ? 'Update' : 'Add'} Homework
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Homework;
