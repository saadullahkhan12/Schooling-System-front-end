// components/SearchStudent.jsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  InputAdornment,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SearchStudent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data - replace with actual API calls
  const mockStudents = [
    {
      id: 1,
      name: 'John Doe',
      rollNumber: '2024001',
      class: '10th',
      section: 'A',
      phone: '+1234567890',
      email: 'john.doe@email.com',
      status: 'Active',
      admissionDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNumber: '2024002',
      class: '9th',
      section: 'B',
      phone: '+1234567891',
      email: 'jane.smith@email.com',
      status: 'Active',
      admissionDate: '2024-01-20',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      rollNumber: '2024003',
      class: '11th',
      section: 'A',
      phone: '+1234567892',
      email: 'mike.johnson@email.com',
      status: 'Inactive',
      admissionDate: '2024-01-25',
    },
  ];

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = mockStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.includes(searchTerm) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  const handleView = (student) => {
    console.log('View student:', student);
    // Implement view functionality
  };

  const handleEdit = (student) => {
    console.log('Edit student:', student);
    // Implement edit functionality
  };

  const handleDelete = (student) => {
    console.log('Delete student:', student);
    // Implement delete functionality
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'error';
  };

  return (
    <Box>
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SearchIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: '#00335E',
              }}
            >
              Search Students
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Find and manage student records quickly and efficiently
          </Typography>
        </CardContent>
      </Card>

      {/* Search Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'end' }}>
            <TextField
              fullWidth
              label="Search by Name, Roll Number, Class, or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isSearching || !searchTerm.trim()}
              sx={{
                px: 4,
                py: 1.5,
                background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #002244 0%, #00335E 100%)',
                },
                '&:disabled': {
                  background: 'rgba(0, 0, 0, 0.12)',
                }
              }}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Search Results
              </Typography>
              <Chip
                label={`${searchResults.length} found`}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </Box>
            
            <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Roll Number</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Section</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((student) => (
                    <TableRow 
                      key={student.id} 
                      hover
                      sx={{ 
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        }
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>{student.rollNumber}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 2, fontSize: '0.875rem' }}>
                            {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {student.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={student.status}
                          color={getStatusColor(student.status)}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleView(student)}
                            sx={{ 
                              color: 'primary.main',
                              '&:hover': { backgroundColor: 'primary.light', color: 'white' }
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(student)}
                            sx={{ 
                              color: 'success.main',
                              '&:hover': { backgroundColor: 'success.light', color: 'white' }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(student)}
                            sx={{ 
                              color: 'error.main',
                              '&:hover': { backgroundColor: 'error.light', color: 'white' }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {searchTerm && searchResults.length === 0 && !isSearching && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <SearchIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No students found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No students found matching "{searchTerm}". Try different search terms.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SearchStudent;
