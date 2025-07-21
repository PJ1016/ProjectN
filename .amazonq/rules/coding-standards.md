# Coding Standards

## TypeScript & React Rules
- Always use TypeScript strict mode
- Prefer functional components over class components
- Use proper TypeScript interfaces for props and state
- Import types using `import type` syntax when importing only types
- Use arrow functions for component definitions
- Prefer const assertions for immutable data

## Code Style
- Use 2 spaces for indentation
- Use semicolons at the end of statements
- Use double quotes for strings
- Use trailing commas in objects and arrays
- Keep line length under 100 characters
- Use meaningful variable and function names

## Component Structure
- Export components as default exports
- Place interfaces/types above the component
- Group imports: React imports first, then third-party, then local imports
- Use destructuring for props
- Keep components focused and single-responsibility

## Performance
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Avoid inline object/function creation in JSX
- Use useMemo and useCallback when appropriate