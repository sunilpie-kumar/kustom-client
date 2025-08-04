import { Card, Box, Typography, Avatar } from '@mui/material';

const testimonials = [
	{
		name: 'Sarah Johnson',
		role: 'Homeowner',
		content:
			'Found the perfect interior designer through this platform. The virtual consultation was so convenient, and the final result exceeded my expectations!',
		rating: 5,
		avatar:
			'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&q=80',
	},
	{
		name: 'Mike Rodriguez',
		role: 'Car Enthusiast',
		content:
			'The custom auto shop I found here transformed my car beautifully. Great communication throughout the process and amazing attention to detail.',
		rating: 5,
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
	},
	{
		name: 'Emily Chen',
		role: 'Gift Buyer',
		content:
			'Needed a unique wedding gift and found an amazing artisan here. The personalized service and quality craftsmanship were outstanding.',
		rating: 5,
		avatar:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
	},
];

const TestimonialsSection = () => {
	return (
		<Box
			component="section"
			sx={{
				py: { xs: 10, md: 20 },
				background: 'linear-gradient(135deg, #EFF6FF 0%, #FFF7ED 100%)',
			}}
		>
			<Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 8 } }}>
				<Box sx={{ textAlign: 'center', mb: 8 }}>
					<Typography
						variant="h3"
						fontWeight="bold"
						color="text.primary"
						sx={{ mb: 2 }}
					>
						What Our Customers Say
					</Typography>
					<Typography
						variant="h6"
						color="text.secondary"
						sx={{ maxWidth: 700, mx: 'auto' }}
					>
						Join thousands of satisfied customers who found their perfect
						customization partners through our platform.
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							md: '1fr 1fr 1fr',
						},
						gap: 4,
					}}
				>
					{testimonials.map((testimonial, index) => (
						<Card
							key={testimonial.name}
							sx={{
								p: 4,
								bgcolor: 'rgba(255,255,255,0.8)',
								backdropFilter: 'blur(4px)',
								borderRadius: 4,
								boxShadow: 4,
								transition:
									'box-shadow 0.3s, transform 0.3s',
								'&:hover': {
									boxShadow: 8,
									transform: 'scale(1.05)',
								},
								animationDelay: `${index * 200}ms`,
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 0.5,
									mb: 2,
								}}
							>
								{[...Array(testimonial.rating)].map((_, i) => (
									<Typography
										key={i}
										sx={{ color: '#F59E42', fontSize: 22 }}
									>
										★
									</Typography>
								))}
							</Box>
							<Typography
								variant="body1"
								color="text.secondary"
								sx={{
									mb: 3,
									fontStyle: 'italic',
									lineHeight: 1.7,
								}}
							>
								"{testimonial.content}"
							</Typography>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 2,
								}}
							>
								<Avatar
									src={testimonial.avatar}
									alt={testimonial.name}
									sx={{ width: 48, height: 48 }}
								/>
								<Box>
									<Typography
										fontWeight="bold"
										color="text.primary"
									>
										{testimonial.name}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										{testimonial.role}
									</Typography>
								</Box>
							</Box>
						</Card>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default TestimonialsSection;