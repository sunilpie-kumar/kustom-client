import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F3F4F6",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h1" fontWeight="bold" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          Oops! Page not found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/"
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Return to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;