import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FAQ from './pages/FAQ';
import FaqWrite from './pages/FaqWrite';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { SentryErrorBoundary } from './utils/sentry';

function App() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto'
    }}>
      <SentryErrorBoundary
        fallback={({ error, resetError }) => (
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: '#f8f9fa'
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center'
            }}>
              <h2 style={{
                color: '#ff4d4f',
                marginBottom: '1rem'
              }}>
                Đã xảy ra lỗi!
              </h2>
              {process.env.NODE_ENV === 'development' && (
                <pre style={{
                  background: '#f5f5f5',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflowX: 'auto',
                  textAlign: 'left',
                  fontSize: '14px',
                  margin: '1rem 0'
                }}>
                  {error.toString()}
                </pre>
              )}
              <button
                onClick={resetError}
                style={{
                  padding: '0.5rem 1.5rem',
                  background: '#1890ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = '#40a9ff'}
                onMouseOut={(e) => e.target.style.background = '#1890ff'}
              >
                Thử lại
              </button>
            </div>
          </div>
        )}
      >
        <div style={{ minHeight: '100vh', width: '100%' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<FAQ />} />
                <Route path="/write" element={<FaqWrite />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </SentryErrorBoundary>
    </div>
  );
}

export default App;