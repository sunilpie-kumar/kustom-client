import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';
import { getFromServer } from '../../utils/axios';
import ApiList from '../pages/general/api-list';


const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern customized living room with contemporary furniture and elegant lighting design',
    category: 'House Decor',
  },
  {
    src: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80',
    alt: 'Professional custom automobile modification and detailing services',
    category: 'Automobile',
  },
  {
    src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80',
    alt: 'Handcrafted personalized gifts and custom engravings for special occasions',
    category: 'Gifts',
  },
  {
    src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=80',
    alt: "Custom fashion design and tailoring services for women's clothing",
    category: 'Women Wear',
  },
  {
    src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Professional construction and architectural design services',
    category: 'Construction',
  },
  {
    src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Technology consulting and digital transformation services',
    category: 'More Services',
  },
];

const HeroSection = () => {
  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    appendDots: dots => (
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
        {dots}
      </Box>
    ),
    customPaging: i => (
      <IconButton
        size="small"
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          bgcolor: currentSlide === i ? '#2563EB' : '#E5E7EB',
          transform: currentSlide === i ? 'scale(1.25)' : 'scale(1)',
          transition: 'all 0.3s',
          '&:hover': { bgcolor: '#2563EB' },
        }}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('categories-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(()=> {
    getAllUsers()
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await getFromServer(ApiList.API_URL_FOR_GET_PROVIDERS,{});
      console.log('Fetched providers:', response)
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #EFF6FF 0%, #FFF7ED 100%)',
        boxSizing: 'border-box',
      }}
      component="section"
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          zIndex: 0,
          background: 'radial-gradient(circle at 1px 1px, #6366F1 1px, transparent 0)',
          backgroundSize: '24px 24px',
          boxSizing: 'border-box',
        }}
      />
      <Box sx={{ width: '100%', maxWidth: 1600, mx: 'auto', px: { xs: 2, md: 8 }, position: 'relative', zIndex: 1, boxSizing: 'border-box' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 8, alignItems: 'center' }}>
          {/* Left Side */}
          <Box sx={{ flex: 1, py: { xs: 8, md: 12 } }}>
            <Box
              sx={{
                mb: 3,
                px: 2,
                py: 1,
                bgcolor: 'rgba(255,255,255,0.8)',
                borderRadius: 8,
                border: '1px solid #DBEAFE',
                boxShadow: 1,
                display: 'inline-flex',
                boxSizing: 'border-box',
              }}
            >
              <Typography variant="body2" sx={{ color: '#2563EB', fontWeight: 500 }}
              fontFamily='font-body'>
                ✨ India's #1 Customization Platform
              </Typography>
            </Box>
            <Typography
              variant="h1"
              fontWeight="bold"
              sx={{
                fontSize: { xs: 40, md: 72 },
                lineHeight: 1.1,
                mb: 2,
                background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #F59E42 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                fontFamily: 'font-heading',
              }}
            >
              Kustom
            </Typography>
            <Typography variant="h4"
              fontFamily="font-body"
              fontWeight="bold" sx={{ color: '#1e293b', mb: 2 }}>
              Kustomize your life
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: '#64748B', mb: 4, maxWidth: 600, lineHeight: 1.5 }}
            >
              Connect with verified businesses across home decor, automobiles, gifts, fashion, and construction. Get personalized solutions through seamless virtual consultations.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate('/services')}
                sx={{
                  background: 'linear-gradient(90deg, #2563EB 0%, #2563EB 100%)',
                  color: '#fff',
                  px: 6,
                  py: 2,
                  fontWeight: 600,
                  fontSize: 18,
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: 'all 0.3s',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1D4ED8 0%, #2563EB 100%)',
                    boxShadow: 8,
                    transform: 'scale(1.05)',
                  },
                  boxSizing: 'border-box',
                }}
                aria-label="Browse and find services from verified providers"
              >
                Find Services
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => navigate('/provider-auth')}
                sx={{
                  border: '2px solid #F59E42',
                  color: '#F59E42',
                  px: 6,
                  py: 2,
                  fontWeight: 600,
                  fontSize: 18,
                  borderRadius: 3,
                  transition: 'all 0.3s',
                  '&:hover': {
                    bgcolor: '#FFF7ED',
                    color: '#F59E42',
                  },
                  boxSizing: 'border-box',
                }}
                aria-label="Register as a service provider and join our platform"
              >
                Join as Provider
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 4, pt: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  textAlign: 'center',
                  p: 2,
                  bgcolor: 'rgba(255,255,255,0.6)',
                  borderRadius: 3,
                  minWidth: 120,
                  boxSizing: 'border-box',
                }}
              >
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#2563EB', mb: 1 }}>
                  500+
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
                  Verified Providers
                </Typography>
              </Paper>
              <Paper
                elevation={2}
                sx={{
                  textAlign: 'center',
                  p: 2,
                  bgcolor: 'rgba(255,255,255,0.6)',
                  borderRadius: 3,
                  minWidth: 120,
                  boxSizing: 'border-box',
                }}
              >
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#F59E42', mb: 1 }}>
                  10k+
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
                  Happy Customers
                </Typography>
              </Paper>
              <Paper
                elevation={2}
                sx={{
                  textAlign: 'center',
                  p: 2,
                  bgcolor: 'rgba(255,255,255,0.6)',
                  borderRadius: 3,
                  minWidth: 120,
                  boxSizing: 'border-box',
                }}
              >
                <Typography variant="h4" fontWeight="bold" sx={{ color: '#22C55E', mb: 1 }}>
                  4.8★
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
                  Average Rating
                </Typography>
              </Paper>
            </Box>
          </Box>
          {/* Right Side */}
          <Box sx={{ flex: 1, position: 'relative', minHeight: { xs: 300, lg: 400 }, maxWidth: '100%', boxSizing: 'border-box' }}>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: 6,
                background: 'linear-gradient(90deg, #DBEAFE 0%, #FDE68A 100%)',
                opacity: 0.5,
                zIndex: 0,
                transform: 'rotate(2deg)',
                filter: 'blur(8px)',
                boxSizing: 'border-box',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 8,
                borderRadius: 6,
                background: 'linear-gradient(90deg, #E9D5FF 0%, #FECACA 100%)',
                opacity: 0.3,
                zIndex: 0,
                transform: 'rotate(-1deg)',
                filter: 'blur(8px)',
                boxSizing: 'border-box',
              }}
            />
            <Box
              sx={{
                position: 'relative',
                bgcolor: 'rgba(255,255,255,0.9)',
                borderRadius: 6,
                boxShadow: 8,
                p: 3,
                zIndex: 1,
                transition: 'transform 0.5s',
                '&:hover': { transform: 'scale(1.05)' },
                border: '1px solid rgba(255,255,255,0.5)',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              <Box sx={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: -32,
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    boxShadow: 2,
                    '&:hover': { bgcolor: '#fff' },
                    transform: 'translateY(-50%)',
                    boxSizing: 'border-box',
                  }}
                  onClick={() => sliderRef.current.slickPrev()}
                  aria-label="Previous slide"
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 22, color: '#64748B' }} />
                </IconButton>
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: -32,
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    boxShadow: 2,
                    '&:hover': { bgcolor: '#fff' },
                    transform: 'translateY(-50%)',
                    boxSizing: 'border-box',
                  }}
                  onClick={() => sliderRef.current.slickNext()}
                  aria-label="Next slide"
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 22, color: '#64748B' }} />
                </IconButton>
                <Slider ref={sliderRef} {...settings}>
                  {heroImages.map((image, index) => (
                    <Box key={index} sx={{ position: 'relative', borderRadius: 4, overflow: 'hidden', width: '100%', height: '100%' }}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          maxWidth: '100%',
                          transition: 'transform 0.7s',
                          WebkitTransition: 'transform 0.7s',
                          MozTransition: 'transform 0.7s',
                        }}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 100%)',
                          boxSizing: 'border-box',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 24,
                          left: 24,
                          right: 24,
                          boxSizing: 'border-box',
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.95)',
                            borderRadius: 2,
                            p: 2,
                            boxShadow: 4,
                            boxSizing: 'border-box',
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{ color: '#1e293b', mb: 1 }}
                          >
                            {image.category}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#64748B',
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {image.alt}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Box>
            {/* Virtual Consultation CTA */}
            <Box
              sx={{
                position: 'absolute',
                bottom: -32,
                right: -32,
                background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
                color: '#fff',
                borderRadius: 4,
                boxShadow: 8,
                p: 3,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': { boxShadow: 12, transform: 'scale(1.05)' },
                boxSizing: 'border-box',
              }}
              onClick={() => navigate('/services')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/services')}
              aria-label="Book virtual consultation instantly"
            >
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                Virtual Consultation
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Book instantly →
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <IconButton
        sx={{
          position: 'absolute',
          bottom: 64,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(4px)',
          boxShadow: 4,
          p: 2,
          borderRadius: '50%',
          transition: 'all 0.3s',
          '&:hover': { bgcolor: '#fff' },
          boxSizing: 'border-box',
        }}
        onClick={scrollToNext}
        aria-label="Scroll to categories section"
      >
        <ArrowDownwardIcon sx={{ fontSize: 32, color: '#64748B' }} />
      </IconButton>
    </Box>
  );
};

export default HeroSection;