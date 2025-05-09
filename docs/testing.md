# Testing Guide

This guide provides comprehensive instructions for testing the Cogaineum project.

## Testing Strategy

### Test Types

1. **Unit Tests**

   - Test individual components
   - Test utility functions
   - Test hooks
   - Test form validation

2. **Integration Tests**

   - Test component interactions
   - Test form submissions
   - Test API integrations
   - Test routing

3. **Performance Tests**
   - Test page load times
   - Test component rendering
   - Test API response times
   - Test memory usage

## Testing Setup

### Dependencies

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "msw": "^2.0.0"
  }
}
```

### Configuration

Create `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
};
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
```

## Testing Components

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Form Component Test

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '@/components/ContactForm';

describe('ContactForm', () => {
  it('submits form data', async () => {
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Hello World' },
    });

    fireEvent.click(screen.getByText('Submit'));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello World',
    });
  });
});
```

## Testing Hooks

### Custom Hook Test

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import useForm from '@/hooks/useForm';

describe('useForm', () => {
  it('handles form state', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { name: '', email: '' },
        onSubmit: jest.fn(),
      })
    );

    act(() => {
      result.current.handleChange('name')({ target: { value: 'John' } });
    });

    expect(result.current.values.name).toBe('John');
  });
});
```

## Testing API Calls

### Mock API Test

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserProfile from '@/components/UserProfile';

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ name: 'John Doe' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserProfile', () => {
  it('fetches and displays user data', async () => {
    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

## Testing Error States

### Error Boundary Test

```typescript
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@/components/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('displays fallback UI on error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
```

## Performance Testing

### Component Performance Test

```typescript
import { render, screen } from '@testing-library/react';
import { measurePerformance } from '@testing-library/react-hooks';
import HeavyComponent from '@/components/HeavyComponent';

describe('HeavyComponent', () => {
  it('renders within performance budget', async () => {
    const { renderTime } = await measurePerformance(() => {
      render(<HeavyComponent />);
    });

    expect(renderTime).toBeLessThan(100); // milliseconds
  });
});
```

## Test Coverage

### Coverage Configuration

Add to `jest.config.js`:

```javascript
module.exports = {
  // ... other config
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Running Coverage

```bash
npm test -- --coverage
```

## Best Practices

1. **Test Organization**

   - Group related tests
   - Use descriptive test names
   - Follow the AAA pattern (Arrange, Act, Assert)

2. **Test Isolation**

   - Mock external dependencies
   - Reset state between tests
   - Use cleanup functions

3. **Test Data**

   - Use realistic test data
   - Create test data factories
   - Keep test data up to date

4. **Test Maintenance**
   - Update tests with code changes
   - Remove obsolete tests
   - Keep tests focused

## Common Issues

1. **Async Tests**

   - Use proper async/await
   - Handle timeouts
   - Clean up resources

2. **State Management**

   - Reset state between tests
   - Mock global state
   - Handle side effects

3. **Network Requests**
   - Mock API calls
   - Handle errors
   - Test loading states

## Next Steps

- Review [Development Guide](./development.md)
- Check [Deployment Guide](./deployment.md)
- Read [Security Guide](./security.md)
