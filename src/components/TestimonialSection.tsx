import { Box, Typography } from "@mui/material";
import { StyledButton } from "./StyledButton";

interface TestimonialSectionProps {
  title: string;
  testimonial: string;
  buttonText: string;
  onButtonClick?: () => void;
}

export const TestimonialSection = ({ title, testimonial, buttonText, onButtonClick }: TestimonialSectionProps) => {
  return (
    <Box
      sx={{
        mt: 8,
        textAlign: "center",
        bgcolor: "background.paper",
        p: 6,
        borderRadius: 4,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: "primary.main" }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
      >
        {testimonial}
      </Typography>
      <StyledButton onClick={onButtonClick}>
        {buttonText}
      </StyledButton>
    </Box>
  );
};