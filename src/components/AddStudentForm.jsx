// components/AddStudentForm.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
  Alert,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  IconButton,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  ContactPhone as ContactPhoneIcon,
  Home as HomeIcon,
  Save as SaveIcon,
  Clear as ClearIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const AddStudentForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    studentClass: '',
    rollNumber: '',
    dob: '',
    studentWhatsapp: '',
    studentCell: '',
    bForm: '',
    gender: '',
    nationality: 'PAKISTANI',
    fatherCnic: '',
    parentsWhatsapp: '',
    parentsCell: '',
    fatherName: '',
    motherName: '',
    parentEmail: '',
    address: '',
    emergencyContact: '',
    admissionDate: '',
    batchNo: '25',
    schoolName: '',
    referralSource: '',
    note: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const steps = [
    'Personal Information',
    'Contact Details',
    'Parent Information',
    'Additional Details',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    setSuccessMessage('Student added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const generateRollNumber = () => {
    if (formData.studentClass) {
      const randomNum = Math.floor(Math.random() * 100);
      setFormData({
        ...formData,
        rollNumber: `${formData.studentClass}-${randomNum}`,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      studentClass: '',
      rollNumber: '',
      dob: '',
      studentWhatsapp: '',
      studentCell: '',
      bForm: '',
      gender: '',
      nationality: 'PAKISTANI',
      fatherCnic: '',
      parentsWhatsapp: '',
      parentsCell: '',
      fatherName: '',
      motherName: '',
      parentEmail: '',
      address: '',
      emergencyContact: '',
      admissionDate: '',
      batchNo: '25',
      schoolName: '',
      referralSource: '',
      note: '',
    });
    setImagePreview(null);
    setActiveStep(0);
    setErrors({});
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
  return (
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={imagePreview}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="student-image"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="student-image">
                  <IconButton
            component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    <CloudUploadIcon />
                  </IconButton>
        </label>
      </Box>
            </Grid>
      
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Student Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
                error={!!errors.fullName}
                helperText={errors.fullName}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
              <FormControl fullWidth required error={!!errors.studentClass}>
                <InputLabel>Class</InputLabel>
                <Select
              name="studentClass"
              value={formData.studentClass}
              onChange={(e) => {
                handleInputChange(e);
                generateRollNumber();
              }}
                  label="Class"
            >
              <MenuItem value="">Select Class</MenuItem>
              <MenuItem value="6">Class 6</MenuItem>
              <MenuItem value="7">Class 7</MenuItem>
              <MenuItem value="8">Class 8</MenuItem>
              <MenuItem value="9">Class 9</MenuItem>
              <MenuItem value="10">Class 10</MenuItem>
                  <MenuItem value="11">Class 11</MenuItem>
                  <MenuItem value="12">Class 12</MenuItem>
                </Select>
                {errors.studentClass && <FormHelperText>{errors.studentClass}</FormHelperText>}
              </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              InputProps={{
                readOnly: true,
                  startAdornment: <SchoolIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
                helperText="Auto-generated based on class"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
                required
                error={!!errors.dob}
                helperText={errors.dob}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  label="Gender"
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="B-Form Number"
                name="bForm"
                value={formData.bForm}
                onChange={handleInputChange}
                required
                error={!!errors.bForm}
                helperText={errors.bForm}
              />
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <ContactPhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                Contact Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student WhatsApp"
                name="studentWhatsapp"
                value={formData.studentWhatsapp}
                onChange={handleInputChange}
                type="tel"
                error={!!errors.studentWhatsapp}
                helperText={errors.studentWhatsapp}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student Cell Phone"
                name="studentCell"
                value={formData.studentCell}
                onChange={handleInputChange}
                type="tel"
                error={!!errors.studentCell}
                helperText={errors.studentCell}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 1, color: 'primary.main' }} />
                Address Information
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                multiline
                rows={3}
                required
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                type="tel"
                required
                error={!!errors.emergencyContact}
                helperText={errors.emergencyContact}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Admission Date"
                name="admissionDate"
                type="date"
                value={formData.admissionDate}
                onChange={handleInputChange}
                required
                error={!!errors.admissionDate}
                helperText={errors.admissionDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                Parent Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                required
                error={!!errors.fatherName}
                helperText={errors.fatherName}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mother's Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                required
                error={!!errors.motherName}
                helperText={errors.motherName}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Father's CNIC"
                name="fatherCnic"
                value={formData.fatherCnic}
                onChange={handleInputChange}
                required
                error={!!errors.fatherCnic}
                helperText={errors.fatherCnic}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Parent Email"
                name="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={handleInputChange}
                error={!!errors.parentEmail}
                helperText={errors.parentEmail}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Parent WhatsApp"
                name="parentsWhatsapp"
                value={formData.parentsWhatsapp}
                onChange={handleInputChange}
                type="tel"
                required
                error={!!errors.parentsWhatsapp}
                helperText={errors.parentsWhatsapp}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Parent Cell Phone"
                name="parentsCell"
                value={formData.parentsCell}
                onChange={handleInputChange}
                type="tel"
                required
                error={!!errors.parentsCell}
                helperText={errors.parentsCell}
              />
            </Grid>
          </Grid>
        );
      
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                Additional Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Previous School"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Referral Source"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Batch Number"
                name="batchNo"
                value={formData.batchNo}
                onChange={handleInputChange}
              required
            />
          </Grid>
          
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Nationality</InputLabel>
                <Select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  label="Nationality"
                >
                  <MenuItem value="PAKISTANI">Pakistani</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                multiline
                rows={4}
                placeholder="Any additional information about the student..."
              />
            </Grid>
          </Grid>
        );
      
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: '#00335E',
              }}
            >
              Add New Student
            </Typography>
            <Chip
              icon={<CheckCircleIcon />}
              label={`Step ${activeStep + 1} of ${steps.length}`}
              color="primary"
              variant="outlined"
            />
          </Box>
          <Typography variant="body1" color="text.secondary">
            Complete all steps to register a new student in the system
          </Typography>
        </CardContent>
      </Card>

      {/* Stepper */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}
            
            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ClearIcon />}
                variant="outlined"
              >
                Back
              </Button>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  onClick={resetForm}
                  variant="outlined"
                  color="secondary"
                  startIcon={<ClearIcon />}
                >
                  Reset
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                      background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #002244 0%, #00335E 100%)',
                      },
                    }}
                  >
                    Save Student
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #002244 0%, #00335E 100%)',
                      },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
      </form>
        </CardContent>
      </Card>
      
      {successMessage && (
        <Alert 
          severity="success" 
          sx={{ mt: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => setSuccessMessage('')}>
              Close
            </Button>
          }
        >
          {successMessage}
        </Alert>
      )}
    </Box>
  );
};

export default AddStudentForm;