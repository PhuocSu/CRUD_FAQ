import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import FAQ from './pages/FAQ'
import FaqWrite from './pages/FaqWrite'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/faq" element={<FAQ />} />z
          <Route path="/faq/write" element={<FaqWrite />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
