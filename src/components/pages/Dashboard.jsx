import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Button,
  Avatar,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import GiftIcon from '@mui/icons-material/CardGiftcard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShieldIcon from '@mui/icons-material/Security';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaletteIcon from '@mui/icons-material/Palette';
import GroupIcon from '@mui/icons-material/Group';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');

  // Sample data for search suggestions
  const searchData = [
    // Categories
    { type: 'category', value: 'house-interior', label: 'House Interior', icon: <HomeIcon /> },
    { type: 'category', value: 'gifts-customisation', label: 'Gifts Customisation', icon: <GiftIcon /> },
    { type: 'category', value: 'automotive', label: 'Automotive', icon: <DirectionsCarIcon /> },
    { type: 'category', value: 'house-construction', label: 'House Construction', icon: <BusinessIcon /> },
    { type: 'category', value: 'business-services', label: 'Business Services', icon: <WorkIcon /> },
    { type: 'category', value: 'women-wear-customisation', label: 'Women Wear Customisation', icon: <CheckroomIcon /> },
    { type: 'category', value: 'tattoo', label: 'Tattoo', icon: <PaletteIcon /> },
    { type: 'category', value: 'mens-wear-customisation', label: 'Mens Wear Customisation', icon: <GroupIcon /> },
    { type: 'category', value: 'art-painting', label: 'Art & Painting', icon: <FormatPaintIcon /> },
    // Service Providers
    { type: 'provider', value: 'sarah-johnson', label: 'Sarah Johnson - Elite Interior Design', category: 'house-interior' },
    { type: 'provider', value: 'rajesh-kumar', label: 'Rajesh Kumar - AutoCraft Modifications', category: 'automotive' },
    { type: 'provider', value: 'priya-sharma', label: 'Priya Sharma - Personalized Gifts Co.', category: 'gifts-customisation' },
    { type: 'provider', value: 'meera-patel', label: 'Meera Patel - Fashion Forward', category: 'women-wear-customisation' },
    { type: 'provider', value: 'vikram-singh', label: 'Vikram Singh - BuildCraft Construction', category: 'house-construction' },
    { type: 'provider', value: 'anita-reddy', label: 'Anita Reddy - TechSolutions Pro', category: 'business-services' },
    { type: 'provider', value: 'arjun-mishra', label: 'Arjun Mishra - Canvas & Brush Studio', category: 'art-painting' },
  ];

  const serviceCategories = [
    {
      icon: <HomeIcon style={{ color: '#2563EB' }} />,
      label: 'House Interior',
      count: '120+ providers',
      color: '#2563EB',
      category: 'house-interior',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80',
      description: 'Transform your space with expert interior designers',
      trending: true
    },
    {
      icon: <GiftIcon style={{ color: '#059669' }} />,
      label: 'Gifts Customisation',
      count: '85+ providers',
      color: '#059669',
      category: 'gifts-customisation',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=600&q=80',
      description: 'Create unique personalized gifts for every occasion'
    },
    {
      icon: <DirectionsCarIcon style={{ color: '#DC2626' }} />,
      label: 'Automotive',
      count: '45+ providers',
      color: '#DC2626',
      category: 'automotive',
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=600&q=80',
      description: 'Custom car modifications and detailing services'
    },
    {
      icon: <BusinessIcon style={{ color: '#DB2777' }} />,
      label: 'House Construction',
      count: '95+ providers',
      color: '#DB2777',
      category: 'house-construction',
      image: 'https://images.unsplash.com/photo-1541889677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
      description: 'Build your dream home with trusted contractors'
    },
    {
      icon: <WorkIcon style={{ color: '#4338CA' }} />,
      label: 'Business Services',
      count: '60+ providers',
      color: '#4338CA',
      category: 'business-services',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80',
      description: 'Professional services to grow your business'
    },
    {
      icon: <CheckroomIcon style={{ color: '#7C3AED' }} />,
      label: 'Women Wear Customisation',
      count: '75+ providers',
      color: '#7C3AED',
      category: 'women-wear-customisation',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
      description: 'Custom fashion designs and tailoring services'
    },
    {
      icon: <PaletteIcon style={{ color: '#F59E42' }} />,
      label: 'Tattoo',
      count: '30+ providers',
      color: '#F59E42',
      category: 'tattoo',
      image: 'https://images.unsplash.com/photo-1611501275019-9b5cda994ac4?auto=format&fit=crop&w=600&q=80',
      description: 'Professional tattoo artists and custom designs'
    },
    {
      icon: <GroupIcon style={{ color: '#14B8A6' }} />,
      label: 'Mens Wear Customisation',
      count: '65+ providers',
      color: '#14B8A6',
      category: 'mens-wear-customisation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      description: 'Custom tailoring and fashion for men'
    },
    {
      icon: <FormatPaintIcon style={{ color: '#F59E42' }} />,
      label: 'Art & Painting',
      count: '40+ providers',
      color: '#F59E42',
      category: 'art-painting',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80',
      description: 'Custom paintings, murals, and artistic creations'
    }
  ];

  const upcomingAppointments = [
    {
      service: 'Interior Design Consultation',
      provider: 'Sarah Johnson',
      date: 'Today, 2:00 PM',
      status: 'confirmed'
    },
    {
      service: 'Custom Gift Creation',
      provider: 'Mike Wilson',
      date: 'Tomorrow, 10:00 AM',
      status: 'pending'
    },
    {
      service: 'Car Customization',
      provider: 'AutoCustom Pro',
      date: 'Dec 8, 3:00 PM',
      status: 'confirmed'
    }
  ];

  const newProviders = [
    {
      name: 'Elena Rodriguez',
      service: 'Interior Design',
      location: 'Downtown',
      rating: 'New',
      experience: '8+ years',
      specialties: ['Modern Design', 'Space Planning'],
      joinedDate: '2 days ago',
      verified: true
    },
    {
      name: 'CustomCraft Solutions',
      service: 'Gift Customization',
      location: 'Arts District',
      rating: 'New',
      experience: '5+ years',
      specialties: ['Personalized Gifts', 'Custom Engravings'],
      joinedDate: '1 week ago',
      verified: true
    },
    {
      name: 'BuildRight Construction',
      service: 'House Construction',
      location: 'Suburban Area',
      rating: 'New',
      experience: '10+ years',
      specialties: ['Modern Homes', 'Eco-Friendly Building'],
      joinedDate: '3 days ago',
      verified: false
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/services?category=${category}`);
  };

  const handleSearchSelect = (item) => {
    setOpen(false);
    if (item.type === 'category') {
      navigate(`/services?category=${item.value}`);
    } else if (item.type === 'provider') {
      navigate(`/services?category=${item.category}&provider=${item.value}`);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Show profile page
  if (currentView === 'profile') {
    return <Profile onBack={handleBackToDashboard} />;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 50%, #E0E7FF 100%)' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'rgba(255,255,255,0.9)', borderBottom: 1, borderColor: 'divider', backdropFilter: 'blur(4px)', position: 'sticky', top: 0, zIndex: 40 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 48,
              height: 48,
              bgcolor: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 2
            }}>
              <Typography sx={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>K</Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{
                background: 'linear-gradient(90deg, #1e293b 0%, #2563EB 50%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Welcome back, John!
              </Typography>
              <Typography color="text.secondary">Discover trusted service providers in your area</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#DBEAFE', borderRadius: 2, minWidth: 100 }}>
                <Typography variant="h6" sx={{ color: '#2563EB', fontWeight: 'bold' }}>12</Typography>
                <Typography variant="body2" color="text.secondary">Services Booked</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#D1FAE5', borderRadius: 2, minWidth: 100 }}>
                <Typography variant="h6" sx={{ color: '#059669', fontWeight: 'bold' }}>3</Typography>
                <Typography variant="body2" color="text.secondary">Active Requests</Typography>
              </Box>
            </Box>
            <IconButton aria-label="View notifications" sx={{ position: 'relative' }}>
              <NotificationsIcon sx={{ color: '#64748B' }} />
              <Chip label="2" color="error" size="small" sx={{ position: 'absolute', top: 0, right: 0, fontSize: 10, height: 18 }} />
            </IconButton>
            <IconButton aria-label="Settings">
              <SettingsIcon sx={{ color: '#64748B' }} />
            </IconButton>
            <IconButton aria-label="View profile" onClick={() => setCurrentView('profile')}>
              <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" alt="John Doe profile picture" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 6, display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Left Column */}
        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Search Services */}
          <Card elevation={3} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(2px)' }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, bgcolor: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)', borderRadius: 2 }}>
                    <SearchIcon sx={{ color: '#fff' }} />
                  </Box>
                  <Typography variant="h6" color="text.primary">Search Services & Providers</Typography>
                </Box>
              }
            />
            <CardContent>
              <Button
                variant="outlined"
                onClick={() => setOpen(true)}
                sx={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  color: '#64748B',
                  height: 56,
                  bgcolor: '#F1F5F9',
                  borderRadius: 3,
                  fontSize: 18,
                  borderColor: '#E2E8F0',
                  mb: 1
                }}
              >
                <SearchIcon sx={{ mr: 2 }} />
                Search for services or providers...
              </Button>
            </CardContent>
          </Card>

          {/* Service Categories */}
          <Card elevation={3} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(2px)' }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUpIcon sx={{ color: '#059669' }} />
                  <Typography variant="h6" color="text.primary">Browse Service Categories</Typography>
                  <Chip label="9 Categories" sx={{ bgcolor: '#F1F5F9', color: '#64748B', fontWeight: 500 }} />
                </Box>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {serviceCategories.map((category, index) => (
                  <Box
                    key={index}
                    onClick={() => handleCategoryClick(category.category)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: '#fff',
                      borderRadius: 3,
                      boxShadow: 1,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { boxShadow: 4, transform: 'scale(1.01)' }
                    }}
                  >
                    <Box sx={{ position: 'relative', width: 120, height: 100, flexShrink: 0 }}>
                      <img
                        src={category.image}
                        alt={`${category.label} service preview`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
                        loading="lazy"
                      />
                      <Box sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        p: 1,
                        bgcolor: '#fff',
                        borderRadius: 2,
                        boxShadow: 1,
                        border: '1px solid #F1F5F9'
                      }}>
                        {category.icon}
                      </Box>
                      {category.trending && (
                        <Chip
                          label="Trending"
                          color="success"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
                            color: '#fff',
                            fontWeight: 500
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ flex: 1, p: 3 }}>
                      <Typography variant="h6" fontWeight="bold" color="text.primary">{category.label}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{category.description}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Chip label={category.count} sx={{ bgcolor: '#F1F5F9', color: '#64748B', fontWeight: 500 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748B' }}>
                          <Typography variant="body2" fontWeight={500} sx={{ mr: 1 }}>Explore</Typography>
                          <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Column */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Upcoming Appointments */}
          <Card elevation={2} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(2px)' }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AccessTimeIcon sx={{ color: '#2563EB' }} />
                  <Typography variant="h6" color="text.primary">Upcoming Appointments</Typography>
                </Box>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {upcomingAppointments.map((appointment, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: '#fff', borderRadius: 2, p: 2 }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>{appointment.service}</Typography>
                      <Typography variant="body2" color="text.secondary">{appointment.provider}</Typography>
                      <Typography variant="body2" color="text.secondary">{appointment.date}</Typography>
                    </Box>
                    <Chip
                      label={appointment.status}
                      color={appointment.status === 'confirmed' ? 'success' : 'warning'}
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                ))}
              </Box>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 3, fontWeight: 600 }}>
                View All Appointments
              </Button>
            </CardContent>
          </Card>

          {/* New Providers */}
          <Card elevation={3} sx={{ borderRadius: 4, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(2px)' }}>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PersonAddIcon sx={{ color: '#059669' }} />
                  <Typography variant="h6" color="text.primary">New Providers</Typography>
                  <Chip label="Fresh" color="success" size="small" sx={{ fontWeight: 500 }} />
                </Box>
              }
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {newProviders.map((provider, index) => (
                  <Box key={index} sx={{ bgcolor: '#fff', borderRadius: 2, p: 2, boxShadow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600}>{provider.name}</Typography>
                        {provider.verified && <ShieldIcon sx={{ color: '#2563EB', fontSize: 18 }} />}
                      </Box>
                      <Typography variant="caption" color="text.secondary">{provider.joinedDate}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">{provider.service} • {provider.location}</Typography>
                    <Typography variant="caption" color="text.secondary">{provider.experience} experience</Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 1 }}>
                      {provider.specialties.map((specialty, i) => (
                        <Chip key={i} label={specialty} size="small" sx={{ bgcolor: '#F1F5F9', color: '#64748B', fontWeight: 500 }} />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                      <Chip label={provider.rating} color="success" size="small" sx={{ fontWeight: 500 }} />
                      <Button variant="outlined" size="small">View Profile</Button>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Button variant="contained" color="success" fullWidth sx={{ mt: 3, fontWeight: 600 }}>
                Explore All New Providers
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Search Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SearchIcon />
            <Typography variant="h6">Search for services or providers</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for services or providers..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Categories</Typography>
          <List>
            {searchData.filter(item => item.type === 'category' && item.label.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
              <ListItem button key={item.value} onClick={() => handleSearchSelect(item)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Service Providers</Typography>
          <List>
            {searchData.filter(item => item.type === 'provider' && item.label.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
              <ListItem button key={item.value} onClick={() => handleSearchSelect(item)}>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;