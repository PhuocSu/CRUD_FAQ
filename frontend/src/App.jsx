import './App.css';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import FAQ from './pages/FAQ'
import FaqWrite from './pages/FaqWrite'
import SigninPage from './pages/SigninPage'
import SignupPage from './pages/SignupPage'

function App() {

  return (
    <>
      <div style={{ height: '100%', width: '100%' }}>
        <BrowserRouter>
          <Routes>
            <Route path="/faq" element={<FAQ />} />z
            <Route path="/faq/write" element={<FaqWrite />} />

            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App