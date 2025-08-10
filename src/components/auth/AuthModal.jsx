/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { MessageCircle, QrCode, Smartphone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { apiService } from '@/services/apiService';
// import WhatsAppOTPModal from '@/components/WhatsAppOTPModal';
import WhatsAppOTPModal from '../ui-sections/WhatsAppOTPModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

const AuthModal = ({ isOpen, onClose, onAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [manualCode, setManualCode] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState(null);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending OTP to:', form.phone);
    setStep('otp');
  };

  const handleOTPSubmit = async () => {
    setError('');
    try {
      // const response = await apiService.auth.verifyOTP(phone, otp);
      const response = null;
      if (response.success && response.data) {
        const authData = response.data;
        localStorage.setItem('token', authData.token || '');
        localStorage.setItem('user', JSON.stringify(authData.user || {}));
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
      <Dialog open={isOpen && !showWhatsAppModal} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {step === 'form'
                ? (isSignUp ? 'Create Account' : 'Welcome Back')
                : 'Enter Verification Code'
              }
            </DialogTitle>
          </DialogHeader>

          {step === 'form' ? (
            <div className="space-y-6">
              <Tabs defaultValue="whatsapp" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </TabsTrigger>
                  <TabsTrigger value="traditional" className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    QR/Phone
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="whatsapp" className="space-y-4">
                  <div className="text-center py-6">
                    <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {isSignUp ? 'Sign up with WhatsApp' : 'Sign in with WhatsApp'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Get instant verification via WhatsApp OTP. Quick, secure, and hassle-free.
                    </p>

                    <Button
                      onClick={handleWhatsAppAuth}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Continue with WhatsApp
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="traditional" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Phone (+1234567890)"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        required
                      />
                    </div>

                    {isSignUp && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            required
                          />
                        </div>
                      </>
                    )}

                    <Button type="submit" className="w-full">
                      <Smartphone className="mr-2 h-4 w-4" />
                      Send OTP
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="text-center text-sm">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2>Scan QR and Enter OTP</h2>
              {qrCode && <img src={qrCode} alt="QR Code" />}

              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerify}
                className="w-full"
                disabled={otp.length !== 6}
              >
                Verify OTP
              </Button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full text-sm text-gray-600 hover:text-gray-800"
              >
                Back to form
              </button>

              <p className="text-xs text-gray-500 text-center">
                Demo: Use OTP "123456" to login
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* WhatsApp OTP Modal */}
      <WhatsAppOTPModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        onAuthenticated={handleWhatsAppAuthenticated}
        mode={isSignUp ? 'signup' : 'signin'}
      />
    </>
  );
};

export default AuthModal;