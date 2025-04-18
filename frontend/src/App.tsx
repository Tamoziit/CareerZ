import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Landing from "./pages/landing/Landing";
import ParticleBackground from "./components/ParticleBackground";
import ApplicantSignup from "./pages/auth/applicants/ApplicantSignup";
import ApplicantLogin from "./pages/auth/applicants/ApplicantLogin";
import RecruiterRegister from "./pages/auth/recruiters/RecruiterRegister";
import RecruiterLogin from "./pages/auth/recruiters/RecruiterLogin";
import ApplicantHome from "./pages/home/ApplicantHome";
import RecruiterHome from "./pages/home/RecruiterHome";
import ApplicantResume from "./pages/resume/ApplicantResume";
import { Toaster } from "react-hot-toast";
import RecruiterJobs from "./pages/jobs/recruiters/RecruiterJobs";
import PostJob from "./pages/jobs/recruiters/PostJob";
import RecruiterApplicants from "./pages/applications/RecruiterApplicants";

function App() {
	const { authUser } = useAuthContext();
	console.log(authUser);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 to-black">
			<ParticleBackground />
			<Routes>
				{/* Landing */}
				<Route
					path="/"
					element={
						authUser ? (
							authUser.role === "applicant" ? (
								<Navigate to="/applicant/home" />
							) : (
								<Navigate to="/recruiter/home" />
							)
						) : (
							<Landing />
						)
					}
				/>

				{/* Applicant routes */}
				<Route
					path="/applicant/home"
					element={
						authUser && authUser.role === "applicant" ? (
							<ApplicantHome />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				<Route
					path="/applicant/signup"
					element={
						authUser ? (
							authUser.role === "applicant" ? (
								<Navigate to="/applicant/home" />
							) : (
								<Navigate to="/recruiter/home" />
							)
						) : (
							<ApplicantSignup />
						)
					}
				/>
				<Route
					path="/applicant/login"
					element={
						authUser ? (
							authUser.role === "applicant" ? (
								<Navigate to="/applicant/home" />
							) : (
								<Navigate to="/recruiter/home" />
							)
						) : (
							<ApplicantLogin />
						)
					}
				/>
				<Route
					path="/applicant/resume"
					element={
						authUser && authUser.role === "applicant" ? (
							<ApplicantResume />
						) : (
							<Navigate to="/" />
						)
					}
				/>

				{/* Recruiter routes */}
				<Route
					path="/recruiter/home"
					element={
						authUser && authUser.role === "recruiter" ? (
							<RecruiterHome />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				<Route
					path="/recruiter/register"
					element={
						authUser ? (
							authUser.role === "applicant" ? (
								<Navigate to="/applicant/home" />
							) : (
								<Navigate to="/recruiter/home" />
							)
						) : (
							<RecruiterRegister />
						)
					}
				/>
				<Route
					path="/recruiter/login"
					element={
						authUser ? (
							authUser.role === "applicant" ? (
								<Navigate to="/applicant/home" />
							) : (
								<Navigate to="/recruiter/home" />
							)
						) : (
							<RecruiterLogin />
						)
					}
				/>
				<Route
					path="/recruiter/post-jobs"
					element={
						authUser && authUser.role === "recruiter" ? (
							<PostJob />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				<Route
					path="/recruiter/postings"
					element={
						authUser && authUser.role === "recruiter" ? (
							<RecruiterJobs />
						) : (
							<Navigate to="/" />
						)
					}
				/>
				<Route
					path="/recruiter/applicants"
					element={
						authUser && authUser.role === "recruiter" ? (
							<RecruiterApplicants />
						) : (
							<Navigate to="/" />
						)
					}
				/>
			</Routes>

			<Toaster />
		</div>
	)
}

export default App;