/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
// import WhatsAppOTPModal from '@/components/WhatsAppOTPModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

const AuthModal = ({ isOpen, onClose, onAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [manualCode, setManualCode] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [tabValue, setTabValue] = useState('whatsapp');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleOTPSubmit = async () => {
    setError('');
    try {
      // Replace with your API call
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        phone: form.phone,
        otp,
      });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token || '');
        localStorage.setItem('user', JSON.stringify(response.data.user || {}));
        onAuthenticated();
        onClose();
        resetForm();
      }
    } catch (err) {
      setError('Invalid OTP. Use 123456 for demo.');
    }
  };

  const resetForm = () => {
    setStep('form');
    setPhone('');
    setOtp('');
    setError('');
    setShowWhatsAppModal(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/register`, form);
      setQrCode(res.data.qrCode || null);
      setManualCode(res.data.manualCode || '');
      setStep('otp');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/verify-otp`, {
        phone: form.phone,
        otp,
      });
      setToken(res.data.token || null);
      alert('Login successful!');
      onAuthenticated();
      onClose();
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleWhatsAppAuth = () => {
    setShowWhatsAppModal(true);
  };

  const handleWhatsAppAuthenticated = () => {
    onAuthenticated();
    setShowWhatsAppModal(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showWhatsAppModal} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <DialogTitle sx={{ textAlign: 'center' }}>
            {step === 'form'
              ? (isSignUp ? 'Create Account' : 'Welcome Back')
              : 'Enter Verification Code'
            }
          </DialogTitle>

          {step === 'form' ? (
            <Box sx={{ mt: 2 }}>
              <Tabs
                value={tabValue}
                onChange={(_, val) => setTabValue(val)}
                variant="fullWidth"
                sx={{ mb: 3 }}
              >
                <Tab
                  value="whatsapp"
                  icon={<MessageIcon sx={{ mr: 1 }} />}
                  label="WhatsApp"
                />
                <Tab
                  value="traditional"
                  icon={<QrCodeIcon sx={{ mr: 1 }} />}
                  label="QR/Phone"
                />
              </Tabs>

              {tabValue === 'whatsapp' && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <MessageIcon sx={{ fontSize: 48, color: 'green', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {isSignUp ? 'Sign up with WhatsApp' : 'Sign in with WhatsApp'}
                  </Typography>
                  <Typography sx={{ mb: 3, color: 'grey.700' }}>
                    Get instant verification via WhatsApp OTP. Quick, secure, and hassle-free.
                  </Typography>
                  <Button
                    onClick={handleWhatsAppAuth}
                    variant="contained"
                    color="success"
                    size="large"
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MessageIcon sx={{ mr: 1 }} />
                    Continue with WhatsApp
                  </Button>
                </Box>
              )}

              {tabValue === 'traditional' && (
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 2 }}>
                  <TextField
                    label="Phone Number"
                    type="tel"
                    placeholder="Phone (+1234567890)"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  {isSignUp && (
                    <>
                      <TextField
                        label="Full Name"
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                    </>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    startIcon={<SmartphoneIcon />}
                  >
                    Send OTP
                  </Button>
                </Box>
              )}

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <Button
                      variant="text"
                      onClick={() => setIsSignUp(false)}
                      sx={{ color: 'primary.main', fontWeight: 600 }}
                    >
                      Sign In
                    </Button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <Button
                      variant="text"
                      onClick={() => setIsSignUp(true)}
                      sx={{ color: 'primary.main', fontWeight: 600 }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Scan QR and Enter OTP</Typography>
              {qrCode && (
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img src={qrCode} alt="QR Code" style={{ maxWidth: 180 }} />
                </Box>
              )}
              <TextField
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputProps={{ maxLength: 6 }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                onClick={handleVerify}
                variant="contained"
                fullWidth
                disabled={otp.length !== 6}
              >
                Verify OTP
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ mt: 2, color: 'grey.700' }}
                onClick={() => setStep('form')}
              >
                Back to form
              </Button>
              <Typography variant="caption" color="grey.500" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                Demo: Use OTP "123456" to login
              </Typography>
              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                  {error}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* WhatsApp OTP Modal */}
      {/* <WhatsAppOTPModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        onAuthenticated={handleWhatsAppAuthenticated}
        mode={isSignUp ? 'signup' : 'signin'}
      /> */}
    </>
  );
};

export default AuthModal;