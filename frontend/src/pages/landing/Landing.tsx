import { Link } from "react-router-dom";
import LandingNavbar from "../../components/navbars/LandingNavbar";

const Landing = () => {
	return (
		<>
			<LandingNavbar />

			<div className="pt-20 lg:pt-32 p-4 flex w-full items-center md:justify-center sm:justify-center lg:justify-around flex-col lg:flex-row">
				<img src="/landing-bg.png" alt="hero-bg" className="rounded-lg" />
				<div className="flex flex-col items-center">
					<div className="mt-10 lg:mt-0 flex flex-col gap-2 items-center justify-center z-10">
						<h1 className="text-[41px] md:text-[50px] lg:text-[65px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">Welcome to CareerZ</h1>
						<p className="text-xl text-gray-300 italic">"Where your Passion meets your Future..."</p>
					</div>

					<div className="mt-8 z-10 flex gap-8 lg:gap-[50px]">
						<Link to="/applicant/signup" className="btn-primary">Explore Jobs</Link>
						<Link to="/recruiter/register" className="btn-secondary">Find Talent</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Landing;