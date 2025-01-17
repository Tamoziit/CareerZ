import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useSignup from "../../../hooks/useSignup";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";

const ApplicantSignup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
    dob: "",
    city: "",
    state: "",
    country: "",
    pincode: ""
  });
  const { signup, loading } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(inputs);
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen w-full pb-6">
      <h1 className="text-[30px] md:text-[35px] lg:text-[40px] gradient-text-1">Signup</h1>
      <div className="h-[3.3px] -mt-1 bg-blue-400 w-10 rounded-lg" />

      <div className="flex w-full items-center justify-center">
        <div className="flex overflow-hidden">
          <div className="hidden lg:flex items-center justify-center w-[450px] glassmorphic p-4">
            <img src="/signup.png" alt="signup" className="object-cover  h-[400px]" />
          </div>

          <form className="flex flex-col gap-4 items-start justify-center glassmorphic p-4 w-[320px] md:w-[380px] lg:w-[450px]" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg font-medium text-gray-300">Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                required
                className="input-primary"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg font-medium text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                required
                className="input-primary"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  required
                  className="input-primary w-full pr-10"
                  value={inputs.password}
                  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-1.5 text-gray-400 hover:text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg font-medium text-gray-300">Mobile Number</label>
              <input
                type="text"
                placeholder="Enter your Mobile No."
                required
                className="input-primary"
                value={inputs.mobileNo}
                onChange={(e) => setInputs({ ...inputs, mobileNo: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg font-medium text-gray-300">Date of Birth</label>
              <input
                type="date"
                required
                className="input-primary"
                value={inputs.dob}
                onChange={(e) => setInputs({ ...inputs, dob: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg font-medium text-gray-300">Address</label>
              <div className="grid grid-cols-2 gap-4 w-full">
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="input-primary"
                  value={inputs.city}
                  onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  className="input-primary"
                  value={inputs.state}
                  onChange={(e) => setInputs({ ...inputs, state: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Country"
                  required
                  className="input-primary"
                  value={inputs.country}
                  onChange={(e) => setInputs({ ...inputs, country: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  required
                  className="input-primary"
                  value={inputs.pincode}
                  onChange={(e) => setInputs({ ...inputs, pincode: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-start justify-center p-2 w-full">
              <button className="btn-submit w-full lg:w-[90%]" type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Signup"}
              </button>
            </div>

            <div className="flex -mt-5 -mb-0.5 w-full items-center justify-center">
              <Link to="/applicant/login" className="text-gray-400 hover:text-blue-600">Already have an Account? Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApplicantSignup