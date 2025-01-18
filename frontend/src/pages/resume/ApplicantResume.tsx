import { FaGithub, FaLinkedin, FaPlusCircle } from "react-icons/fa";
import AppNavbar from "../../components/navbars/AppNavbar";
import { useAuthContext } from "../../context/AuthContext";
import { MdLink } from "react-icons/md";
import { IoGlobeSharp } from "react-icons/io5";

const ApplicantResume = () => {
	const { authUser } = useAuthContext();

	return (
		<>
			<AppNavbar />

			<div className="pt-28 lg:pt-36 w-full flex p-2 items-center justify-center">
				<div className="w-[85%] lg:w-[70%] glassmorphic p-4 flex flex-col gap-2 items-center justify-center mb-3">
					<h1 className="gradient-text-1 text-3xl">Your Resume</h1>
					<div className="h-[3px] bg-blue-500 w-10 mb-4 rounded-lg" />

					<div className="flex flex-col md:flex-row items-center justify-around w-full">
						<img src="/user-placeholder.png" alt="user" className="size-24 lg:size-32 rounded-full overflow-hidden" />

						<div className="flex flex-col items-center md:items-end mt-3 md:mt-0">
							<span className="text-[23px] font-bold text-gradient-2 break-words">{authUser?.name || "John Doe"}</span>
							<span className="text-lg text-gray-400 break-words">{authUser?.email || "example@gmail.com"}</span>
							<span className="text-lg text-gray-400 break-words">{authUser?.mobileNo || "9999999999"}</span>
						</div>
					</div>

					<div className="w-[98%] h-[0.5px] bg-gray-400 my-2" />

					<div className="w-full px-0 md:px-5">
						<h1 className="text-[23px] text-center md:text-left font-bold text-gradient-2 mb-2">Personal Details</h1>

						<div>
							<div className="gap-2 mb-1">
								<span className="text-lg font-base text-gray-400">Bio: </span>
								{authUser?.bio ? (
									<span className="text-base text-gray-200 mt-0.5">{authUser?.dob}</span>
								) : (
									<span className="text-base text-gray-200 mt-0.5">Update Bio</span>
								)}
							</div>

							<div className="flex gap-2">
								<span className="text-lg font-base text-gray-400">Date of Birth: </span>
								<span className="text-base text-gray-200 mt-0.5">{authUser?.dob}</span>
							</div>

							<div className="flex gap-2">
								<span className="text-lg font-base text-gray-400">Resume: </span>
								{authUser?.resume ? (
									<a href={authUser.resume} target="_blank" rel="noopener noreferrer" className="text-base text-blue-500 mt-0.5 flex gap-1 items-center">Resume Link <MdLink /></a>
								) : (
									<span className="text-base text-gray-200 mt-0.5">Update Resume</span>
								)}
							</div>

							<div>
								<span className="text-lg font-base text-gray-400">Skills: </span>
								{authUser?.skills.length !== 0 ? (
									<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
										{authUser?.skills.map((skill, index) => (
											<span
												key={index}
												className="text-base text-gray-200 bg-gray-600 px-4 py-2 rounded-md text-center"
											>
												{skill}
											</span>
										))}
									</div>
								) : (
									<span className="text-base text-gray-200 mt-0.5">Add Skills</span>
								)}
							</div>
						</div>
					</div>

					<div className="w-[98%] h-[0.5px] bg-gray-400 my-2" />

					<div className="w-full px-0 md:px-5">
						<h1 className="text-[23px] text-center md:text-left font-bold text-gradient-2 mb-2">Education</h1>

						{authUser?.education.map((edu, _idx) => (
							<div key={_idx} className="mb-2">
								<h1 className="text-lg font-semibold gradient-text-1">&#10687; {edu.degree}</h1>
								<div className="px-5">
									<div className="flex gap-2">
										<span className="text-lg font-base text-gray-400">Institute: </span>
										<span className="text-base text-gray-200 mt-0.5">{edu.institute}</span>
									</div>

									<div className="flex gap-2">
										<span className="text-lg font-base text-gray-400">Start Date: </span>
										<span className="text-base text-gray-200 mt-0.5">{edu.startDate}</span>
									</div>

									{edu.endDate && (
										<div className="flex gap-2">
											<span className="text-lg font-base text-gray-400">End Date: </span>
											<span className="text-base text-gray-200 mt-0.5">{edu.endDate}</span>
										</div>
									)}
								</div>
							</div>
						))}

						<button className="flex items-center gap-1 text-blue-500 text-base font-semibold px-2 border-none outline-none glassmorphic-2 rounded-xl"><FaPlusCircle /> Add Education</button>
					</div>

					<div className="w-[98%] h-[0.5px] bg-gray-400 my-2" />

					<div className="w-full px-0 md:px-5">
						<h1 className="text-[23px] text-center md:text-left font-bold text-gradient-2 mb-2">Experience</h1>

						{authUser?.experience.map((exp, _idx) => (
							<div key={_idx} className="mb-2">
								<h1 className="text-lg font-semibold gradient-text-1">&#10687; {exp.role}</h1>
								<div className="px-5">
									<div className="flex gap-2">
										<span className="text-lg font-base text-gray-400">Company: </span>
										<span className="text-base text-gray-200 mt-0.5">{exp.company}</span>
									</div>

									<div className="gap-2 mb-1">
										<span className="text-lg font-base text-gray-400">Description: </span>
										<span className="text-base text-gray-200 mt-0.5">{exp.description}</span>
									</div>

									<div className="flex gap-2">
										<span className="text-lg font-base text-gray-400">Start Date: </span>
										<span className="text-base text-gray-200 mt-0.5">{exp.startDate}</span>
									</div>

									{exp.endDate && (
										<div className="flex gap-2">
											<span className="text-lg font-base text-gray-400">End Date: </span>
											<span className="text-base text-gray-200 mt-0.5">{exp.endDate}</span>
										</div>
									)}
								</div>
							</div>
						))}

						<button className="flex items-center gap-1 text-blue-500 text-base font-semibold px-2 border-none outline-none glassmorphic-2 rounded-xl"><FaPlusCircle /> Add Experience</button>
					</div>

					<div className="w-[98%] h-[0.5px] bg-gray-400 my-2" />

					<div className="w-full px-0 md:px-5">
						<h1 className="text-[23px] text-center md:text-left font-bold text-gradient-2 mb-2">Projects</h1>

						{authUser?.projects.map((proj, _idx) => (
							<div key={_idx} className="mb-2">
								<h1 className="text-lg font-semibold gradient-text-1">&#10687; {proj.name}</h1>
								<div className="px-5">
									<div className="gap-2 mb-1">
										<span className="text-lg font-base text-gray-400">Description: </span>
										<span className="text-base text-gray-200 mt-0.5">{proj.description}</span>
									</div>

									{proj.url && (
										<div className="flex gap-2">
											<span className="text-lg font-base text-gray-400">Link: </span>
											<a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-base flex gap-1 items-center text-blue-500 mt-0.5">Explore <MdLink /></a>
										</div>
									)}
								</div>
							</div>
						))}

						<button className="flex items-center gap-1 text-blue-500 text-base font-semibold px-2 border-none outline-none glassmorphic-2 rounded-xl"><FaPlusCircle /> Add Project</button>
					</div>

					<div className="w-[98%] h-[0.5px] bg-gray-400 my-2" />

					<div className="w-full px-0 md:px-5 mb-1">
						<h1 className="text-[23px] text-center md:text-left font-bold text-gradient-2 mb-1">Socials</h1>

						<div className="flex flex-col gap-2">
							{authUser?.socials?.github ? (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1"><FaGithub className="-mb-1 size-6" />: </span>
									<a href={authUser.socials.github} target="_blank" rel="noopener noreferrer" className="text-base flex gap-1 items-center text-blue-500 mt-0.5">Explore <MdLink /></a>
								</div>
							) : (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1"><FaGithub className="-mb-1 size-6" />: </span>
									<span className="text-base text-gray-200 mt-0.5">Add your Github Profile</span>
								</div>
							)}

							{authUser?.socials?.linkedIn ? (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1"><FaLinkedin className="-mb-1 size-6" />: </span>
									<a href={authUser.socials.linkedIn} target="_blank" rel="noopener noreferrer" className="text-base flex gap-1 items-center text-blue-500 mt-0.5">Explore <MdLink /></a>
								</div>
							) : (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1"><FaLinkedin className="-mb-1 size-6" />: </span>
									<span className="text-base text-gray-200 mt-0.5">Add your LinkedIn Profile</span>
								</div>
							)}

							{authUser?.socials?.porfolio ? (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1"><IoGlobeSharp className="-mb-1 size-6" />: </span>
									<a href={authUser.socials.porfolio} target="_blank" rel="noopener noreferrer" className="text-base flex gap-1 items-center text-blue-500 mt-0.5">Explore <MdLink /></a>
								</div>
							) : (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1"><IoGlobeSharp className="-mb-1 size-6" />: </span>
									<span className="text-base text-gray-200 mt-0.5">Add your Portfolio</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ApplicantResume;