import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-900 to-black">
      <ParticleBackground />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  )
}

export default App;
