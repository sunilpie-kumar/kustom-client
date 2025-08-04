import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import ShieldIcon from '@mui/icons-material/Security';
import ClockIcon from '@mui/icons-material/AccessTime';
import AlertIcon from '@mui/icons-material/ErrorOutline';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import UploadFileIcon from '@mui/icons-material/UploadFile';
// import { apiService } from '@/services/apiService';
// import { useToast } from '@/hooks/use-toast';

const categories = [
  'House Decor',
  'Automobile',
  'Gifts',
  'Women Wear',
  'Construction',
  'Technology',
  'Other Services'
];

const BusinessForm = () => {
  // const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    service_type: '',
    experience_years: '',
    location: '',
    description: '',
    gst_number: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const isValid = file.size <= 10 * 1024 * 1024; // 10MB limit
      if (!isValid) {
        // toast({
        //   title: "File too large",
        //   description: `${file.name} exceeds 10MB limit`,
        //   variant: "destructive",
        // });
      }
      return isValid;
    });
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'company_name', 'service_type', 'experience_years', 'location'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`${field.replace('_', ' ')} is required`);
        }
      }

      // Submit provider registration using new API service
      // const response = await apiService.business.register(formData, uploadedFiles);
      const response = await null;

      if (response.success) {
        setSubmitStatus('success');
        // toast({
        //   title: "Registration Successful!",
        //   description: "Your provider application has been submitted and is under review. We'll contact you within 24-48 hours.",
        //   duration: 5000,
        // });
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            company_name: '',
            service_type: '',
            experience_years: '',
            location: '',
            description: '',
            gst_number: ''
          });
          setUploadedFiles([]);
        }, 2000);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.errors && Array.isArray(errorData.errors)) {
            setErrorMessage(errorData.errors.map((err) => err.msg).join(', '));
          } else {
            setErrorMessage(errorData.message || error.message);
          }
        } catch {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (submitStatus === 'success') {
    return (
      <Card sx={{ width: '100%', maxWidth: 900, mx: 'auto', border: 0, boxShadow: 8, bgcolor: '#fff' }}>
        <CardContent sx={{ py: 8 }}>
          <Box sx={{ textAlign: 'center', gap: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Box sx={{
                width: 96, height: 96,
                background: 'linear-gradient(90deg, #22C55E 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mx: 'auto', boxShadow: 4
              }}>
                <CheckCircleIcon sx={{ fontSize: 48, color: '#fff' }} />
              </Box>
              <Box sx={{
                position: 'absolute', top: -8, right: -8,
                width: 32, height: 32, bgcolor: '#F59E42',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <StarIcon sx={{ fontSize: 18, color: '#B45309' }} />
              </Box>
            </Box>
            <Typography variant="h4" fontWeight="bold" sx={{
              background: 'linear-gradient(90deg, #22C55E 0%, #059669 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}>
              Registration Successful!
            </Typography>
            <Box sx={{ maxWidth: 400, mx: 'auto', mb: 2 }}>
              <Typography variant="body1" color="text.primary" fontWeight="medium" sx={{ mb: 1 }}>
                Welcome to the Kustom Provider Network!
              </Typography>
              <Typography color="text.secondary">
                Thank you for registering as a provider. Your application is now under review. 
                Our team will contact you within 24-48 hours with the next steps.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, pt: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Chip icon={<ClockIcon />} label="Review time: 24-48 hours" sx={{ bgcolor: '#F3F4F6', color: '#555' }} />
              <Chip icon={<ShieldIcon />} label="Verification in progress" sx={{ bgcolor: '#EFF6FF', color: '#2563EB' }} />
            </Box>
            <Button
              onClick={() => setSubmitStatus('idle')}
              sx={{
                mt: 4,
                background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                color: '#fff',
                px: 6,
                py: 2,
                fontWeight: 600,
                fontSize: 18,
                borderRadius: 3,
                boxShadow: 4,
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1D4ED8 0%, #7C3AED 100%)',
                  boxShadow: 8,
                  transform: 'scale(1.05)',
                },
              }}
            >
              Register Another Provider
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ width: '100%', maxWidth: 900, mx: 'auto', border: 0, boxShadow: 8, bgcolor: '#fff' }}>
      <CardHeader
        sx={{
          background: 'linear-gradient(90deg, #EFF6FF 0%, #F3F4F6 100%)',
          borderBottom: '1px solid #E5E7EB',
          py: 6,
          textAlign: 'center'
        }}
        title={
          <Box>
            <Box sx={{
              width: 64, height: 64,
              background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
              borderRadius: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              mx: 'auto', boxShadow: 2, mb: 2
            }}>
              <ShieldIcon sx={{ fontSize: 32, color: '#fff' }} />
            </Box>
            <Typography variant="h4" fontWeight="bold" sx={{
              background: 'linear-gradient(90deg, #1E293B 0%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}>
              Join Kustom Provider Network
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
              Welcome! Fill out the details below to join our platform and start connecting with thousands of customers looking for your services.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, pt: 2 }}>
              <Chip icon={<StarIcon sx={{ color: '#F59E42' }} />} label="Verified Badge" sx={{ bgcolor: '#FFFDE7', color: '#555' }} />
              <Chip icon={<ShieldIcon sx={{ color: '#22C55E' }} />} label="Trusted Platform" sx={{ bgcolor: '#E0F7FA', color: '#555' }} />
              <Chip icon={<ClockIcon sx={{ color: '#7C3AED' }} />} label="Quick Setup" sx={{ bgcolor: '#F3E8FF', color: '#555' }} />
            </Box>
          </Box>
        }
      />
      <CardContent sx={{ p: 6 }}>
        {submitStatus === 'error' && (
          <Box sx={{ mb: 6, p: 3, bgcolor: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <AlertIcon sx={{ fontSize: 32, color: '#F44336', mt: 0.5 }} />
            <Box>
              <Typography fontWeight="bold" color="#B71C1C" sx={{ mb: 1 }}>Registration Error</Typography>
              <Typography color="#D32F2F">{errorMessage}</Typography>
            </Box>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <Box sx={{ mb: 6 }}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
              Personal Information
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Tell us about yourself and your contact details.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Your Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                  fullWidth
                  helperText="This will be displayed on your public profile"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  required
                  fullWidth
                  helperText="We'll send important updates to this email"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  fullWidth
                  helperText="Customers will use this to contact you"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Location/City"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter your city/location"
                  required
                  fullWidth
                  helperText="This helps customers find local services"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Business Information Section */}
          <Box sx={{ mb: 6 }}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
              Business Information
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Details about your business and services.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Company/Business Name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="Enter your business name"
                  required
                  fullWidth
                  helperText="This will be displayed on your public profile"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Service Category"
                  value={formData.service_type}
                  onChange={(e) => handleInputChange('service_type', e.target.value)}
                  required
                  fullWidth
                  helperText="Select your service category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Years of Experience"
                  type="number"
                  inputProps={{ min: 0, max: 50 }}
                  value={formData.experience_years}
                  onChange={(e) => handleInputChange('experience_years', e.target.value)}
                  placeholder="Enter years of experience"
                  required
                  fullWidth
                  helperText="This helps customers find the right provider"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="GST Number (Optional)"
                  value={formData.gst_number}
                  onChange={(e) => handleInputChange('gst_number', e.target.value)}
                  placeholder="Enter your GST number"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          {/* Business Description Section */}
          <Box sx={{ mb: 6 }}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
              Business Description
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Tell us about your business, services you provide, and what makes you unique.
            </Typography>
            <TextField
              label="Business Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Tell us about your business, services you provide, and what makes you unique..."
              multiline
              rows={5}
              required
              fullWidth
              helperText="Minimum 50 characters. This will be shown to potential customers."
            />
          </Box>

          {/* File Upload Section */}
          <Box sx={{ mb: 6 }}>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
              Portfolio & Media
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Showcase your work with images and videos (optional but recommended).
            </Typography>
            <Box sx={{
              border: '2px dashed #E5E7EB',
              borderRadius: 4,
              p: 4,
              textAlign: 'center',
              bgcolor: '#F3F4F6',
              mb: 3,
            }}>
              <UploadFileIcon sx={{ fontSize: 48, color: '#90A4AE', mb: 2 }} />
              <Typography variant="body1" fontWeight="medium" color="text.primary" sx={{ mb: 1 }}>
                Upload images or videos showcasing your work
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Drag and drop files here, or click to browse
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Supports: JPG, PNG, MP4, MOV (Max 10MB per file)
              </Typography>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    px: 4,
                    py: 1.5,
                    mt: 2,
                    borderRadius: 3,
                    fontWeight: 600,
                    bgcolor: '#fff',
                    '&:hover': { bgcolor: '#E3F2FD', borderColor: '#90CAF9' },
                  }}
                >
                  Choose Files
                </Button>
              </label>
            </Box>
            {uploadedFiles.length > 0 && (
              <Grid container spacing={2}>
                {uploadedFiles.map((file, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box sx={{
                      position: 'relative',
                      border: '1px solid #E5E7EB',
                      borderRadius: 2,
                      p: 2,
                      bgcolor: '#fff',
                      boxShadow: 1,
                      mb: 2,
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        {file.type.startsWith('image/') ? (
                          <ImageIcon sx={{ color: '#1976D2' }} />
                        ) : (
                          <VideoLibraryIcon sx={{ color: '#388E3C' }} />
                        )}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" fontWeight="medium" noWrap>{file.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Typography>
                        </Box>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => removeFile(index)}
                        sx={{
                          width: '100%',
                          fontSize: 12,
                          bgcolor: '#FFEBEE',
                          color: '#D32F2F',
                          borderColor: '#FFCDD2',
                          '&:hover': { bgcolor: '#FFCDD2', color: '#B71C1C' },
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          <Box sx={{ pt: 4, borderTop: '1px solid #E5E7EB' }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              sx={{
                background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                color: '#fff',
                fontSize: 18,
                py: 2,
                borderRadius: 3,
                fontWeight: 600,
                boxShadow: 4,
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1D4ED8 0%, #7C3AED 100%)',
                  boxShadow: 8,
                  transform: 'scale(1.03)',
                },
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
              startIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : null}
            >
              {isSubmitting ? 'Registering...' : 'Register as Provider'}
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
              By registering, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessForm;