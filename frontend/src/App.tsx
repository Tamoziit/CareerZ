import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import ParticleBackground from "./components/ParticleBackground";
import ApplicantSignup from "./pages/auth/applicants/ApplicantSignup";
import ApplicantLogin from "./pages/auth/applicants/ApplicantLogin";
import RecruiterRegister from "./pages/auth/recruiters/RecruiterRegister";
import RecruiterLogin from "./pages/auth/recruiters/RecruiterLogin";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-900 to-black">
      <ParticleBackground />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/applicant/signup" element={<ApplicantSignup />} />
        <Route path="/applicant/login" element={<ApplicantLogin />} />
        <Route path="/recruiter/register" element={<RecruiterRegister />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />
      </Routes>
    </div>
  )
}

export default App;
