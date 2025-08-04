import { Card, Box, Typography } from '@mui/material';

const steps = [
	{
		step: '01',
		title: 'Browse & Discover',
		description:
			'Explore verified providers in your category of interest. View portfolios, read reviews, and compare services.',
		icon: '🔍',
	},
	{
		step: '02',
		title: 'Connect & Chat',
		description:
			'Message providers directly to discuss your requirements. Share ideas and get personalized recommendations.',
		icon: '💬',
	},
	{
		step: '03',
		title: 'Schedule & Meet',
		description:
			'Book virtual consultations at your convenience. Meet face-to-face online to finalize your custom project.',
		icon: '📅',
	},
];

const HowItWorks = () => {
	return (
		<Box component="section" sx={{ py: { xs: 10, md: 20 }, bgcolor: '#fff' }}>
			<Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 8 } }}>
				<Box sx={{ textAlign: 'center', mb: 8 }}>
					<Typography
						variant="h3"
						fontWeight="bold"
						color="text.primary"
						sx={{ mb: 2 }}
					>
						How It Works
					</Typography>
					<Typography
						variant="h6"
						color="text.secondary"
						sx={{ maxWidth: 700, mx: 'auto' }}
					>
						Getting your custom project started is simple. Follow these three easy
						steps to connect with the perfect provider for your needs.
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
						gap: 4,
						position: 'relative',
					}}
				>
					{/* Connection line for desktop */}
					<Box
						sx={{
							display: { xs: 'none', md: 'block' },
							position: 'absolute',
							top: 64,
							left: '16%',
							right: '16%',
							height: 4,
							bgcolor: 'transparent',
							background:
								'linear-gradient(90deg, #BFDBFE 0%, #FDE68A 50%, #BFDBFE 100%)',
							zIndex: 0,
							borderRadius: 2,
						}}
					/>
					{steps.map((step) => (
						<Card
							key={step.step}
							elevation={3}
							sx={{
								position: 'relative',
								p: 6,
								textAlign: 'center',
								borderRadius: 4,
								overflow: 'visible',
								boxShadow: 4,
								transition: 'box-shadow 0.3s, transform 0.3s',
								'&:hover': {
									boxShadow: 8,
									transform: 'scale(1.04)',
									borderColor: '#2563EB',
								},
								border: '2px solid transparent',
							}}
						>
							<Box sx={{ position: 'relative', zIndex: 1 }}>
								<Box
									sx={{
										display: 'inline-flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: 64,
										height: 64,
										background:
											'linear-gradient(90deg, #2563EB 0%, #F59E42 100%)',
										color: '#fff',
										borderRadius: '50%',
										fontSize: 28,
										fontWeight: 'bold',
										mb: 3,
										transition: 'transform 0.3s',
									}}
								>
									{step.step}
								</Box>
								<Box sx={{ fontSize: 40, mb: 2 }}>{step.icon}</Box>
								<Typography
									variant="h5"
									fontWeight="bold"
									color="text.primary"
									sx={{ mb: 2 }}
								>
									{step.title}
								</Typography>
								<Typography
									color="text.secondary"
									sx={{ lineHeight: 1.7 }}
								>
									{step.description}
								</Typography>
							</Box>
							{/* Background decoration */}
							<Box
								sx={{
									position: 'absolute',
									inset: 0,
									background:
										'linear-gradient(135deg, #EFF6FF 0%, #FFF7ED 100%)',
									borderRadius: 4,
									opacity: 0,
									transition: 'opacity 0.3s',
									zIndex: 0,
									pointerEvents: 'none',
									'&:hover': { opacity: 1 },
								}}
							/>
						</Card>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default HowItWorks;