// 

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ bỏ Router thừa
import FAQ from './pages/FAQ';
import FaqWrite from './pages/FaqWrite';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <BrowserRouter>
        <Routes>
          {/* 🌐 Public routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />

          {/* 🔒 Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<FAQ />} />
            <Route path="/write" element={<FaqWrite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
