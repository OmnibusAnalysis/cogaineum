# CSS Architecture

This directory contains the modular CSS files for the project. The CSS has been split into logical modules for better maintainability and organization.

## File Structure

### `base.css`
- Design system variables (colors, typography, spacing)
- Base HTML element styles
- Typography rules
- Accessibility features
- Scrollbar styling

### `animations.css`
- All animation keyframes
- Animation utility classes
- Transition definitions

### `components.css`
- Reusable component styles
- Cards, buttons, navigation
- Forms and inputs
- Grid systems
- Footer styles

### `layouts.css`
- Page layout styles
- Hero section styles
- Section layouts
- Responsive design rules

### `utilities.css`
- Gradient utilities
- Helper classes
- Overlay effects

## Usage

The main `globals.css` file imports all these modules. To use the styles:

1. **Base styles** are automatically applied
2. **Component classes** can be used directly (e.g., `modern-card`, `btn-primary`)
3. **Animation classes** can be added to elements (e.g., `animate-fade-in-up`)
4. **Utility classes** provide additional styling options (e.g., `gradient-text`)

## Design System

The CSS uses a consistent design system with CSS custom properties:

- **Colors**: Defined in HSL format for easy manipulation
- **Typography**: Responsive font sizes with clamp()
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions with cubic-bezier easing

## Adding New Styles

When adding new styles:

1. **Base styles** → `base.css`
2. **Animations** → `animations.css`
3. **Components** → `components.css`
4. **Layouts** → `layouts.css`
5. **Utilities** → `utilities.css`

This modular approach makes the codebase more maintainable and easier to navigate. 