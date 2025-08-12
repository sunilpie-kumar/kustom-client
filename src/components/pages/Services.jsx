/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import ServiceCard from "../ui-sections/ServiceCard"
// import AuthModal from "../auth/AuthModal"
import ChatModal from "../ui-sections/ChatModal"
import BookingModal from "../ui-sections/BookingModal"
import { ArrowLeft, Search, Filter, User, LogOut } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { RouteList } from "@/components/pages/general/paths"

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
    description: "Custom tailored women's clothing and fashion consulting for the modern woman.",
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
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [providers, setProviders] = useState(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Modal states
  // const [showAuthModal, setShowAuthModal] = useState(false);
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
      const categoryKey = Object.entries(categoryMap).find(([key, value]) => value === category)?.[0];
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

  const requireAuth = (next) => {
    if (!isAuthenticated) {
      setPendingAction(next);
      navigate(RouteList.AUTH);
      return false;
    }
    return true;
  }

  const handleChatClick = (provider) => {
    if (!requireAuth('chat')) return;
    setSelectedProvider(provider);
    setShowChatModal(true);
  };

  const handleCallClick = (provider) => {
    if (!requireAuth('call')) return;
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleOpenDetails = (provider) => {
    navigate(`/services/${provider.id}`, { state: { provider } })
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    toast({ title: "Signed out", description: "You've been signed out successfully." });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Welcome, {user?.name || user?.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => navigate(RouteList.AUTH)}>
                Sign In
              </Button>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Services</h1>
            <p className="text-gray-600">Connect with verified professionals across various categories</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search services, businesses, or categories..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 py-3"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProviders.length} service{filteredProviders.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Service providers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProviders.map((provider) => (
            <ServiceCard
              key={provider.id}
              provider={provider}
              onChatClick={handleChatClick}
              onCallClick={handleCallClick}
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No services found</div>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Auth centralized in /auth */}
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
    </div>
  );
};

export default Services;