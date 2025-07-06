import { Container, Typography, Grid } from "@mui/material";
import { Nature, Favorite, Shield, LocalShipping } from "@mui/icons-material";
import { HeroSection } from "../components/HeroSection";
import { FeatureCard } from "../components/FeatureCard";
import { TestimonialSection } from "../components/TestimonialSection";

export default function HomePage() {
  const features = [
    {
      icon: <Nature sx={{ fontSize: 48, color: "success.main" }} />,
      title: "Certified Organic",
      desc: "Grown without pesticides, harvested with care - pure organic cotton from nature to you",
    },
    {
      icon: <Shield sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Chemical-Free",
      desc: "No bleach, no fragrances, no synthetics - just nature's gentle protection",
    },
    {
      icon: <Favorite sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Earth-Friendly",
      desc: "Biodegradable materials that love your body and respect our planet",
    },
    {
      icon: <LocalShipping sx={{ fontSize: 48, color: "primary.main" }} />,
      title: "Plastic-Free",
      desc: "Compostable packaging - from our earth-conscious hands to yours",
    },
  ];

  return (
    <>
      <HeroSection
        title="Nature's Care for Your Natural Cycle 🌿"
        subtitle="100% organic cotton pads crafted from nature's finest materials. Pure, gentle, and naturally yours."
        buttonText="Discover Natural Care"
      />

      <Container sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, color: "primary.main" }}
        >
          Pure. Natural. Trusted.
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.desc}
              />
            </Grid>
          ))}
        </Grid>

        <TestimonialSection
          title="Join Nature's Community"
          testimonial="Switching to organic was the best decision! My body feels so much healthier, and I love knowing I'm supporting sustainable practices. - Emma R."
          buttonText="Choose Natural - Free Shipping"
        />
      </Container>
    </>
  );
}
