/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useToast } from '@/hooks/use-toast';
import ServiceCard from "../ui-sections/ServiceCard";
import AuthModal from '../auth/AuthModal';
import ChatModal from '../ui-sections/ChatModal';
import BookingModal from '../ui-sections/BookingModal';

const mockProviders = [
  {
    id: '1',
    name: 'Sarah Johnson',
    businessName: 'Elite Interior Design',
    category: 'house-interior',
    rating: 4.9,
    reviewCount: 127,
    location: 'Mumbai, Maharashtra',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80',
    description: 'Transform your space with modern, elegant interior designs tailored to your lifestyle.',
    price: '₹15,000/room',
    verified: true
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    businessName: 'AutoCraft Modifications',
    category: 'automotive',
    rating: 4.8,
    reviewCount: 89,
    location: 'Delhi, NCR',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=400&q=80',
    description: 'Professional car modifications and customization services with premium quality parts.',
    price: '₹25,000+',
    verified: true
  },
  {
    id: '3',
    name: 'Priya Sharma',
    businessName: 'Personalized Gifts Co.',
    category: 'gifts-customisation',
    rating: 4.7,
    reviewCount: 156,
    location: 'Bangalore, Karnataka',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80',
    description: 'Create memorable personalized gifts for your loved ones with our custom crafting services.',
    price: '₹500+',
    verified: true
  },
  {
    id: '4',
    name: 'Meera Patel',
    businessName: 'Fashion Forward',
    category: 'women-wear-customisation',
    rating: 4.9,
    reviewCount: 203,
    location: 'Ahmedabad, Gujarat',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
    description: 'Custom tailored women\'s clothing and fashion consulting for the modern woman.',
    price: '₹3,000+',
    verified: true
  },
  {
    id: '5',
    name: 'Vikram Singh',
    businessName: 'BuildCraft Construction',
    category: 'house-construction',
    rating: 4.6,
    reviewCount: 78,
    location: 'Pune, Maharashtra',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80',
    description: 'Complete construction and renovation services with modern architectural solutions.',
    price: '₹500/sq.ft',
    verified: true
  },
  {
    id: '6',
    name: 'Anita Reddy',
    businessName: 'TechSolutions Pro',
    category: 'business-services',
    rating: 4.8,
    reviewCount: 134,
    location: 'Hyderabad, Telangana',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
    description: 'Custom software development and IT consulting services for businesses of all sizes.',
    price: '₹50,000+',
    verified: true
  },
  {
    id: '7',
    name: 'Rohit Gupta',
    businessName: 'Modern Spaces',
    category: 'house-interior',
    rating: 4.7,
    reviewCount: 91,
    location: 'Chennai, Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80',
    description: 'Minimalist interior design solutions that blend functionality with aesthetic appeal.',
    price: '₹12,000/room',
    verified: true
  },
  {
    id: '8',
    name: 'Kavya Nair',
    businessName: 'Artisan Gifts',
    category: 'gifts-customisation',
    rating: 4.9,
    reviewCount: 167,
    location: 'Kochi, Kerala',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80',
    description: 'Handcrafted personalized gifts and custom art pieces for special occasions.',
    price: '₹800+',
    verified: true
  },
  {
    id: '9',
    name: 'Arjun Mishra',
    businessName: 'Canvas & Brush Studio',
    category: 'art-painting',
    rating: 4.8,
    reviewCount: 92,
    location: 'Jaipur, Rajasthan',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=400&q=80',
    description: 'Custom paintings, murals, and artistic creations for homes and businesses.',
    price: '₹2,500+',
    verified: true
  }
];

const categoryMap = {
  'house-interior': 'House Interior',
  'gifts-customisation': 'Gifts Customisation',
  'automotive': 'Automotive',
  'women-wear-customisation': 'Women Wear Customisation',
  'house-construction': 'House Construction',
  'business-services': 'Business Services',
  'art-painting': 'Art & Painting'
};

