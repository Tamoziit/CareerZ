import { Link } from "react-router-dom";
import AppNavbar from "../../components/navbars/AppNavbar";
import { useAuthContext } from "../../context/AuthContext";
import RecruiterProfile from "../../components/RecruiterProfile";

const RecruiterHome = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <AppNavbar />

      <div className="pt-20 lg:pt-32 p-4 flex w-full items-center md:justify-center sm:justify-center lg:justify-around flex-col lg:flex-row">
        <img src="/recruiterHome.png" alt="hero-bg" className="rounded-lg w-[550px] lg:w-[650px]" />

        <div className="flex flex-col items-center">
          <div className="mt-10 lg:mt-0 flex flex-col gap-2 items-center justify-center z-10">
            <h1 className="text-[35px] md:text-[45px] lg:text-[58px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-400 to-blue-500 text-center">
              Welcome {authUser?.name}!
            </h1>
            <p className="text-xl text-gray-300 italic text-center">
              "Discover top talent, streamline hiring, and grow your team effortlessly."
            </p>
          </div>

          <div className="mt-8 z-10 flex gap-8 lg:gap-[50px]">
            <Link to="/recruiter/post-job" className="btn-primary !px-14">Post a Job</Link>
            <Link to="/recruiter/applicants" className="btn-secondary">View Applicants</Link>
          </div>
        </div>
      </div>

      <RecruiterProfile />
    </>
  )
}

export default RecruiterHome;