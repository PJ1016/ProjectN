# Project Architecture Rules

## File Organization
- Components in `/src/components/` with index.tsx and separate files for complex components
- Services in `/src/services/` for API calls and business logic
- Store/state management in `/src/store/` using RTK Query pattern
- Types and interfaces in `/src/types/` or co-located with components
- Utils and helpers in `/src/utils/`

## Component Structure
- Each component folder should have index.tsx as main export
- Complex components can have separate files for sub-components
- Keep component files focused and under 200 lines
- Extract custom hooks to separate files when reusable

## State Management
- Use RTK Query for server state management
- Use local state (useState) for component-specific state
- Avoid prop drilling - use context for deeply nested state
- Keep state as close to where it's used as possible

## API Integration
- Use RTK Query hooks for data fetching
- Implement proper loading and error states
- Use TypeScript interfaces for API response types
- Handle edge cases and error scenarios

## Naming Conventions
- PascalCase for components and interfaces
- camelCase for functions, variables, and props
- UPPER_CASE for constants
- kebab-case for file names (except components)