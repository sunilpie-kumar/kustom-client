import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 20 },
        background: 'linear-gradient(90deg, #2563EB 0%, #F59E42 100%)',
        textAlign: 'center',
      }}
      component="section"
    >
      <Box sx={{ maxWidth: 800, mx: 'auto', px: { xs: 2, md: 8 } }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          color="#fff"
          sx={{
            mb: 3,
            fontSize: { xs: 32, md: 48 },
            lineHeight: 1.2,
          }}
        >
          Ready to Start Your
          <br />
          Custom Project?
        </Typography>

        <Typography
          variant="h6"
          color="rgba(255,255,255,0.9)"
          sx={{
            mb: 4,
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.5,
            fontSize: { xs: 18, md: 22 },
          }}
        >
          Join our community today and connect with verified professionals who will bring your vision to life.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', pt: 2 }}>
          <Button
            size="large"
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: '#2563EB',
              px: 6,
              py: 2,
              fontWeight: 600,
              fontSize: 18,
              borderRadius: 3,
              boxShadow: 4,
              transition: 'all 0.3s',
              '&:hover': {
                bgcolor: '#F3F4F6',
                boxShadow: 8,
                transform: 'scale(1.05)',
              },
            }}
          >
            Get Started Now
          </Button>
          <Button
            size="large"
            variant="outlined"
            onClick={() => navigate('/b2b')}
            sx={{
              border: '2px solid #fff',
              color: '#fff',
              px: 6,
              py: 2,
              fontWeight: 600,
              fontSize: 18,
              borderRadius: 3,
              transition: 'all 0.3s',
              '&:hover': {
                bgcolor: '#fff',
                color: '#2563EB',
              },
            }}
          >
            Join as Provider
          </Button>
        </Box>

        <Box sx={{ pt: 6, color: 'rgba(255,255,255,0.8)' }}>
          <Typography variant="body2" fontSize={14}>
            🔒 Secure • ✓ Verified Providers • 💬 24/7 Support
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CTASection;