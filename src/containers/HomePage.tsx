import { Container, Typography, Button, Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "background.default", py: 8 }}>
      <Container>
        <Typography variant="h1" gutterBottom>
          Gentle. Organic. You.
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 4 }}>
          Discover our eco-friendly sanitary pads made with love for women and
          nature.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }}>
          Shop Now
        </Button>
        <Button variant="contained" color="secondary" size="large">
          Learn More
        </Button>

        <Box sx={{ mt: 6, bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ color: "text.primary", mb: 2 }}>
            Why Choose Us?
          </Typography>
          <ul style={{ paddingLeft: "1.2rem", color: "#2E3C32" }}>
            <li>100% Organic Cotton</li>
            <li>Plastic-Free & Compostable</li>
            <li>Ultra-Soft & Rash-Free Comfort</li>
            <li>Eco-Conscious Packaging</li>
          </ul>
        </Box>
      </Container>
    </Box>
  );
}
