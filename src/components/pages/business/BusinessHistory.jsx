import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Tabs,
  Tab,
  Chip,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const upcomingAppointments = [
  {
    id: 1,
    customer: 'John Doe',
    type: 'video',
    date: '2025-05-28',
    time: '10:00 AM',
    service: 'Kitchen Renovation Consultation'
  },
  {
    id: 2,
    customer: 'Sarah Smith',
    type: 'in-person',
    date: '2025-05-29',
    time: '2:00 PM',
    service: 'Living Room Design'
  }
];

const previousOrders = [
  {
    id: 1,
    customer: 'Mike Johnson',
    service: 'Bedroom Interior Design',
    date: '2025-05-20',
    amount: '$2,500',
    status: 'completed'
  },
  {
    id: 2,
    customer: 'Emily Davis',
    service: 'Home Office Setup',
    date: '2025-05-15',
    amount: '$1,800',
    status: 'completed'
  }
];

const quotations = [
  {
    id: 1,
    customer: 'Robert Wilson',
    service: 'Full House Renovation',
    date: '2025-05-25',
    amount: '$15,000',
    status: 'pending'
  },
  {
    id: 2,
    customer: 'Lisa Brown',
    service: 'Bathroom Remodel',
    date: '2025-05-22',
    amount: '$5,200',
    status: 'accepted'
  }
];

const tabLabels = ['Appointments', 'Orders', 'Quotations', 'Analytics'];

const BusinessHistory = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', py: 6 }}>
      <Card sx={{ mb: 4 }}>
        <CardHeader
          title={<Typography variant="h5" fontWeight="bold">Business Dashboard</Typography>}
          subheader="Manage your appointments, orders, and business activities"
        />
      </Card>

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

      {/* Appointments Tab */}
      {tabIndex === 0 && (
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarTodayIcon sx={{ fontSize: 20 }} />
                <Typography fontWeight="bold">Upcoming Appointments</Typography>
              </Box>
            }
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {upcomingAppointments.map((appointment) => (
                <Box key={appointment.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, border: '1px solid #E5E7EB', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {appointment.type === 'video' ? (
                      <VideoCallIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    ) : (
                      <AccessTimeIcon sx={{ color: 'success.main', fontSize: 28 }} />
                    )}
                    <Box>
                      <Typography fontWeight="bold">{appointment.customer}</Typography>
                      <Typography variant="body2" color="text.secondary">{appointment.service}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.date} at {appointment.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={appointment.type === 'video' ? 'Video Call' : 'In Person'}
                    color={appointment.type === 'video' ? 'primary' : 'success'}
                    variant="outlined"
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Orders Tab */}
      {tabIndex === 1 && (
        <Card sx={{ mb: 4 }}>
          <CardHeader title="Order History" />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {previousOrders.map((order) => (
                <Box key={order.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, border: '1px solid #E5E7EB', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircleIcon sx={{ color: 'success.main', fontSize: 28 }} />
                    <Box>
                      <Typography fontWeight="bold">{order.customer}</Typography>
                      <Typography variant="body2" color="text.secondary">{order.service}</Typography>
                      <Typography variant="body2" color="text.secondary">{order.date}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography fontWeight="bold" color="success.main">{order.amount}</Typography>
                    <Chip label="Completed" color="success" variant="outlined" />
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Quotations Tab */}
      {tabIndex === 2 && (
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FileCopyIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                <Typography fontWeight="bold">Quotations</Typography>
              </Box>
            }
          />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {quotations.map((quote) => (
                <Box key={quote.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, border: '1px solid #E5E7EB', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FileCopyIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                    <Box>
                      <Typography fontWeight="bold">{quote.customer}</Typography>
                      <Typography variant="body2" color="text.secondary">{quote.service}</Typography>
                      <Typography variant="body2" color="text.secondary">{quote.date}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography fontWeight="bold">{quote.amount}</Typography>
                    <Chip
                      label={quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      color={quote.status === 'accepted' ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Analytics Tab */}
      {tabIndex === 3 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
          <Card>
            <CardHeader title={<Typography fontWeight="bold">Total Orders</Typography>} />
            <CardContent>
              <Typography variant="h3" fontWeight="bold" color="primary.main">24</Typography>
              <Typography variant="body2" color="text.secondary">This month</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title={<Typography fontWeight="bold">Revenue</Typography>} />
            <CardContent>
              <Typography variant="h3" fontWeight="bold" color="success.main">$12,450</Typography>
              <Typography variant="body2" color="text.secondary">This month</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title={<Typography fontWeight="bold">Pending Quotes</Typography>} />
            <CardContent>
              <Typography variant="h3" fontWeight="bold" color="warning.main">7</Typography>
              <Typography variant="body2" color="text.secondary">Awaiting response</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default BusinessHistory;