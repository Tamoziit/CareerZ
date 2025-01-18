import { Link } from "react-router-dom";
import AppNavbar from "../../components/navbars/AppNavbar";
import { useAuthContext } from "../../context/AuthContext";

const ApplicantHome = () => {
  const {authUser} = useAuthContext();

  return (
    <>
      <AppNavbar />

      <div className="pt-20 lg:pt-32 p-4 flex w-full items-center md:justify-center sm:justify-center lg:justify-around flex-col lg:flex-row">
        <img src="/Home.png" alt="hero-bg" className="rounded-lg w-[650px]" />
        <div className="flex flex-col items-center">
          <div className="mt-10 lg:mt-0 flex flex-col gap-2 items-center justify-center z-10">
            <h1 className="text-[35px] md:text-[45px] lg:text-[58px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-center">Welcome {authUser?.name}!</h1>
            <p className="text-xl text-gray-300 italic text-center">"Embark on an Amazing Journey of Career Growth & Upskilling..."</p>
          </div>

          <div className="mt-8 z-10 flex gap-8 lg:gap-[50px]">
            <Link to="/applicant/resume" className="btn-primary">Build Your Resume</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ApplicantHome;