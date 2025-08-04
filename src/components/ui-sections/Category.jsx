import { useRef, useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';

const categories = [
  {
    title: "House Decor",
    description: "Interior designers, furniture makers, and home stylists",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(to top, #3B82F6 80%, #2563EB 100%)"
  },
  {
    title: "Automobile",
    description: "Custom car shops, detailing services, and modifications",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(to top, #F59E42 80%, #EF4444 100%)"
  },
  {
    title: "Gifts",
    description: "Personalized gifts, custom crafts, and unique creations",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(to top, #A78BFA 80%, #EC4899 100%)"
  },
  {
    title: "Women Wear",
    description: "Fashion designers, tailors, and custom clothing makers",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(to top, #EC4899 80%, #F43F5E 100%)"
  },
  {
    title: "Construction",
    description: "Architects, contractors, and construction specialists",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(to top, #4B5563 80%, #374151 100%)"
  },
  {
    title: "Art & Painting",
    description: "Custom painters, murals, and artistic creations",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(to top, #F59E42 80%, #F97316 100%)"
  },
  {
    title: "More Services",
    description: "Discover other customization categories",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    gradient: "linear-gradient(to top, #22C55E 80%, #14B8A6 100%)"
  }
];

const Category = () => {
  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 1 }
      }
    ],
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

  return (
    <Box component="section" sx={{ py: 10, bgcolor: '#F3F4F6' }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" fontWeight="bold" color="text.primary" sx={{ mb: 2 }}>
            Explore Our Categories
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            From home transformation to automotive customization, find verified professionals 
            in every category to bring your vision to life.
          </Typography>
        </Box>
        <Box sx={{ position: 'relative' }}>
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
              display: { xs: 'none', md: 'flex' }
            }}
            onClick={() => sliderRef.current.slickPrev()}
            aria-label="Previous"
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
              display: { xs: 'none', md: 'flex' }
            }}
            onClick={() => sliderRef.current.slickNext()}
            aria-label="Next"
          >
            <ArrowForwardIosIcon sx={{ fontSize: 22, color: '#64748B' }} />
          </IconButton>
          <Slider ref={sliderRef} {...settings}>
            {categories.map((category, index) => (
              <Box key={category.title} sx={{ px: 2, py: 4 }}>
                <Card
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 4,
                    boxShadow: 4,
                    transition: 'transform 0.5s, box-shadow 0.5s',
                    cursor: 'pointer',
                    height: 256,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    '&:hover': {
                      boxShadow: 8,
                      transform: 'scale(1.05)',
                    },
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <Box sx={{ position: 'relative', height: '100%' }}>
                    <img
                      src={category.image}
                      alt={category.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: category.gradient,
                        opacity: 0.8,
                        transition: 'opacity 0.3s',
                        zIndex: 1,
                        '&:hover': { opacity: 0.9 },
                      }}
                    />
                    <CardContent
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        p: 3,
                        color: '#fff',
                        zIndex: 2,
                        background: 'none',
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                        {category.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {category.description}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default Category;