import { useState } from "react"
import { Button, Tabs, Tab, Box, Typography, Paper, Grid, Chip, Avatar } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PeopleIcon from "@mui/icons-material/People"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import VerifiedIcon from "@mui/icons-material/Verified"
import ShieldIcon from "@mui/icons-material/Security"
import { useNavigate } from "react-router-dom"
import BusinessForm from "./BusinessForm"
import BusinessHistory from "./BusinessHistory"

const B2B = () => {
  const [activeTab, setActiveTab] = useState(0)
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "linear-gradient(135deg, #EFF6FF 0%, #FFF 50%, #FFEFD5 100%)" }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ bgcolor: "rgba(255,255,255,0.8)", backdropFilter: "blur(4px)", borderBottom: 1, borderColor: "grey.200" }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 6 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/")}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 500,
                boxShadow: 0,
                "&:hover": { bgcolor: "grey.50" }
              }}
              aria-label="Go back to home page"
            >
              Back to Home
            </Button>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Chip
                avatar={<Avatar sx={{ bgcolor: "transparent" }}><ShieldIcon sx={{ color: "primary.main", fontSize: 20 }} /></Avatar>}
                label="Trusted Platform"
                sx={{ bgcolor: "primary.light", fontWeight: 500 }}
              />
              <Chip
                avatar={<Avatar sx={{ bgcolor: "transparent" }}><VerifiedIcon sx={{ color: "success.main", fontSize: 20 }} /></Avatar>}
                label="Verified Providers"
                sx={{ bgcolor: "success.light", fontWeight: 500 }}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Chip
              label="🚀 Join 500+ Verified Providers"
              sx={{
                px: 2,
                py: 1,
                bgcolor: "linear-gradient(90deg, #DBEAFE 0%, #E9D5FF 100%)",
                border: 1,
                borderColor: "primary.light",
                fontWeight: 600,
                fontSize: 14,
                mb: 2
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "grey.900",
                mb: 2,
                lineHeight: 1.1,
                fontSize: { xs: 32, lg: 56 }
              }}
            >
              Welcome to{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #F59E42 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold"
                }}
              >
                Kustom
              </Box>{" "}
              Business
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "grey.600",
                maxWidth: 600,
                mx: "auto",
                mb: 2,
                fontSize: { xs: 18, lg: 24 }
              }}
            >
              Join our platform and connect with thousands of customers looking for your services. Start growing your business today with our trusted marketplace.
            </Typography>
          </Box>
          {/* Stats Section */}
          <Grid container spacing={3} sx={{ maxWidth: 900, mx: "auto", mt: 8 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: 4, bgcolor: "rgba(255,255,255,0.6)", border: 1, borderColor: "primary.light", textAlign: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.light", width: 48, height: 48 }}>
                    <PeopleIcon sx={{ color: "primary.main", fontSize: 32 }} />
                  </Avatar>
                </Box>
                <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold", mb: 1 }}>
                  10,000+
                </Typography>
                <Typography sx={{ color: "grey.700", fontWeight: 500 }}>
                  Active Customers
                </Typography>
                <Typography variant="body2" sx={{ color: "grey.500", mt: 1 }}>
                  Searching for services daily
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: 4, bgcolor: "rgba(255,255,255,0.6)", border: 1, borderColor: "success.light", textAlign: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "success.light", width: 48, height: 48 }}>
                    <TrendingUpIcon sx={{ color: "success.main", fontSize: 32 }} />
                  </Avatar>
                </Box>
                <Typography variant="h4" sx={{ color: "success.main", fontWeight: "bold", mb: 1 }}>
                  85%
                </Typography>
                <Typography sx={{ color: "grey.700", fontWeight: 500 }}>
                  Business Growth
                </Typography>
                <Typography variant="body2" sx={{ color: "grey.500", mt: 1 }}>
                  Average increase in bookings
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 4, borderRadius: 4, bgcolor: "rgba(255,255,255,0.6)", border: 1, borderColor: "warning.light", textAlign: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "warning.light", width: 48, height: 48 }}>
                    <VerifiedIcon sx={{ color: "warning.main", fontSize: 32 }} />
                  </Avatar>
                </Box>
                <Typography variant="h4" sx={{ color: "warning.main", fontWeight: "bold", mb: 1 }}>
                  4.9★
                </Typography>
                <Typography sx={{ color: "grey.700", fontWeight: 500 }}>
                  Provider Rating
                </Typography>
                <Typography variant="body2" sx={{ color: "grey.500", mt: 1 }}>
                  Average satisfaction score
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, py: 8 }}>
        <Paper elevation={2} sx={{ borderRadius: 4, p: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            centered
            sx={{ mb: 4 }}
          >
            <Tab
              label="Registration"
              sx={{
                fontSize: 18,
                fontWeight: 600,
                px: 4,
                py: 2,
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  boxShadow: 2
                }
              }}
            />
            <Tab
              label="Dashboard"
              sx={{
                fontSize: 18,
                fontWeight: 600,
                px: 4,
                py: 2,
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  boxShadow: 2
                }
              }}
            />
          </Tabs>
          <Box hidden={activeTab !== 0}>
            <BusinessForm />
          </Box>
          <Box hidden={activeTab !== 1}>
            <BusinessHistory />
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default B2B