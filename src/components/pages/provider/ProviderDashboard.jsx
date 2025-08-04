import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Tabs,
  Tab,
  Badge,
  Divider,
  CircularProgress,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
// import { useToast } from '@/hooks/use-toast';

const tabLabels = ['Profile', 'Analytics', 'Bookings', 'Settings'];

const ProviderDashboard = () => {
  const navigate = useNavigate();
  // const { toast } = useToast();
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const storedProvider = localStorage.getItem('provider');
    if (!storedProvider) {
      navigate('/provider-auth');
      return;
    }
    try {
      const providerData = JSON.parse(storedProvider);
      setProvider(providerData);
    } catch {
      navigate('/provider-auth');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('provider');
    // toast({
    //   title: "Logged Out",
    //   description: "You have been successfully logged out.",
    // });
    navigate('/');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <Badge
            color="success"
            badgeContent={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircleIcon fontSize="small" />
                Approved
              </Box>
            }
            sx={{ '& .MuiBadge-badge': { backgroundColor: '#d1fae5', color: '#065f46', fontWeight: 500 } }}
          />
        );
      case 'pending':
        return (
          <Badge
            color="warning"
            badgeContent={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon fontSize="small" />
                Pending Review
              </Box>
            }
            sx={{ '& .MuiBadge-badge': { backgroundColor: '#fef3c7', color: '#92400e', fontWeight: 500 } }}
          />
        );
      case 'rejected':
        return (
          <Badge
            color="error"
            badgeContent={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CancelIcon fontSize="small" />
                Rejected
              </Box>
            }
            sx={{ '& .MuiBadge-badge': { backgroundColor: '#fee2e2', color: '#991b1b', fontWeight: 500 } }}
          />
        );
      default:
        return <Badge badgeContent="Unknown" color="secondary" />;
    }
  };

  if (isLoading) {
    return (
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #EFF6FF 0%, #FFF 50%, #FFEFD5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography color="text.secondary">Loading dashboard...</Typography>
        </Box>
      </Box>
    );
  }

  if (!provider) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #EFF6FF 0%, #FFF 50%, #FFEFD5 100%)' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'rgba(255,255,255,0.95)', borderBottom: 1, borderColor: 'divider', backdropFilter: 'blur(4px)' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" fontWeight="bold">Provider Dashboard</Typography>
            <Typography color="text.secondary">Welcome back, {provider.name}!</Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ fontWeight: 500 }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 4 }}>
        {/* Status Overview */}
        <Box sx={{ mb: 4 }}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6">Account Status</Typography>
                    <Typography color="text.secondary" fontSize={14}>Current status of your provider account</Typography>
                  </Box>
                  {getStatusBadge(provider.status)}
                </Box>
              }
            />
            <CardContent>
              {provider.status === 'pending' && (
                <Box sx={{ bgcolor: '#fef3c7', border: '1px solid #fde68a', borderRadius: 2, p: 2 }}>
                  <Typography color="#92400e">
                    Your account is currently under review. We'll notify you once it's approved.
                  </Typography>
                </Box>
              )}
              {provider.status === 'approved' && (
                <Box sx={{ bgcolor: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 2, p: 2 }}>
                  <Typography color="#065f46">
                    Congratulations! Your account is approved and active.
                  </Typography>
                </Box>
              )}
              {provider.status === 'rejected' && (
                <Box sx={{ bgcolor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 2, p: 2 }}>
                  <Typography color="#991b1b">
                    Your account was not approved. Please contact support for more information.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Dashboard Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          variant="fullWidth"
          sx={{ mb: 4 }}
        >
          {tabLabels.map((label, idx) => (
            <Tab key={idx} label={label} />
          ))}
        </Tabs>

        {/* Profile Tab */}
        {tabIndex === 0 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
            {/* Personal Information */}
            <Card>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="medium" />
                    <Typography variant="h6">Personal Information</Typography>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PersonIcon fontSize="small" color="disabled" />
                  <Box>
                    <Typography fontWeight={500}>{provider.name}</Typography>
                    <Typography fontSize={13} color="text.secondary">Full Name</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <MailIcon fontSize="small" color="disabled" />
                  <Box>
                    <Typography fontWeight={500}>{provider.email}</Typography>
                    <Typography fontSize={13} color="text.secondary">Email Address</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PhoneIcon fontSize="small" color="disabled" />
                  <Box>
                    <Typography fontWeight={500}>{provider.phone}</Typography>
                    <Typography fontSize={13} color="text.secondary">Phone Number</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CalendarTodayIcon fontSize="small" color="disabled" />
                  <Box>
                    <Typography fontWeight={500}>
                      {new Date(provider.created_at).toLocaleDateString()}
                    </Typography>
                    <Typography fontSize={13} color="text.secondary">Member Since</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon fontSize="medium" />
                    <Typography variant="h6">Business Information</Typography>
                  </Box>
                }
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <BusinessIcon fontSize="small" color="disabled" />
                  <Box>
                    <Typography fontWeight={500}>{provider.company_name}</Typography>
                    <Typography fontSize={13} color="text.secondary">Company Name</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <SettingsIcon fontSize="small" color="disabled" />
                  <Box>
                    <Typography fontWeight={500}>{provider.service_type}</Typography>
                    <Typography fontSize={13} color="text.secondary">Service Type</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <LocationOnIcon fontSize="small" color="disabled" />
                  <Box>
                    <Typography fontWeight={500}>{provider.location}</Typography>
                    <Typography fontSize={13} color="text.secondary">Location</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <BarChartIcon fontSize="small" color="disabled" />
                  <Box>
                    <Typography fontWeight={500}>{provider.experience_years} years</Typography>
                    <Typography fontSize={13} color="text.secondary">Experience</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Business Description */}
        {tabIndex === 0 && (
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Business Description" />
            <CardContent>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {provider.description}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {tabIndex === 1 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            <Card>
              <CardHeader title={<Typography fontSize={15}>Total Views</Typography>} />
              <CardContent>
                <Typography variant="h4" fontWeight="bold">2,847</Typography>
                <Typography fontSize={13} color="text.secondary">+12% from last month</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title={<Typography fontSize={15}>Bookings</Typography>} />
              <CardContent>
                <Typography variant="h4" fontWeight="bold">142</Typography>
                <Typography fontSize={13} color="text.secondary">+8% from last month</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title={<Typography fontSize={15}>Rating</Typography>} />
              <CardContent>
                <Typography variant="h4" fontWeight="bold">4.8</Typography>
                <Typography fontSize={13} color="text.secondary">Based on 89 reviews</Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Bookings Tab */}
        {tabIndex === 2 && (
          <Card>
            <CardHeader title="Recent Bookings" subheader="Your latest booking requests and appointments" />
            <CardContent>
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <GroupIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">No bookings yet</Typography>
                <Typography fontSize={13} color="text.secondary">
                  Once customers start booking your services, they'll appear here.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {tabIndex === 3 && (
          <Card>
            <CardHeader title="Account Settings" subheader="Manage your account preferences and settings" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="outlined" fullWidth startIcon={<SettingsIcon />}>
                  Edit Profile Information
                </Button>
                <Button variant="outlined" fullWidth startIcon={<MailIcon />}>
                  Notification Preferences
                </Button>
                <Button variant="outlined" fullWidth startIcon={<BusinessIcon />}>
                  Business Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default ProviderDashboard;