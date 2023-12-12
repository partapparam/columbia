import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/home"
import Letter from "./components/letter"
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/support-letter" element={<Letter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
