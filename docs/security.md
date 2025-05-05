# Security Guide

This guide provides comprehensive security practices and measures for the Cogaineum project.

## Security Headers

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: https://www.google-analytics.com;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://www.google-analytics.com;
              frame-src 'self';
              base-uri 'self';
              form-action 'self';
            `.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};
```

## Authentication

### JWT Implementation

```typescript
// lib/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
```

### Session Management

```typescript
// lib/session.ts
import { cookies } from 'next/headers';

export const setSession = (token: string) => {
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
  });
};

export const getSession = () => {
  return cookies().get('session')?.value;
};

export const clearSession = () => {
  cookies().delete('session');
};
```

## Input Validation

### Form Validation

```typescript
// lib/validation.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export const validateForm = (data: unknown) => {
  try {
    return contactSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors };
    }
    throw error;
  }
};
```

### API Validation

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Validate API requests
  if (request.nextUrl.pathname.startsWith('/api')) {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  return NextResponse.next();
}
```

## Data Protection

### Encryption

```typescript
// lib/encryption.ts
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (text: string) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
```

### Secure Storage

```typescript
// lib/storage.ts
import { encrypt, decrypt } from './encryption';

export const secureStorage = {
  set: (key: string, value: any) => {
    const encrypted = encrypt(JSON.stringify(value));
    localStorage.setItem(key, encrypted);
  },
  get: (key: string) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    return JSON.parse(decrypt(encrypted));
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
```

## API Security

### Rate Limiting

```typescript
// lib/rate-limit.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RATE_LIMIT = 100; // requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

const ipRequests = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = (request: NextRequest) => {
  const ip = request.ip || 'unknown';
  const now = Date.now();

  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    const data = ipRequests.get(ip);
    if (now > data.resetTime) {
      data.count = 1;
      data.resetTime = now + RATE_LIMIT_WINDOW;
    } else if (data.count >= RATE_LIMIT) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    } else {
      data.count++;
    }
  }

  return NextResponse.next();
};
```

### CORS Configuration

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  
  return response;
}
```

## Error Handling

### Error Logging

```typescript
// lib/error-logging.ts
import * as Sentry from '@sentry/nextjs';

export const logError = (error: Error, context?: any) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

export const logMessage = (message: string, level: 'info' | 'warning' | 'error') => {
  Sentry.captureMessage(message, level);
};
```

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
import React from 'react';
import { logError } from '@/lib/error-logging';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, { componentStack: errorInfo.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Security Best Practices

### Code Review Checklist

1. **Authentication**
   - Verify JWT implementation
   - Check session management
   - Validate token expiration
   - Test password policies

2. **Authorization**
   - Verify role-based access
   - Check permission checks
   - Test API endpoints
   - Validate user input

3. **Data Protection**
   - Verify encryption
   - Check secure storage
   - Test data validation
   - Validate sanitization

4. **API Security**
   - Verify rate limiting
   - Check CORS settings
   - Test input validation
   - Validate error handling

### Regular Security Tasks

1. **Dependencies**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Code Scanning**
   ```bash
   npm run lint
   npm run type-check
   ```

3. **Security Testing**
   ```bash
   npm run security-test
   ```

4. **Monitoring**
   - Check error logs
   - Monitor access patterns
   - Review security alerts
   - Update security measures

## Incident Response

### Response Plan

1. **Identification**
   - Monitor error logs
   - Check security alerts
   - Review access patterns
   - Identify affected systems

2. **Containment**
   - Isolate affected systems
   - Block malicious IPs
   - Revoke compromised tokens
   - Update security measures

3. **Eradication**
   - Fix vulnerabilities
   - Update dependencies
   - Patch systems
   - Clean infected data

4. **Recovery**
   - Restore systems
   - Verify security
   - Monitor for issues
   - Update documentation

### Communication Plan

1. **Internal**
   - Notify team
   - Document incident
   - Update procedures
   - Train staff

2. **External**
   - Notify users
   - Update status
   - Provide guidance
   - Maintain transparency

## Next Steps

- Review [Development Guide](./development.md)
- Check [Testing Guide](./testing.md)
- Read [Deployment Guide](./deployment.md) 