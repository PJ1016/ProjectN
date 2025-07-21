import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Chip,
  Divider,
  Card,
  CardContent,
  Avatar,
  Button,
  Stack,
  LinearProgress,
} from "@mui/material";
import {
  Nature,
  Favorite,
  Shield,
  LocalShipping,
  HealthAndSafety,
  School,
  Groups,
  TrendingUp,
  People,
} from "@mui/icons-material";
import { HeroSection } from "../components/HeroSection";
import { TestimonialSection } from "../components/TestimonialSection";

export default function HomePage() {
  const features = [
    {
      icon: <Shield sx={{ fontSize: 48, color: "success.main" }} />,
      title: "Rash-Free Comfort",
      desc: "Breathable organic cotton that's gentle on sensitive skin - free from irritation",
    },
    {
      icon: <Nature sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "100% Compostable",
      desc: "Biodegradable pads and packaging that decompose naturally in 6-12 months",
    },
    {
      icon: <Favorite sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Toxin-Free",
      desc: "No bleach, plastics, or chemicals - just pure organic protection",
    },
    {
      icon: <LocalShipping sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Woman-Led Brand",
      desc: "Designed by women, rooted in public health - promoting menstrual dignity",
    },
  ];

  return (
    <>
      <HeroSection
        title="Empowering Periods with Organic Care"
        subtitle="Gentle on You. Gentle on Earth. Because your body deserves more than chemicals and plastic."
        buttonText="Join the Movement"
      />

      {/* Mission Statement Section */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container>
          <Paper
            elevation={0}
            sx={{ p: 6, bgcolor: "transparent", textAlign: "center" }}
          >
            <Chip
              label="Our Mission"
              sx={{
                mb: 3,
                bgcolor: "primary.main",
                color: "white",
                fontSize: "1rem",
                px: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                color: "text.primary",
                fontStyle: "italic",
                lineHeight: 1.4,
              }}
            >
              "As a public health graduate and woman, I believe menstrual care
              should be safe, sustainable, and stigma-free."
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}
            >
              Our mission is to provide organic, biodegradable sanitary pads
              that respect your body—and the planet.
            </Typography>
          </Paper>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}
          >
            Why Choose Us?
          </Typography>
          <Divider
            sx={{
              width: 100,
              mx: "auto",
              borderWidth: 2,
              borderColor: "primary.main",
            }}
          />
        </Box>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={3}
                sx={{
                  height: 280,
                  background: `linear-gradient(135deg, ${
                    index % 2 === 0 ? "#ffeef4" : "#f3e5f5"
                  } 0%, white 100%)`,
                  border: "2px solid transparent",
                  borderRadius: 4,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(233, 30, 99, 0.15)",
                    borderColor: "primary.main",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background:
                      "linear-gradient(90deg, #e91e63, #f06292, #ba68c8)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <Avatar
                      sx={{
                        width: 72,
                        height: 72,
                        mx: "auto",
                        mb: 2,
                        bgcolor: "white",
                        color: "primary.main",
                        boxShadow: "0 8px 24px rgba(233, 30, 99, 0.2)",
                        border: "3px solid",
                        borderColor: "primary.light",
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.desc}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action Section */}
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: "center",
            bgcolor: "primary.main",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Nature sx={{ fontSize: 40, mr: 1 }} />
            <HealthAndSafety sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
            Join the movement toward toxin-free, conscious periods.
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 4, fontWeight: 300, opacity: 0.9 }}
          >
            Your health is our starting point.
          </Typography>
          <Chip
            label="Woman-Led • Public Health Focused • Eco-Conscious"
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontSize: "1rem",
              px: 2,
              py: 1,
            }}
          />
        </Paper>
        {/* Impact Statistics */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, color: "primary.main", fontWeight: "bold" }}
          >
            Our Impact Together
          </Typography>
          <Grid container spacing={4}>
            {[
              { icon: <People />, number: "10,000+", label: "Happy Customers" },
              {
                icon: <Nature />,
                number: "50,000+",
                label: "Plastic Items Avoided",
              },
              {
                icon: <TrendingUp />,
                number: "95%",
                label: "Customer Satisfaction",
              },
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #fff 0%, #ffeef4 100%)",
                    border: "1px solid",
                    borderColor: "primary.light",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mx: "auto",
                      mb: 2,
                      bgcolor: "primary.main",
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography
                    variant="h3"
                    sx={{ color: "primary.main", fontWeight: "bold", mb: 1 }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Educational Outreach Section */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Paper
            elevation={4}
            sx={{
              p: 6,
              background: "linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)",
              borderRadius: 4,
              border: "2px solid",
              borderColor: "success.light",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Stack direction="row" justifyContent="center" spacing={1} mb={2}>
                <School sx={{ fontSize: 48, color: "success.main" }} />
                <Groups sx={{ fontSize: 48, color: "success.main" }} />
              </Stack>
              <Typography
                variant="h4"
                sx={{ mb: 2, fontWeight: "bold", color: "success.dark" }}
              >
                Educational Partnerships
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 3, color: "success.main", opacity: 0.8 }}
              >
                Empowering the next generation with menstrual health awareness
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={{ bgcolor: "white", height: "100%", borderRadius: 3 }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}
                    >
                      🎓 For Colleges & Universities
                    </Typography>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        • Campus health awareness programs
                      </Typography>
                      <Typography variant="body2">
                        • Bulk supply partnerships for hostels
                      </Typography>
                      <Typography variant="body2">
                        • Student wellness workshops
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  elevation={0}
                  sx={{ bgcolor: "white", height: "100%", borderRadius: 3 }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}
                    >
                      🏫 For Schools
                    </Typography>
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                      <Typography variant="body2">
                        • Age-appropriate menstrual education
                      </Typography>
                      <Typography variant="body2">
                        • Emergency supply programs
                      </Typography>
                      <Typography variant="body2">
                        • Teacher training workshops
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "success.main",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "success.dark" },
                }}
              >
                Partner With Us
              </Button>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ mt: 6 }}>
          <TestimonialSection
            title="Made by Women, for Women"
            testimonial="Switching to organic pads is a small act of self-care—and a big step toward a healthier world."
            buttonText="Start Your Organic Journey"
          />
        </Box>
      </Container>
    </>
  );
}
