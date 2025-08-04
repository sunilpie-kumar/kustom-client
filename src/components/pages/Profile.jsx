import { useState } from 'react';
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
  TextField,
  Badge,
  Chip,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AwardIcon from '@mui/icons-material/EmojiEvents';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';

const userProfile = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joinDate: 'January 2024',
  rating: 4.8,
  totalBookings: 12,
  favoriteServices: 3,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
  bio: 'I love discovering unique service providers and creating beautiful spaces. Always looking for the next creative project!'
};

const bookingsData = [
  {
    id: 1,
    service: 'Interior Design Consultation',
    provider: 'Sarah Johnson',
    date: 'Dec 8, 2025',
    time: '2:00 PM - 3:00 PM',
    type: 'Video Call',
    status: 'confirmed',
    location: 'Online',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    service: 'Custom Gift Consultation',
    provider: 'Mike Wilson',
    date: 'Dec 10, 2025',
    time: '10:00 AM - 11:00 AM',
    type: 'In Person',
    status: 'pending',
    location: 'Arts District Studio',
    price: '$80',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=100&q=80'
  }
];

const conversationsData = [
  {
    id: 1,
    provider: 'Sarah Johnson',
    service: 'Interior Design',
    lastMessage: 'I\'ve prepared some initial sketches for your living room. Would you like to schedule a call to discuss them?',
    timestamp: '2 hours ago',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6be4d1e?auto=format&fit=crop&w=50&q=80'
  },
  {
    id: 2,
    provider: 'Mike Wilson',
    service: 'Custom Gifts',
    lastMessage: 'Perfect! I\'ll start working on the personalized photo album. Expected completion is next week.',
    timestamp: '1 day ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&q=80'
  }
];

const recentActivity = [
  {
    id: 1,
    action: 'Completed consultation',
    provider: 'Sarah Johnson',
    service: 'Interior Design Consultation',
    date: '2 days ago'
  },
  {
    id: 2,
    action: 'Left a review',
    provider: 'Mike Wilson',
    service: 'Custom Gift Creation',
    date: '1 week ago'
  },
  {
    id: 3,
    action: 'Booked service',
    provider: 'AutoCustom Pro',
    service: 'Car Customization',
    date: '2 weeks ago'
  },
  {
    id: 4,
    action: 'Added to favorites',
    provider: 'Anita Reddy',
    service: 'Business Strategy',
    date: '3 weeks ago'
  }
];

const tabLabels = ['Personal Info', 'My Bookings', 'Messages', 'Activity'];