const categories = ['All', 'House Interior', 'Automotive', 'Gifts Customisation', 'Women Wear Customisation', 'House Construction', 'Business Services', 'Art & Painting'];

const Services = () => {
  const navigate = useNavigate();
  // const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [providers, setProviders] = useState(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Modal states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }

    // Handle category filter from URL parameters
    const categoryParam = searchParams.get('category');
    if (categoryParam && categoryMap[categoryParam]) {
      const categoryName = categoryMap[categoryParam];
      setSelectedCategory(categoryName);
      filterProviders('', categoryName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProviders(term, selectedCategory);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterProviders(searchTerm, category);
  };

  const filterProviders = (term, category) => {
    let filtered = providers;

    if (category !== 'All') {
      // Convert display name back to category key for filtering
      const categoryKey = Object.entries(categoryMap).find(([value]) => value === category)?.[0];
      if (categoryKey) {
        filtered = filtered.filter(provider => provider.category === categoryKey);
      }
    }

    if (term) {
      filtered = filtered.filter(provider =>
        provider.businessName.toLowerCase().includes(term.toLowerCase()) ||
        categoryMap[provider.category]?.toLowerCase().includes(term.toLowerCase()) ||
        provider.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredProviders(filtered);
  };

  const handleChatClick = (provider) => {
    if (!isAuthenticated) {
      setSelectedProvider(provider);
      setPendingAction('chat');
      setShowAuthModal(true);
      return;
    }
    setSelectedProvider(provider);
    setShowChatModal(true);
  };

  const handleCallClick = (provider) => {
    if (!isAuthenticated) {
      setSelectedProvider(provider);
      setPendingAction('call');
      setShowAuthModal(true);
      return;
    }
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    // toast({
    //   title: "Signed out",
    //   description: "You've been signed out successfully.",
    // });
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Handle pending action after authentication
    if (pendingAction && selectedProvider) {
      if (pendingAction === 'chat') {
        setShowChatModal(true);
      } else if (pendingAction === 'call') {
        setShowBookingModal(true);
      }
      setPendingAction(null);
    }

    // toast({
    //   title: "Welcome!",
    //   description: "You're now signed in and can access all features.",
    // });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F3F4F6' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#fff', boxShadow: 1, borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 6 }, py: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              sx={{ fontWeight: 500 }}
            >
              Back
            </Button>
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PersonIcon sx={{ color: 'primary.main' }} />
                <Typography variant="body2">Welcome, {user?.name || user?.email}</Typography>
                <Button variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Button variant="contained" onClick={() => setShowAuthModal(true)}>
                Sign In
              </Button>
            )}
          </Box>
          <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
            Available Services
          </Typography>
          <Typography color="text.secondary">
            Connect with verified professionals across various categories
          </Typography>
        </Box>
      </Box>

      {/* Filters */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 6 }, py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
          <TextField
            placeholder="Search services, businesses, or categories..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'grey.500' }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FilterListIcon sx={{ color: 'grey.600' }} />
            <Select
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              displayEmpty
              sx={{ minWidth: 180 }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Results count */}
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Showing {filteredProviders.length} service{filteredProviders.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </Typography>

        {/* Service providers grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
          gap: 3,
        }}>
          {filteredProviders.map((provider) => (
            <ServiceCard
              key={provider.id}
              provider={provider}
              onChatClick={handleChatClick}
              onCallClick={handleCallClick}
            />
          ))}
        </Box>

        {filteredProviders.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="grey.500" variant="h6" sx={{ mb: 2 }}>No services found</Typography>
            <Typography color="text.secondary">Try adjusting your search or filter criteria</Typography>
          </Box>
        )}
      </Box>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingAction(null);
          setSelectedProvider(null);
        }}
        onAuthenticated={handleAuthenticated}
      />

      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        provider={selectedProvider}
      />

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        provider={selectedProvider}
      />
    </Box>
  );
};

export default Services;