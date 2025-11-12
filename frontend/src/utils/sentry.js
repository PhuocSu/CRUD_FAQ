import * as Sentry from '@sentry/react';
import { browserTracingIntegration } from '@sentry/browser';

Sentry.init({
    dsn: 'https://50a0ad6e7906a72a3d1a5be5ae08af9d@o4510350242021376.ingest.us.sentry.io/4510350302838784',
    integrations: [browserTracingIntegration()],
    tracesSampleRate: 1.0, // Điều chỉnh tỷ lệ lấy mẫu
    environment: process.env.NODE_ENV,
    release: 'your-project-name@1.0.0'
});

// Thêm ErrorBoundary mặc định
export const SentryErrorBoundary = Sentry.ErrorBoundary;
export default Sentry;