import {
  Card,
  CardContent,
  Badge,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';

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
  },
  {
    id: 3,
    service: 'Car Customization Planning',
    provider: 'AutoCustom Pro',
    date: 'Dec 12, 2025',
    time: '3:00 PM - 4:30 PM',
    type: 'In Person',
    status: 'confirmed',
    location: 'Downtown Garage',
    price: '$200',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 4,
    service: 'Business Strategy Session',
    provider: 'Anita Reddy',
    date: 'Dec 15, 2025',
    time: '1:00 PM - 2:00 PM',
    type: 'Video Call',
    status: 'confirmed',
    location: 'Online',
    price: '$300',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=100&q=80'
  }
];

const BookingPage = ({ onBack }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 50%, #E0E7FF 100%)',
        py: 8,
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto', px: { xs: 2, md: 6 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
          <Box>
            <Typography variant="h3" fontWeight="bold" color="text.primary">
              My Bookings
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Manage your upcoming and past appointments
            </Typography>
          </Box>
          <Button onClick={onBack} variant="outlined">
            Back to Dashboard
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {bookingsData.map((booking) => (
            <Card
              key={booking.id}
              elevation={4}
              sx={{
                border: 0,
                boxShadow: 4,
                bgcolor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Avatar
                    src={booking.image}
                    alt={booking.service}
                    sx={{ width: 64, height: 64, borderRadius: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" fontWeight="bold" color="text.primary">
                        {booking.service}
                      </Typography>
                      <Chip
                        label={booking.status}
                        color={booking.status === 'confirmed' ? 'primary' : 'warning'}
                        variant="outlined"
                        sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: 'text.secondary', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon sx={{ fontSize: 18 }} />
                        <span>{booking.provider}</span>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarTodayIcon sx={{ fontSize: 18 }} />
                        <span>{booking.date}</span>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon sx={{ fontSize: 18 }} />
                        <span>{booking.time}</span>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, color: 'text.secondary' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {booking.type === 'Video Call' ? (
                            <VideoCallIcon sx={{ fontSize: 18 }} />
                          ) : (
                            <LocationOnIcon sx={{ fontSize: 18 }} />
                          )}
                          <span>{booking.location}</span>
                        </Box>
                        <span style={{ fontWeight: 600, color: '#222' }}>{booking.price}</span>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" size="small" startIcon={<MessageIcon />}>
                          Message
                        </Button>
                        {booking.type === 'Video Call' ? (
                          <Button size="small" variant="contained" startIcon={<VideoCallIcon />}>
                            Join Call
                          </Button>
                        ) : (
                          <Button size="small" variant="contained" startIcon={<PhoneIcon />}>
                            Call Provider
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BookingPage;