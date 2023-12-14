import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home"
import Letter from "./components/letter"
import Admin from "./components/admin"
import "./App.css"
import { LetterProvider } from "./providers/letterContext"

const App = () => {
  return (
    <LetterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Letter />} />
          <Route path="/thank-you" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </LetterProvider>
  )
}

export default App
