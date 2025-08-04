import { Box, Typography, Link, Divider, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#111827', color: '#fff', py: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 8 } }}>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(90deg, #60A5FA 0%, #F59E42 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                CustomConnect
              </Typography>
              <Typography color="grey.400" sx={{ lineHeight: 1.6 }}>
                Connecting you with verified customization experts across all categories. Your vision, their expertise.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Categories</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['House Decor', 'Automobile', 'Gifts', 'Women Wear', 'Construction'].map((cat) => (
                <Box component="li" key={cat} sx={{ mb: 1 }}>
                  <Link href="#" underline="none" color="grey.400" sx={{
                    transition: 'color 0.2s',
                    '&:hover': { color: '#fff' }
                  }}>
                    {cat}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>For Providers</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Join as Provider', 'Provider Dashboard', 'Success Stories', 'Resources'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link href="#" underline="none" color="grey.400" sx={{
                    transition: 'color 0.2s',
                    '&:hover': { color: '#fff' }
                  }}>
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Support</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link href="#" underline="none" color="grey.400" sx={{
                    transition: 'color 0.2s',
                    '&:hover': { color: '#fff' }
                  }}>
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: '#1F2937', mb: 4 }} />
        <Box sx={{ textAlign: 'center', color: 'grey.400', pt: 2 }}>
          <Typography variant="body2">
            &copy; 2024 CustomConnect. All rights reserved. Built with ❤️ for creators and seekers.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;