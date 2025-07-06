import { Card, CardContent, Typography, Box, styled } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  padding: "24px",
  height: "100%",
  background: "white",
  boxShadow: "0 4px 20px rgba(255, 107, 157, 0.1)",
  borderRadius: "16px",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 30px rgba(255, 107, 157, 0.2)",
  },
}));

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ mb: 2 }}>{icon}</Box>
        <Typography
          variant="h6"
          sx={{ mb: 2, color: "primary.main", fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};