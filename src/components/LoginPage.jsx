// components/LoginPage.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Card,
  CardContent,
  Fade,
  InputAdornment,
  IconButton,
  MenuItem,
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import myLogo from '../assets/my_logo.jpeg';

const LoginPage = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const endpoint = isLoginMode ? 'login' : 'register';
  
      // ✅ CORRECT: Proxy use karega
      const url = `/auth/${endpoint}`;
  
      const requestData = {
        username,
        password,
        ...(isLoginMode ? {} : { email, role }),
      };
  
      console.log("🌐 Sending request to:", url);
      console.log("📦 Request Data:", requestData);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      console.log("✅ Response from backend:", data);
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      if (isLoginMode) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(); // Redirect to dashboard
      } else {
        setSuccess('Registration successful! Please login.');
        setIsLoginMode(true); // Switch to login mode
        // Clear form
        setUsername('');
        setPassword('');
        setEmail('');
      }
  
    } catch (error) {
      setError(error.message || 'Network error. Please check your connection.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setSuccess('');
    setUsername('');
    setPassword('');
    setEmail('');
  };

  return (
    <Box 
      className="min-h-screen flex items-center justify-center"
      sx={{
        background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }
      }}
    >
      <Container maxWidth="sm">
        <Fade in timeout={800}>
          <Card 
            elevation={24}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <CardContent sx={{ p: 6 }}>
              {/* Header */}
              <Box className="text-center mb-8">
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 8px 32px rgba(0, 51, 94, 0.3)',
                    overflow: 'hidden',
                    border: '3px solid #c99228',
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
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#00335E',
                    mb: 1
                  }}
                >
                  Baseline Academy
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                  {isLoginMode ? 'Admin Dashboard' : 'Create Account'}
                </Typography>
              </Box>
              
              {/* Auth Form */}
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      }
                    }}
                  />
                </Box>

                {!isLoginMode && (
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        }
                      }}
                    />
                  </Box>
                )}

                {!isLoginMode && (
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      select
                      label="Role"
                      variant="outlined"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      disabled={isLoading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        }
                      }}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="teacher">Teacher</MenuItem>
                      <MenuItem value="staff">Staff</MenuItem>
                    </TextField>
                  </Box>
                )}
                
                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            edge="end"
                            disabled={isLoading}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      }
                    }}
                  />
                </Box>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    py: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #00335E 0%, #1a4a73 100%)',
                    boxShadow: '0 4px 15px rgba(0, 51, 94, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #002244 0%, #00335E 100%)',
                      boxShadow: '0 6px 20px rgba(0, 51, 94, 0.6)',
                    },
                    '&:disabled': {
                      background: 'rgba(0, 0, 0, 0.12)',
                    }
                  }}
                >
                  {isLoading 
                    ? (isLoginMode ? 'Signing In...' : 'Creating Account...') 
                    : (isLoginMode ? 'Sign In' : 'Create Account')
                  }
                </Button>
                
                {error && (
                  <Fade in>
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mt: 3,
                        borderRadius: 2,
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        border: '1px solid rgba(244, 67, 54, 0.2)',
                      }}
                    >
                      {error}
                    </Alert>
                  </Fade>
                )}

                {success && (
                  <Fade in>
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mt: 3,
                        borderRadius: 2,
                        backgroundColor: 'rgba(201, 146, 40, 0.1)',
                        border: '1px solid rgba(201, 146, 40, 0.2)',
                      }}
                    >
                      {success}
                    </Alert>
                  </Fade>
                )}

                {/* Toggle between Login and Register */}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                  </Typography>
                  <Button
                    variant="text"
                    onClick={toggleMode}
                    disabled={isLoading}
                    sx={{
                      color: '#00335E',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 51, 94, 0.1)',
                      }
                    }}
                  >
                    {isLoginMode ? 'Create Account' : 'Sign In'}
                  </Button>
                </Box>
              </form>
              
              {/* Footer */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  © 2025 Baseline Academy. All rights reserved  
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default LoginPage;