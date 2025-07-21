# Material-UI Guidelines

## Component Usage
- Use Material-UI components consistently throughout the project
- Prefer sx prop over styled components for simple styling
- Use theme breakpoints for responsive design: xs, sm, md, lg, xl
- Implement proper spacing using theme spacing units
- Use Material-UI icons from @mui/icons-material

## Styling Patterns
- Use sx prop with theme-aware values
- Implement responsive design with breakpoint objects: { xs: value, md: value }
- Use theme colors: primary, secondary, error, warning, info, success
- Apply consistent elevation and shadows using theme values
- Use theme typography variants: h1-h6, body1, body2, caption, etc.

## Layout Components
- Use Container for page-level layouts with maxWidth
- Use Grid system for responsive layouts
- Use Stack for simple flex layouts
- Use Box for custom containers with sx styling
- Implement proper spacing between components

## Form Components
- Use controlled components with proper state management
- Implement form validation with clear error messages
- Use consistent form field spacing and layout
- Apply proper accessibility attributes