import { Routes, Route } from "react-router-dom"
import Page1 from "./components/page-1"
import Page2 from "./components/page-2"
import Page3 from "./components/page-3"

function App() {
  return (
    <>
      <Routes>
        <Route path="/registro-pedido" element={<Page1 />} />
        <Route path="/registro-destinatario" element={<Page2 />} />
        <Route path="/home" element={<Page3 />} />
      </Routes>
    </>
  )
}

export default App
