import { FaGithub, FaLinkedin, FaPlusCircle } from "react-icons/fa"
import { MdLink } from "react-icons/md"
import { IoGlobeSharp } from "react-icons/io5"
import { useState } from "react"
import { FaPencilAlt } from "react-icons/fa"
import { useAuthContext } from "../../context/AuthContext"
import AppNavbar from "../../components/navbars/AppNavbar"
import SkillsModal from "../../components/modals/SkillsModal"
import LinkModal from "../../components/modals/LinkModal"
import SocialsModal from "../../components/modals/SocialsModal"
import BioModal from "../../components/modals/BioModal"
import EducationModal from "../../components/modals/EducationModal"
import ExperienceModal from "../../components/modals/ExperienceModal"
import ProjectModal from "../../components/modals/ProjectModal"
import useUpdateResume from "../../hooks/useUpdateResume"
import toast from "react-hot-toast"
import Spinner from "../../components/Spinner"

const ApplicantResume = () => {
	const { authUser, setAuthUser } = useAuthContext()

	// Modal states
	const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false)
	const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
	const [isSocialsModalOpen, setIsSocialsModalOpen] = useState(false)
	const [isBioModalOpen, setIsBioModalOpen] = useState(false)

	// Education modal state
	const [isEducationModalOpen, setIsEducationModalOpen] = useState(false)
	const [currentEducation, setCurrentEducation] = useState<{
		degree: string
		institute: string
		startDate: string
		endDate?: string | null
	} | null>(null)

	// Experience modal state
	const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false)
	const [currentExperience, setCurrentExperience] = useState<{
		company: string
		role: string
		description: string
		startDate: string
		endDate?: string | null
	} | null>(null)

	// Project modal state
	const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
	const [currentProject, setCurrentProject] = useState<{
		name: string
		description: string
		url?: string | null
	} | null>(null)

	const { loading, updateResume } = useUpdateResume();

	// Handlers for saving data
	const handleSaveSkills = (skills: string[]) => {
		setAuthUser((prev) => prev ? { ...prev, skills } : prev);
	};

	const handleSaveResume = (resume: string) => {
		setAuthUser((prev) => prev ? { ...prev, resume } : prev);
	};

	const handleSaveSocials = (socials: {
		linkedIn?: string | null;
		github?: string | null;
		porfolio?: string | null;
	}) => {
		setAuthUser((prev) => prev ? { ...prev, socials } : prev);
	};

	const handleSaveBio = (bio: string) => {
		setAuthUser((prev) => prev ? { ...prev, bio } : prev);
	};

	const handleSaveEducation = (education: {
		degree: string;
		institute: string;
		startDate: string;
		endDate?: string | null;
	}) => {
		setAuthUser((prev) => {
			if (!prev) return prev;
			const updatedEducation = prev.education.map((edu) =>
				edu.degree === currentEducation?.degree && edu.institute === currentEducation?.institute
					? education
					: edu
			);

			return { ...prev, education: currentEducation ? updatedEducation : [...prev.education, education] };
		});

		setCurrentEducation(null);
	};

	const handleSaveExperience = (experience: {
		company: string;
		role: string;
		description: string;
		startDate: string;
		endDate?: string | null;
	}) => {
		setAuthUser((prev) => {
			if (!prev) return prev;
			const updatedExperience = prev.experience.map((exp) =>
				exp.company === currentExperience?.company && exp.role === currentExperience?.role
					? experience
					: exp
			);

			return { ...prev, experience: currentExperience ? updatedExperience : [...prev.experience, experience] };
		});

		setCurrentExperience(null);
	};

	const handleSaveProject = (project: {
		name: string;
		description: string;
		url?: string | null;
	}) => {
		setAuthUser((prev) => {
			if (!prev) return prev;
			const updatedProjects = prev.projects.map((proj) =>
				proj.name === currentProject?.name ? project : proj
			);

			return { ...prev, projects: currentProject ? updatedProjects : [...prev.projects, project] };
		});

		setCurrentProject(null);
	};

	// Edit handlers
	const handleEditEducation = (education: {
		degree: string
		institute: string
		startDate: string
		endDate?: string | null
	}) => {
		setCurrentEducation(education)
		setIsEducationModalOpen(true)
	}

	const handleEditExperience = (experience: {
		company: string
		role: string
		description: string
		startDate: string
		endDate?: string | null
	}) => {
		setCurrentExperience(experience)
		setIsExperienceModalOpen(true)
	}

	const handleEditProject = (project: {
		name: string
		description: string
		url?: string | null
	}) => {
		setCurrentProject(project)
		setIsProjectModalOpen(true)
	}

	const handleSubmit = async () => {
		if (authUser) {
			await updateResume(authUser!);
		} else {
			toast.error("Cannot fetch Resume details");
		}
	}

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
							<div className="gap-2 mb-1 flex items-start">
								<span className="text-lg font-base text-gray-400">Bio: </span>
								{authUser?.bio ? (
									<span className="text-base text-gray-200 mt-0.5">{authUser?.bio}</span>
								) : (
									<span className="text-base text-gray-200 mt-0.5">Update Bio</span>
								)}
								<button className="ml-2 h-6 w-6 text-gray-400 hover:text-white" onClick={() => setIsBioModalOpen(true)}>
									<FaPencilAlt className="h-4 w-4" />
								</button>
							</div>

							<div className="flex gap-2">
								<span className="text-lg font-base text-gray-400">Date of Birth: </span>
								<span className="text-base text-gray-200 mt-0.5">{authUser?.dob}</span>
							</div>

							<div className="flex gap-2 items-center">
								<span className="text-lg font-base text-gray-400">Resume: </span>
								{authUser?.resume ? (
									<a
										href={authUser.resume}
										target="_blank"
										rel="noopener noreferrer"
										className="text-base text-blue-500 mt-0.5 flex gap-1 items-center"
									>
										Resume Link <MdLink />
									</a>
								) : (
									<span className="text-base text-gray-200 mt-0.5">Update Resume</span>
								)}
								<button
									className="ml-2 h-6 w-6 text-gray-400 hover:text-white"
									onClick={() => setIsResumeModalOpen(true)}
								>
									<FaPencilAlt className="h-4 w-4" />
								</button>
							</div>

							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<span className="text-lg font-base text-gray-400">Skills: </span>
									<button className="h-6 w-6 text-gray-400 hover:text-white" onClick={() => setIsSkillsModalOpen(true)}>
										<FaPencilAlt className="h-4 w-4" />
									</button>
								</div>
								{authUser?.skills.length !== 0 ? (
									<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 ml-4">
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
									<span className="text-base text-gray-200 mt-0.5 ml-4">Add Skills</span>
								)}
							</div>
						</div>
					</div>

					<div className="w-[98%] h-[0.5px] bg-gray-400 my-2" />

					<div className="w-full px-0 md:px-5">
						<div className="flex items-center justify-between">
							<h1 className="text-[23px] text-center md:text-left font-bold text-gradient-2 mb-2">Education</h1>
							<button
								className="flex items-center gap-1 text-blue-500 text-base font-semibold px-2 border-none outline-none glassmorphic-2 rounded-xl"
								onClick={() => {
									setCurrentEducation(null)
									setIsEducationModalOpen(true)
								}}
							>
								<FaPlusCircle /> Add Education
							</button>
						</div>

						{authUser?.education.map((edu, _idx) => (
							<div key={_idx} className="mb-2">
								<div className="flex items-center gap-2">
									<h1 className="text-lg font-semibold gradient-text-1">&#10687; {edu.degree}</h1>
									<button className="h-6 w-6 text-gray-400 hover:text-white" onClick={() => handleEditEducation(edu)}>
										<FaPencilAlt className="h-4 w-4" />
									</button>
								</div>
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
					</div>

					<div className="w-[98%] h-[0.5px] bg-gray-400 my-2" />

					<div className="w-full px-0 md:px-5">
						<div className="flex items-center justify-between">
							<h1 className="text-[23px] text-center md:text-left font-bold text-gradient-2 mb-2">Experience</h1>
							<button
								className="flex items-center gap-1 text-blue-500 text-base font-semibold px-2 border-none outline-none glassmorphic-2 rounded-xl"
								onClick={() => {
									setCurrentExperience(null)
									setIsExperienceModalOpen(true)
								}}
							>
								<FaPlusCircle /> Add Experience
							</button>
						</div>

						{authUser?.experience.map((exp, _idx) => (
							<div key={_idx} className="mb-2">
								<div className="flex items-center gap-2">
									<h1 className="text-lg font-semibold gradient-text-1">&#10687; {exp.role}</h1>
									<button className="h-6 w-6 text-gray-400 hover:text-white" onClick={() => handleEditExperience(exp)}>
										<FaPencilAlt className="h-4 w-4" />
									</button>
								</div>
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
					</div>

					<div className="w-[98%] h-[0.5px] bg-gray-400 my-2" />

					<div className="w-full px-0 md:px-5">
						<div className="flex items-center justify-between">
							<h1 className="text-[23px] text-center md:text-left font-bold text-gradient-2 mb-2">Projects</h1>
							<button
								className="flex items-center gap-1 text-blue-500 text-base font-semibold px-2 border-none outline-none glassmorphic-2 rounded-xl"
								onClick={() => {
									setCurrentProject(null)
									setIsProjectModalOpen(true)
								}}
							>
								<FaPlusCircle /> Add Project
							</button>
						</div>

						{authUser?.projects.map((proj, _idx) => (
							<div key={_idx} className="mb-2">
								<div className="flex items-center gap-2">
									<h1 className="text-lg font-semibold gradient-text-1">&#10687; {proj.name}</h1>
									<button className="h-6 w-6 text-gray-400 hover:text-white" onClick={() => handleEditProject(proj)}>
										<FaPencilAlt className="h-4 w-4" />
									</button>
								</div>
								<div className="px-5">
									<div className="gap-2 mb-1">
										<span className="text-lg font-base text-gray-400">Description: </span>
										<span className="text-base text-gray-200 mt-0.5">{proj.description}</span>
									</div>

									{proj.url && (
										<div className="flex gap-2">
											<span className="text-lg font-base text-gray-400">Link: </span>
											<a
												href={proj.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-base flex gap-1 items-center text-blue-500 mt-0.5"
											>
												Explore <MdLink />
											</a>
										</div>
									)}
								</div>
							</div>
						))}
					</div>

					<div className="w-[98%] h-[0.5px] bg-gray-400 my-2" />

					<div className="w-full px-0 md:px-5 mb-1">
						<div className="flex items-center justify-between">
							<h1 className="text-[23px] text-center md:text-left font-bold text-gradient-2 mb-1">Socials</h1>
							<button className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => setIsSocialsModalOpen(true)}>
								<FaPencilAlt className="h-4 w-4" />
							</button>
						</div>

						<div className="flex flex-col gap-2">
							{authUser?.socials?.github ? (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1">
										<FaGithub className="-mb-1 size-6" />:{" "}
									</span>
									<a
										href={authUser.socials.github}
										target="_blank"
										rel="noopener noreferrer"
										className="text-base flex gap-1 items-center text-blue-500 mt-0.5"
									>
										Explore <MdLink />
									</a>
								</div>
							) : (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1">
										<FaGithub className="-mb-1 size-6" />:{" "}
									</span>
									<span className="text-base text-gray-200 mt-0.5">Add your Github Profile</span>
								</div>
							)}

							{authUser?.socials?.linkedIn ? (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1">
										<FaLinkedin className="-mb-1 size-6" />:{" "}
									</span>
									<a
										href={authUser.socials.linkedIn}
										target="_blank"
										rel="noopener noreferrer"
										className="text-base flex gap-1 items-center text-blue-500 mt-0.5"
									>
										Explore <MdLink />
									</a>
								</div>
							) : (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1">
										<FaLinkedin className="-mb-1 size-6" />:{" "}
									</span>
									<span className="text-base text-gray-200 mt-0.5">Add your LinkedIn Profile</span>
								</div>
							)}

							{authUser?.socials?.porfolio ? (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1">
										<IoGlobeSharp className="-mb-1 size-6" />:{" "}
									</span>
									<a
										href={authUser.socials.porfolio}
										target="_blank"
										rel="noopener noreferrer"
										className="text-base flex gap-1 items-center text-blue-500 mt-0.5"
									>
										Explore <MdLink />
									</a>
								</div>
							) : (
								<div className="flex gap-2">
									<span className="text-lg font-base text-gray-300 flex items-center gap-1">
										<IoGlobeSharp className="-mb-1 size-6" />:{" "}
									</span>
									<span className="text-base text-gray-200 mt-0.5">Add your Portfolio</span>
								</div>
							)}
						</div>
					</div>

					<button className="btn-secondary w-full !py-2 mt-2"
						disabled={loading}
						onClick={handleSubmit}
					>
						{loading ? <Spinner /> : "Update Resume"}
					</button>
				</div>
			</div>

			{/* Modals */}
			<SkillsModal
				isOpen={isSkillsModalOpen}
				onClose={() => setIsSkillsModalOpen(false)}
				currentSkills={authUser?.skills || []}
				onSave={handleSaveSkills}
			/>

			<LinkModal
				isOpen={isResumeModalOpen}
				onClose={() => setIsResumeModalOpen(false)}
				title="Update Resume"
				fieldName="Resume Link"
				currentValue={authUser?.resume || ""}
				onSave={handleSaveResume}
			/>

			<SocialsModal
				isOpen={isSocialsModalOpen}
				onClose={() => setIsSocialsModalOpen(false)}
				currentSocials={authUser?.socials || null}
				onSave={handleSaveSocials}
			/>

			<BioModal
				isOpen={isBioModalOpen}
				onClose={() => setIsBioModalOpen(false)}
				currentBio={authUser?.bio || ""}
				onSave={handleSaveBio}
			/>

			<EducationModal
				isOpen={isEducationModalOpen}
				onClose={() => setIsEducationModalOpen(false)}
				currentEducation={currentEducation}
				onSave={handleSaveEducation}
			/>

			<ExperienceModal
				isOpen={isExperienceModalOpen}
				onClose={() => setIsExperienceModalOpen(false)}
				currentExperience={currentExperience}
				onSave={handleSaveExperience}
			/>

			<ProjectModal
				isOpen={isProjectModalOpen}
				onClose={() => setIsProjectModalOpen(false)}
				currentProject={currentProject}
				onSave={handleSaveProject}
			/>
		</>
	)
}

export default ApplicantResume;