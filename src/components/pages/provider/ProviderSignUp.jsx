import { useState } from 'react';
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate, useLocation } from 'react-router-dom';
// import { useToast } from '@/hooks/use-toast';

const ProviderSignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: location.state?.phone || '',
    company_name: '',
    service_type: '',
    experience_years: '',
    location: '',
    description: '',
    website: ''
  });

  const serviceTypes = [
    'House Decor',
    'Automobile',
    'Gifts',
    'Women Wear',
    'Construction',
    'Technology',
    'Other Services'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/providers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          experience_years: parseInt(formData.experience_years)
        }),
      });

      const data = await response.json();

      if (data.success) {
        // toast({
        //   title: "Registration Successful!",
        //   description: "Please check your email to verify your account.",
        // });

        navigate('/provider-auth', {
          state: {
            message: 'Registration successful! Please verify your email and login.',
            phone: formData.phone
          }
        });
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch {
      // toast({
      //   title: "Registration Failed",
      //   description: error.message || "Something went wrong. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'linear-gradient(135deg, #EFF6FF 0%, #E9D5FF 50%, #FFEFD5 100%)',
      py: 8,
      px: 2
    }}>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        {/* Back Button */}
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/provider-auth')}
          sx={{ mb: 4, color: 'text.secondary' }}
        >
          Back to Login
        </Button>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{
            mx: 'auto',
            width: 64,
            height: 64,
            bgcolor: 'primary.light',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}>
            <PersonAddIcon sx={{ fontSize: 36, color: 'primary.main' }} />
          </Box>
          <Typography variant="h4" fontWeight="bold">Join as Provider</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Create your provider account and start growing your business
          </Typography>
        </Box>

        {/* Registration Form */}
        <Card elevation={6} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)' }}>
          <CardHeader
            title={<Typography variant="h6">Provider Registration</Typography>}
            subheader={<Typography color="text.secondary">Fill in your details to get started</Typography>}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PersonAddIcon fontSize="small" />
                  Personal Information
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    label="Full Name *"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                  <TextField
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                  <TextField
                    label="Phone Number *"
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  <TextField
                    label="Website (Optional)"
                    type="url"
                    value={formData.website}
                    onChange={e => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </Box>
              </Box>

              {/* Business Information */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <BusinessIcon fontSize="small" />
                  Business Information
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    label="Company Name *"
                    value={formData.company_name}
                    onChange={e => handleInputChange('company_name', e.target.value)}
                    placeholder="Your Company Ltd."
                    required
                  />
                  <TextField
                    select
                    label="Service Type *"
                    value={formData.service_type}
                    onChange={e => handleInputChange('service_type', e.target.value)}
                    required
                  >
                    <MenuItem value="" disabled>Select service type</MenuItem>
                    {serviceTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Years of Experience *"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    value={formData.experience_years}
                    onChange={e => handleInputChange('experience_years', e.target.value)}
                    placeholder="5"
                    required
                    InputProps={{
                      startAdornment: <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    }}
                  />
                  <TextField
                    label="Location *"
                    value={formData.location}
                    onChange={e => handleInputChange('location', e.target.value)}
                    placeholder="New York, NY"
                    required
                    InputProps={{
                      startAdornment: <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Business Description *"
                    value={formData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                    placeholder="Describe your business, services, and what makes you unique..."
                    multiline
                    rows={4}
                    required
                    fullWidth
                  />
                </Box>
              </Box>

              {/* Submit Button */}
              <Box sx={{ pt: 2 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ height: 48, fontWeight: 600, fontSize: 16 }}
                >
                  {isLoading ? <CircularProgress size={22} sx={{ mr: 1 }} /> : null}
                  {isLoading ? "Creating Account..." : "Create Provider Account"}
                </Button>
              </Box>

              {/* Terms Notice */}
              <Box sx={{ textAlign: 'center', pt: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProviderSignUp;