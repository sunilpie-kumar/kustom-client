import {
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Chip,
  Avatar,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import PhoneIcon from '@mui/icons-material/Phone';

const ServiceCard = ({ provider, onChatClick, onCallClick }) => {
  return (
    <Card
      sx={{
        transition: 'all 0.3s',
        boxShadow: 2,
        '&:hover': {
          boxShadow: 8,
          transform: 'translateY(-8px)',
        },
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <img
          src={provider.image}
          alt={provider.businessName}
          style={{
            width: '100%',
            height: 192,
            objectFit: 'cover',
            transition: 'transform 0.3s',
          }}
        />
        {provider.verified && (
          <Chip
            label="✓ Verified"
            color="success"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 600,
              zIndex: 2,
            }}
          />
        )}
        <Chip
          label={provider.category}
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            fontWeight: 600,
            bgcolor: 'primary.main',
            color: '#fff',
            zIndex: 2,
          }}
        />
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Box>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            {provider.businessName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {provider.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <StarIcon sx={{ color: '#F59E42', fontSize: 18 }} />
          <Typography variant="body2" fontWeight="bold">
            {provider.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({provider.reviewCount} reviews)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, color: 'text.secondary' }}>
          <LocationOnIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">{provider.location}</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
          {provider.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 1 }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {provider.price}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<PhoneIcon fontSize="small" />}
              onClick={() => onCallClick(provider)}
            >
              Call
            </Button>
            <Button
              size="small"
              variant="contained"
              color="warning"
              startIcon={<MessageIcon fontSize="small" />}
              onClick={() => onChatClick(provider)}
              sx={{
                bgcolor: '#F59E42',
                color: '#fff',
                '&:hover': { bgcolor: '#F59E42' },
              }}
            >
              Chat
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;