/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button, TextField, Card, CardContent, CardHeader, Typography, Box, CircularProgress, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
// import { useToast } from '@/hooks/use-toast';
// import apiService from '@/services/apiService';

const ProviderAuth = () => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [userExists, setUserExists] = useState(null);
  const [providerData, setProviderData] = useState(null);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  // const { toast } = useToast();

  const sanitizePhone = (input) => input;

  const checkProviderExists = async () => {
    if (!phone.trim()) {
      // toast({
      //   title: "Phone Required",
      //   description: "Please enter your phone number",
      //   variant: "destructive",
      // });
      return;
    }
    const cleanPhone = sanitizePhone(phone);

    setIsLoading(true);
    try {
      // const data = await apiService.providers.checkPhone(cleanPhone);
      const data = await null;
      if (data.success) {
        if (data.exists) {
          setUserExists(true);
          setProviderData(data.provider);
          setShowOTP(true);
          setOtpSent(false);
        } else {
          setUserExists(false);
          setProviderData({ phone: cleanPhone });
          setShowOTP(true);
          setOtpSent(false);
        }
      } else {
        throw new Error(data.message);
      }
    } catch {
      // toast({
      //   title: "Error",
      //   description: "Unable to verify phone number. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  const sendOTP = async (phoneOverride) => {
    const phoneToSend = phoneOverride || phone;
    if (!phoneToSend) return;
    setOtpLoading(true);
    try {
      // const res = await apiService.otp.send(phoneToSend);
      const res = await null;
      if (res.success) {
        // toast({ title: "OTP Sent", description: "Check WhatsApp for your code." });
        setOtpSent(true);
      } else {
        // toast({ title: "OTP Error", description: res.message, variant: "destructive" });
      }
    } catch (err) {
      // toast({ title: "OTP Error", description: "Failed to send OTP", variant: "destructive" });
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOTP = async () => {
    const phoneToVerify = providerData?.phone || phone;
    if (!phoneToVerify || otp.length !== 6) return;
    setOtpLoading(true);
    try {
      // const res = await apiService.otp.verify(phoneToVerify, otp);
      const res = await null;
      if (res.success) {
        if (userExists) {
          // toast({ title: "Login Successful", description: "Welcome back! Redirecting to your dashboard..." });
          localStorage.setItem('provider', JSON.stringify(providerData));
          setTimeout(() => {
            navigate('/b2b', { state: { tab: 'dashboard' } });
          }, 1000);
        } else {
          // toast({ title: "OTP Verified", description: "Redirecting to registration..." });
          setTimeout(() => {
            navigate('/b2b', { state: { tab: 'register', phone: phoneToVerify } });
          }, 1000);
        }
      } else {
        // toast({ title: "OTP Error", description: res.message || "Invalid OTP", variant: "destructive" });
      }
    } catch (err) {
      // toast({ title: "OTP Error", description: "Failed to verify OTP", variant: "destructive" });
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'linear-gradient(135deg, #EFF6FF 0%, #E9D5FF 50%, #FFEFD5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{ width: '100%', maxWidth: 400, zIndex: 2 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 3, color: 'grey.700', '&:hover': { bgcolor: 'grey.100' } }}
        >
          Back to Home
        </Button>
        <Card elevation={6} sx={{ borderRadius: 4, position: 'relative', overflow: 'hidden', bgcolor: 'rgba(255,255,255,0.95)' }}>
          <CardHeader
            sx={{
              textAlign: 'center',
              pt: 4,
              pb: 2,
              position: 'relative',
              zIndex: 2
            }}
            title={
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 2
                }}>
                  <PhoneIcon sx={{ color: '#fff', fontSize: 32 }} />
                </Box>
                <Typography variant="h5" sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Provider Access
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.600' }}>
                  Enter your phone number to continue
                </Typography>
              </Box>
            }
          />
          <CardContent sx={{ pt: 0, pb: 2 }}>
            {userExists === null && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Phone Number"
                  type="tel"
                  placeholder="e.g. +919620548555"
                  value={phone}
                  onChange={e => setPhone(sanitizePhone(e.target.value))}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  onClick={checkProviderExists}
                  disabled={isLoading}
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                    color: '#fff',
                    boxShadow: 2,
                    '&:hover': { background: 'linear-gradient(90deg, #1e40af 0%, #6d28d9 100%)' }
                  }}
                >
                  {isLoading ? <><CircularProgress size={20} sx={{ mr: 1 }} />Verifying...</> : "Continue"}
                </Button>
              </Box>
            )}

            {(userExists === true || userExists === false) && providerData && (
              <Box sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                border: 2,
                borderColor: userExists ? 'success.light' : 'primary.light',
                bgcolor: userExists ? 'success.lighter' : 'primary.lighter'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Box sx={{
                    p: 1,
                    bgcolor: userExists ? 'success.light' : 'primary.light',
                    borderRadius: '50%'
                  }}>
                    {userExists ? (
                      <CheckCircleIcon sx={{ color: 'success.main', fontSize: 24 }} />
                    ) : (
                      <PhoneIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                    )}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: userExists ? 'success.dark' : 'primary.dark' }}>
                      {userExists ? 'Account Found' : 'New Provider'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: userExists ? 'success.main' : 'primary.main' }}>
                      {userExists
                        ? `Welcome back${providerData.name ? `, ${providerData.name}` : ''}! Please verify with OTP.`
                        : 'No existing account found. Please verify your phone number to continue.'
                      }
                    </Typography>
                  </Box>
                </Box>
                {!otpSent ? (
                  <Button
                    onClick={() => sendOTP(sanitizePhone(phone))}
                    disabled={otpLoading}
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                      color: '#fff',
                      boxShadow: 2,
                      mt: 2,
                      '&:hover': { background: 'linear-gradient(90deg, #1e40af 0%, #6d28d9 100%)' }
                    }}
                  >
                    {otpLoading ? "Sending..." : "Send OTP"}
                  </Button>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      label="Enter OTP"
                      type="text"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      fullWidth
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <Button
                      onClick={verifyOTP}
                      disabled={otpLoading || otp.length !== 6}
                      variant="contained"
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                        color: '#fff',
                        boxShadow: 2,
                        '&:hover': { background: 'linear-gradient(90deg, #1e40af 0%, #6d28d9 100%)' }
                      }}
                    >
                      {otpLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            <Divider sx={{ my: 3 }} />
            <Box sx={{ textAlign: 'center', color: 'grey.600', fontSize: 13 }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                <ErrorOutlineIcon sx={{ fontSize: 16, color: 'primary.light' }} />
                We'll send a verification code to confirm your identity
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProviderAuth;