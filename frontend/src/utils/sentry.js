import * as Sentry from '@sentry/react';
import { browserTracingIntegration } from '@sentry/browser';

// console.log("Sentry DSN:", import.meta.env.VITE_SENTRY_DSN);
// console.log("ENV:", import.meta.env.VITE_SENTRY_ENV);


Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [browserTracingIntegration()],
    tracesSampleRate: 1.0, // Điều chỉnh tỷ lệ lấy mẫu
    environment: import.meta.env.VITE_SENTRY_ENV,
    release: 'your-project-name@1.0.0'
});

// Thêm ErrorBoundary mặc định
export const SentryErrorBoundary = Sentry.ErrorBoundary;
export default Sentry;