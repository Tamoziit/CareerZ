import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import RecNavbar from "../../../components/navbars/RecNavbar";
import { JobFormData } from "../../../types/types";
import { useAuthContext } from "../../../context/AuthContext";
import { Tags } from "../../../constants/constants";
import usePostJob from "../../../hooks/usePostJob";
import Spinner from "../../../components/Spinner";

const PostJob = () => {
	const [formData, setFormData] = useState<JobFormData>({
		title: '',
		description: '',
		requirements: [],
		tags: [],
		salary: '',
		location: 'onsite',
		jobType: 'full-time',
		openings: ""
	});
	const { authUser } = useAuthContext();
	const [requirementInput, setRequirementInput] = useState<string>('');
	const [tagInput, setTagInput] = useState<string>('');
	const [availableTags, setAvailableTags] = useState<string[]>(Tags);
	const { loading, postJob } = usePostJob();

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleNumberChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		const numericValue = value === '' ? '' : Number(value);
		setFormData(prev => ({ ...prev, [name]: numericValue }));
	};

	const addRequirement = (): void => {
		if (requirementInput.trim()) {
			setFormData(prev => ({
				...prev,
				requirements: [...prev.requirements, requirementInput.trim()]
			}));
			setRequirementInput('');
		}
	};

	const removeRequirement = (index: number): void => {
		setFormData(prev => ({
			...prev,
			requirements: prev.requirements.filter((_, i) => i !== index)
		}));
	};

	const addTag = (tag: string): void => {
		if (!formData.tags.includes(tag)) {
			setFormData(prev => ({
				...prev,
				tags: [...prev.tags, tag]
			}));
		}
		setTagInput('');
	};
	
	console.log(formData.tags)
	const removeTag = (tag: string): void => {
		setFormData(prev => ({
			...prev,
			tags: prev.tags.filter(t => t !== tag)
		}));
		//console.log(formData.tags)
	};

	const handleRequirementKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addRequirement();
		}
	};

	const filteredTags = availableTags.filter(tag =>
		!formData.tags.includes(tag) &&
		tag.toLowerCase().includes(tagInput.toLowerCase())
	);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Job posting data:', formData);
		const inputs = {
			title: formData.title,
			description: formData.description,
			requirements: formData.requirements,
			tags: formData.tags,
			salary: Number(formData.salary),
			location: formData.location,
			jobType: formData.jobType,
			openings: Number(formData.openings)
		}
		await postJob(inputs);
		setFormData({
			title: '',
			description: '',
			requirements: [],
			tags: [],
			salary: '',
			location: 'onsite',
			jobType: 'full-time',
			openings: ""
		})
	};

	return (
		<>
			<RecNavbar />

			<div className="flex items-center justify-center w-full pt-20 lg:pt-24 pb-10">
				<div className="w-[90%] lg:w-[60%]">
					<h1 className="text-3xl font-bold mb-6 gradient-text-1 text-center">Create New Job Posting</h1>

					<form onSubmit={handleSubmit} className="glassmorphic p-6 space-y-6">
						<div className="flex items-center justify-between w-full px-3">
							<img src={authUser?.logo || "/placeholderImg.png"} alt={authUser?.name} className="size-20" />

							<div className="flex flex-col items-end">
								<span className="text-2xl font-semibold text-gray-300">{authUser?.name}</span>
								<span className="text-base text-gray-400">{authUser?.publicEmail}</span>
							</div>
						</div>

						<div className="w-full h-[0.5px] bg-gray-400" />

						{/* Job Title */}
						<div>
							<label htmlFor="title" className="block text-gray-200 mb-2">
								Job Title*
							</label>
							<input
								type="text"
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								className="input-primary w-full"
								placeholder="e.g. Senior React Developer"
								required
							/>
						</div>

						{/* Description */}
						<div>
							<label htmlFor="description" className="block text-gray-200 mb-2">
								Job Description*
							</label>
							<textarea
								id="description"
								name="description"
								value={formData.description}
								onChange={handleChange}
								className="input-primary w-full h-32 resize-none"
								placeholder="Enter detailed job description..."
								required
							/>
						</div>

						{/* Requirements */}
						<div>
							<label className="block text-gray-200 mb-2">Requirements</label>
							<div className="flex mb-2">
								<input
									type="text"
									value={requirementInput}
									onChange={(e: ChangeEvent<HTMLInputElement>) => setRequirementInput(e.target.value)}
									className="input-primary flex-grow"
									placeholder="Add a requirement"
									onKeyPress={handleRequirementKeyPress}
								/>
								<button
									type="button"
									onClick={addRequirement}
									className="ml-2 btn-accent px-4"
								>
									Add
								</button>
							</div>

							{formData.requirements.length > 0 && (
								<div className="mt-3">
									<h3 className="text-gray-300 text-sm mb-2">Current Requirements:</h3>
									<ul className="space-y-2">
										{formData.requirements.map((req, index) => (
											<li key={index} className="flex items-center bg-slate-900/50 rounded p-2">
												<span className="flex-grow text-gray-200">{req}</span>
												<button
													type="button"
													onClick={() => removeRequirement(index)}
													className="text-red-400 hover:text-red-300 ml-2"
												>
													✕
												</button>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>

						{/* Tags */}
						<div>
							<label className="block text-gray-200 mb-2">Tags</label>
							<div className="relative">
								<input
									type="text"
									value={tagInput}
									onChange={(e: ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
									className="input-primary w-full"
									placeholder="Search or add custom tags"
								/>

								{tagInput && filteredTags.length > 0 ? (
									<div className="absolute z-10 mt-1 w-full bg-slate-900 backdrop-blur-2xl border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto">
										{filteredTags.map((tag) => (
											<div
												key={tag}
												className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-gray-200"
												onClick={() => addTag(tag)}
											>
												{tag}
											</div>
										))}
									</div>
								) : (
									<div className={`absolute z-10 mt-1 w-full bg-slate-900 backdrop-blur-2xl border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto ${!tagInput ? "opacity-0" : "opacity-100"}`}>
										<div
											className="px-4 py-2 hover:bg-slate-700 cursor-pointer text-gray-200"
											onClick={() => addTag(tagInput)}
										>
											{tagInput}
										</div>
									</div>
								)}
							</div>

							{formData.tags.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-3">
									{formData.tags.map((tag) => (
										<span key={tag} className="bg-blue-600/30 text-blue-100 px-3 py-1 rounded-full flex items-center">
											{tag}
											<button
												type="button"
												onClick={() => removeTag(tag)}
												className="ml-2 text-blue-300 hover:text-white"
											>
												✕
											</button>
										</span>
									))}
								</div>
							)}
						</div>

						{/* Salary */}
						<div>
							<label htmlFor="salary" className="block text-gray-200 mb-2">
								Salary (Per Annum in ₹)*
							</label>
							<input
								type="number"
								id="salary"
								name="salary"
								value={formData.salary}
								onChange={handleNumberChange}
								className="input-primary w-full"
								placeholder="e.g. 85000"
								min="0"
								required
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Location */}
							<div>
								<label htmlFor="location" className="block text-gray-200 mb-2">
									Location*
								</label>
								<select
									id="location"
									name="location"
									value={formData.location}
									onChange={handleChange}
									className="input-primary w-full"
									required
								>
									<option value="" className="bg-slate-900 outline-none border-none">Select location type</option>
									<option value="onsite" className="bg-slate-900 outline-none border-none">Onsite</option>
									<option value="remote" className="bg-slate-900 outline-none border-none">Remote</option>
								</select>
							</div>

							{/* Job Type */}
							<div>
								<label htmlFor="jobType" className="block text-gray-200 mb-2">
									Job Type*
								</label>
								<select
									id="jobType"
									name="jobType"
									value={formData.jobType}
									onChange={handleChange}
									className="input-primary w-full"
									required
								>
									<option value="" className="bg-slate-900 outline-none border-none">Select job type</option>
									<option value="full-time" className="bg-slate-900 outline-none border-none">Full-Time</option>
									<option value="part-time" className="bg-slate-900 outline-none border-none">Part-Time</option>
									<option value="internship" className="bg-slate-900 outline-none border-none">Internship</option>
									<option value="contract" className="bg-slate-900 outline-none border-none">Contract</option>
								</select>
							</div>

							{/* Openings */}
							<div>
								<label htmlFor="openings" className="block text-gray-200 mb-2">
									Number of Openings*
								</label>
								<input
									type="number"
									id="openings"
									name="openings"
									placeholder="Should be atleast 1"
									value={formData.openings}
									onChange={handleNumberChange}
									className="input-primary w-full"
									min="1"
									required
								/>
							</div>
						</div>

						<div className="pt-4 flex w-full items-center justify-center">
							<button
								type="submit"
								className="btn-submit !rounded-lg w-[95%] md:w-[80%] py-2"
								disabled={loading}
							>
								{loading ? <Spinner /> : "Create Job Posting"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default PostJob;