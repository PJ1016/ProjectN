import { Container, Typography, Box, styled } from "@mui/material";
import { StyledButton } from "./StyledButton";

const HeroWrapper = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #fff0f6 0%, #ffeef4 100%)",
  padding: "80px 0",
  textAlign: "center",
}));

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export const HeroSection = ({ title, subtitle, buttonText, onButtonClick }: HeroSectionProps) => {
  return (
    <HeroWrapper>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{ mb: 3, fontSize: { xs: "2.5rem", md: "3.5rem" } }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "text.secondary", mb: 4, fontWeight: 400 }}
        >
          {subtitle}
        </Typography>
        <StyledButton size="large" onClick={onButtonClick}>
          {buttonText}
        </StyledButton>
      </Container>
    </HeroWrapper>
  );
};