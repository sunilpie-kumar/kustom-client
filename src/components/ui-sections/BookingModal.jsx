import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { format } from 'date-fns';
// import Calendar from '@/components/ui/Calendar'; // Update this import if you have a MUI-compatible calendar

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

const BookingModal = ({ isOpen, onClose, provider }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;

    const bookingDetails = {
      provider: provider?.businessName,
      date: format(selectedDate, 'PPP'),
      time: selectedTime,
      customer: JSON.parse(localStorage.getItem('user') || '{}')
    };

    console.log('Booking confirmed:', bookingDetails);

    alert(`Booking confirmed with ${provider?.name} on ${format(selectedDate, 'PPP')} at ${selectedTime}`);

    onClose();
    setSelectedDate(null);
    setSelectedTime('');
  };

  if (!provider) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book a Call with {provider.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
            Select Date
          </Typography>
          {/* <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
          /> */}
        </Box>

        {selectedDate && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 2 }}>
              Select Time
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="time-slot-label">Choose a time slot</InputLabel>
              <Select
                labelId="time-slot-label"
                value={selectedTime}
                label="Choose a time slot"
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                {timeSlots.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} fullWidth>
          Cancel
        </Button>
        <Button
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime}
          variant="contained"
          fullWidth
        >
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;