import * as Sentry from '@sentry/node';

Sentry.init({
    dsn: process.env.SENTRY_DSN || 'YOUR_DSN_HERE',
    environment: process.env.NODE_ENV || 'development',
    release: 'your-backend@1.0.0',
    tracesSampleRate: 0.1, // production nên giảm
});

// Middleware chính thức để bắt lỗi và log
const requestHandler = Sentry.Handlers.requestHandler();
const errorHandler = Sentry.Handlers.errorHandler();

export { Sentry, requestHandler, errorHandler };
