// components/FeeStatus.jsx
import React, { useState } from 'react';
import {
  Box,
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
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';

const FeeStatus = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClass, setFilterClass] = useState('all');

  // Mock data - replace with actual API calls
  const mockFeeData = [
    {
      id: 1,
      studentName: 'John Doe',
      rollNumber: '2024001',
      class: '10th',
      section: 'A',
      totalFees: 50000,
      paidFees: 45000,
      pendingFees: 5000,
      status: 'Partial',
      lastPaymentDate: '2024-01-15',
      dueDate: '2024-03-15',
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      rollNumber: '2024002',
      class: '9th',
      section: 'B',
      totalFees: 45000,
      paidFees: 45000,
      pendingFees: 0,
      status: 'Paid',
      lastPaymentDate: '2024-01-20',
      dueDate: '2024-03-20',
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      rollNumber: '2024003',
      class: '11th',
      section: 'A',
      totalFees: 55000,
      paidFees: 0,
      pendingFees: 55000,
      status: 'Pending',
      lastPaymentDate: null,
      dueDate: '2024-03-25',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Partial':
        return 'warning';
      case 'Pending':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <PaymentIcon className="text-green-600" />;
      case 'Partial':
        return <ReceiptIcon className="text-yellow-600" />;
      case 'Pending':
        return <PaymentIcon className="text-red-600" />;
      default:
        return null;
    }
  };

  const filteredData = mockFeeData.filter(student => {
    const statusMatch = filterStatus === 'all' || student.status === filterStatus;
    const classMatch = filterClass === 'all' || student.class === filterClass;
    return statusMatch && classMatch;
  });

  const totalRevenue = mockFeeData.reduce((sum, student) => sum + student.paidFees, 0);
  const totalPending = mockFeeData.reduce((sum, student) => sum + student.pendingFees, 0);

  return (
    <Box className="space-y-6">
      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: 'rgba(201, 146, 40, 0.1)', border: '1px solid rgba(201, 146, 40, 0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#c99228', fontWeight: 600 }}>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#b07d1a' }}>
                    ₹{totalRevenue.toLocaleString()}
                  </Typography>
                </Box>
                <PaymentIcon sx={{ color: '#c99228', fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#dc2626', fontWeight: 600 }}>
                    Pending Fees
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#b91c1c' }}>
                    ₹{totalPending.toLocaleString()}
                  </Typography>
                </Box>
                <ReceiptIcon sx={{ color: '#dc2626', fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: 'rgba(0, 51, 94, 0.1)', border: '1px solid rgba(0, 51, 94, 0.2)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ color: '#00335E', fontWeight: 600 }}>
                    Total Students
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#002244' }}>
                    {mockFeeData.length}
                  </Typography>
                </Box>
                <ReceiptIcon sx={{ color: '#00335E', fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card>
        <CardContent>
          <Typography variant="h5" className="mb-4 text-primary-main">
            Fee Status Management
          </Typography>
          
          <Box className="flex gap-4 items-center">
            <FormControl className="min-w-40">
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Partial">Partial</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
            
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
          </Box>
        </CardContent>
      </Card>

      {/* Fee Status Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Student Fee Status
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell>Student</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Total Fees</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" className="font-semibold">
                          {student.studentName}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          {student.rollNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{student.class} - {student.section}</TableCell>
                    <TableCell>₹{student.totalFees.toLocaleString()}</TableCell>
                    <TableCell>₹{student.paidFees.toLocaleString()}</TableCell>
                    <TableCell>₹{student.pendingFees.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(student.status)}
                        label={student.status}
                        color={getStatusColor(student.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{student.dueDate}</TableCell>
                    <TableCell>
                      <Box className="flex gap-1">
                        <IconButton
                          size="small"
                          className="text-blue-600"
                          title="View Details"
                        >
                          <ReceiptIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          className="text-green-600"
                          title="Record Payment"
                        >
                          <PaymentIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          className="text-gray-600"
                          title="Print Receipt"
                        >
                          <PrintIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          className="text-purple-600"
                          title="Download Report"
                        >
                          <DownloadIcon />
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
    </Box>
  );
};

export default FeeStatus;
