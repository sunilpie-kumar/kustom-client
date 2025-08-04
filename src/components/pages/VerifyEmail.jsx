import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');

    fetch(`/api/v1/providers/verify-email?token=${token}&email=${encodeURIComponent(email)}`)
      .then(res => {
        if (res.ok) setStatus('success');
        else setStatus('error');
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'verifying') {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">Verifying your email...</Typography>
      </Box>
    );
  }
  if (status === 'success') {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color="success.main" sx={{ mb: 2 }}>Email verified!</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>You can now log in to your account.</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/provider-auth')}>Go to Login</Button>
      </Box>
    );
  }
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h5" color="error.main" sx={{ mb: 2 }}>Verification failed or link expired.</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>Please request a new verification email or contact support.</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>Return Home</Button>
    </Box>
  );
};

export default VerifyEmail;