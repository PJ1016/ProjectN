import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";

interface IOptionGroup {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
}

const OptionGroup = ({
  label,
  value,
  options,
  onChange,
  name,
}: IOptionGroup) => {
  return (
    <>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        fontWeight={600}
        gutterBottom
      >
        {label}
      </Typography>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, newValue) => {
          if (newValue !== null) onChange(name, newValue);
        }}
        size="small"
        sx={{
          mb: 2,
          "& .MuiToggleButton-root": {
            px: 3,
            borderRadius: "12px",
            textTransform: "none",
          },
        }}
      >
        {options.map((opt) => (
          <ToggleButton key={opt} value={opt}>
            {opt}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default OptionGroup;