const ProfilePage = ({ onBack }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 50%, #E0E7FF 100%)', py: 6 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 6 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">My Profile</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>Manage your account and preferences</Typography>
          </Box>
          <Button onClick={onBack} variant="outlined">
            Back to Dashboard
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 3fr' }, gap: 4 }}>
          {/* Profile Summary */}
          <Card elevation={3} sx={{ border: 0, boxShadow: 3, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)' }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                <Avatar src={userProfile.avatar} alt={userProfile.name} sx={{ width: 96, height: 96, mx: 'auto' }} />
                <Button
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    borderRadius: '50%',
                    minWidth: 0,
                    width: 32,
                    height: 32,
                    p: 0,
                    bgcolor: 'primary.light'
                  }}
                >
                  <CameraAltIcon sx={{ fontSize: 18 }} />
                </Button>
              </Box>
              <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>{userProfile.name}</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>{userProfile.email}</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold" color="primary.main">{userProfile.totalBookings}</Typography>
                  <Typography variant="caption" color="text.secondary">Bookings</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold" color="warning.main">{userProfile.rating}</Typography>
                  <Typography variant="caption" color="text.secondary">Rating</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold" color="error.main">{userProfile.favoriteServices}</Typography>
                  <Typography variant="caption" color="text.secondary">Favorites</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: 14, color: 'text.secondary' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 18 }} />
                  <span>{userProfile.location}</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <CalendarTodayIcon sx={{ fontSize: 18 }} />
                  <span>Joined {userProfile.joinDate}</span>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Box>
            <Tabs
              value={tabIndex}
              onChange={(_, newValue) => setTabIndex(newValue)}
              variant="fullWidth"
              sx={{ mb: 4 }}
            >
              {tabLabels.map((label) => (
                <Tab key={label} label={label} />
              ))}
            </Tabs>

            {/* Personal Info Tab */}
            {tabIndex === 0 && (
              <Card elevation={3} sx={{ border: 0, boxShadow: 3, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', mb: 4 }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EditIcon sx={{ fontSize: 20 }} />
                      <Typography fontWeight="bold">Personal Information</Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                    <TextField label="Full Name" defaultValue={userProfile.name} fullWidth />
                    <TextField label="Email" type="email" defaultValue={userProfile.email} fullWidth />
                    <TextField label="Phone" defaultValue={userProfile.phone} fullWidth />
                    <TextField label="Location" defaultValue={userProfile.location} fullWidth />
                  </Box>
                  <TextField
                    label="Bio"
                    defaultValue={userProfile.bio}
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" fullWidth>Save Changes</Button>
                </CardContent>
              </Card>
            )}

            {/* Bookings Tab */}
            {tabIndex === 1 && (
              <Card elevation={3} sx={{ border: 0, boxShadow: 3, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', mb: 4 }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarTodayIcon sx={{ fontSize: 20 }} />
                      <Typography fontWeight="bold">My Bookings</Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {bookingsData.map((booking) => (
                      <Box key={booking.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 2 }}>
                        <img
                          src={booking.image}
                          alt={booking.service}
                          style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover' }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography fontWeight="bold">{booking.service}</Typography>
                            <Chip label={booking.status} color={booking.status === 'confirmed' ? 'primary' : 'warning'} />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 14, color: 'text.secondary', mb: 1 }}>
                            <PersonIcon sx={{ fontSize: 16 }} />
                            <span>{booking.provider}</span>
                            <CalendarTodayIcon sx={{ fontSize: 16 }} />
                            <span>{booking.date}</span>
                            <AccessTimeIcon sx={{ fontSize: 16 }} />
                            <span>{booking.time}</span>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 14, color: 'text.secondary' }}>
                              {booking.type === 'Video Call' ? (
                                <VideoCallIcon sx={{ fontSize: 16 }} />
                              ) : (
                                <LocationOnIcon sx={{ fontSize: 16 }} />
                              )}
                              <span>{booking.location}</span>
                              <span style={{ fontWeight: 600, color: '#222' }}>{booking.price}</span>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button variant="outlined" size="small" startIcon={<MessageIcon />}>Message</Button>
                              <Button variant="contained" size="small">
                                {booking.type === 'Video Call' ? 'Join Call' : 'Call Provider'}
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Messages Tab */}
            {tabIndex === 2 && (
              <Card elevation={3} sx={{ border: 0, boxShadow: 3, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', mb: 4 }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MessageIcon sx={{ fontSize: 20 }} />
                      <Typography fontWeight="bold">Recent Messages</Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {conversationsData.map((conversation) => (
                      <Box key={conversation.id} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Avatar src={conversation.avatar} alt={conversation.provider} sx={{ width: 40, height: 40 }} />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography fontWeight="bold" noWrap>{conversation.provider}</Typography>
                              {conversation.unread > 0 && (
                                <Badge color="primary" badgeContent={conversation.unread} />
                              )}
                            </Box>
                            <Typography variant="body2" color="text.secondary" noWrap>{conversation.service}</Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>{conversation.lastMessage}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">{conversation.timestamp}</Typography>
                          <Button variant="outlined" size="small">Reply</Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        fullWidth
                        size="small"
                        onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button onClick={handleSendMessage} size="small">
                                <SendIcon sx={{ fontSize: 18 }} />
                              </Button>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Activity Tab */}
            {tabIndex === 3 && (
              <Card elevation={3} sx={{ border: 0, boxShadow: 3, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', mb: 4 }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: 20 }} />
                      <Typography fontWeight="bold">Recent Activity</Typography>
                    </Box>
                  }
                />
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {recentActivity.map((activity) => (
                      <Box key={activity.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 2 }}>
                        <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 2 }}>
                          <AwardIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.primary">
                            <span style={{ fontWeight: 600 }}>{activity.action}</span> with {activity.provider}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">{activity.service}</Typography>
                          <Typography variant="caption" color="text.secondary">{activity.date}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;