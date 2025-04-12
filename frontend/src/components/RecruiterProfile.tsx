import { FaLinkedin, FaPen } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import Spinner from "./Spinner";
import useUpdateRecruiterProfile from "../hooks/useUpdateRecruiterProfile";
import handleImageUpload from "../utils/uploadBlobToCloudinary";
import { FaXTwitter } from "react-icons/fa6";
import RecruiterEditModal from "./modals/RecruiterEditModal";
import { RecruiterUpdatableFields } from "../types/types";

interface EditingField {
	key: keyof RecruiterUpdatableFields | "linkedIn" | "x";
	title: string;
	value: string;
}

const RecruiterProfile = () => {
	const { authUser } = useAuthContext();
	const [uploading, setUploading] = useState<boolean>(false);
	const { loading: updating, profile } = useUpdateRecruiterProfile();
	const [updatableFields, setUpdatableFileds] = useState<RecruiterUpdatableFields>({
		logo: authUser?.logo || "",
		publicEmail: authUser?.publicEmail || "",
		website: authUser?.website || "",
		socials: {
			linkedIn: authUser?.socials?.linkedIn || "",
			x: authUser?.socials?.x || ""
		},
		about: authUser?.about || ""
	});
	const [editingField, setEditingField] = useState<EditingField | null>(null);

	const handleProfilePicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setUploading(true);
		if (e.target.files) {
			const file = e.target.files[0];
			const uploadedUrl = await handleImageUpload(file);
			setUpdatableFileds({ ...updatableFields, logo: uploadedUrl });
		}

		setUploading(false);
	};

	const handleUpdateProfile = async () => {
		if (!editingField) return;
		const { key, value } = editingField;

		if (key === "linkedIn" || key === "x") {
			setUpdatableFileds((prev) => ({
				...prev,
				socials: { ...prev.socials, [key]: value },
			}));
		} else {
			setUpdatableFileds((prev) => ({
				...prev,
				[key]: value,
			}));
		}

		setEditingField(null);
	}

	const handleSave = async () => {
		await profile(updatableFields);
	}

	return (
		<div className="mt-5 w-full flex flex-col items-center justify-center p-6">
			<div className="w-full flex flex-col items-center justify-center mb-6">
				<h1 className="text-[39px] lg:text-[50px] font-bold gradient-text-1 z-10">Company Profile</h1>
				<span className="lg:text-lg font-medium italic text-gray-300">Your Company Details</span>
			</div>

			<div className="flex glassmorphic-2 rounded-lg flex-col items-center justify-center w-full gap-4 lg:w-[60%] py-4 px-8 card-3">
				<div className="flex flex-col md:flex-row items-center justify-between w-full z-10">
					<div className="flex items-center justify-center relative">
						<img
							src={authUser?.logo || updatableFields.logo || "/placeholderImg.png"}
							alt="profile_bg"
							className="w-40 h-40 rounded-full object-cover border-2 border-gray-700"
						/>

						<label
							htmlFor="profile-pic-upload"
							className="absolute bottom-2 right-2 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-800 transition"
						>
							{uploading || updating ? <Spinner /> : (
								<div>
									<FaPen className="size-5 text-white" />
									<input
										type="file"
										id="profile-pic-upload"
										className="hidden"
										accept="image/*"
										onChange={handleProfilePicUpload}
									/>
								</div>
							)}
						</label>
					</div>

					<div className="flex flex-col items-center md:items-end justify-center mt-3">
						<span className="text-xl md:text-2xl font-bold text-gray-200">{authUser?.name}</span>
						<span className="text-base font-semibold text-gray-400">{authUser?.email}</span>
						<span className="text-base font-medium text-gray-500">{authUser?.mobileNo}</span>
					</div>
				</div>

				<div className="w-full md:px-6 flex flex-col items-center md:items-start justify-center md:mt-1">
					<h1 className="text-lg font-semibold text-gray-200">About the Company</h1>
					<p className="flex items-center text-center md:text-left text-gray-300">
						{authUser?.bio ? authUser.bio : (updatableFields.about || "Add your company's bio")}
						<FaPen
							onClick={() =>
								setEditingField({
									key: "about",
									title: "Edit bio",
									value: updatableFields.about,
								})
							}
							className="text-gray-400 cursor-pointer hover:text-white ml-2"
						/>
					</p>
				</div>

				<div className="w-full h-[0.5px] bg-gray-500" />

				<div className="flex flex-col items-center md:items-start justify-center w-full z-10 space-y-2 md:px-6">
					<div className="w-full flex items-center justify-center md:justify-start break-words whitespace-normal">
						<span className="font-semibold text-gray-400">Public Email:&nbsp;</span>
						<span className="font-medium flex items-center text-gray-300">
							{authUser?.publicEmail || updatableFields.publicEmail}
							<FaPen
								onClick={() =>
									setEditingField({
										key: "publicEmail",
										title: "Edit Public Email",
										value: updatableFields.publicEmail,
									})
								}
								className="text-gray-400 cursor-pointer hover:text-white ml-2"
							/>
						</span>
					</div>

					<div className="w-full items-center justify-center md:justify-start flex break-words whitespace-normal">
						<span className="font-semibold text-gray-400">Website:&nbsp;</span>
						<div className="flex items-center">
							<a
								href={authUser?.website || updatableFields.website}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 underline break-all"
							>
								{authUser?.website || updatableFields.website}
							</a>
							<FaPen
								onClick={() =>
									setEditingField({
										key: "website",
										title: "Edit Website",
										value: updatableFields.website,
									})
								}
								className="text-gray-400 cursor-pointer hover:text-white ml-2"
							/>
						</div>
					</div>

					<div className="w-full text-center md:text-left break-words whitespace-normal">
						<span className="font-semibold text-gray-400">City:&nbsp;</span>
						<span className="font-medium text-gray-300">{authUser?.location?.city}</span>
					</div>

					<div className="w-full text-center md:text-left break-words whitespace-normal">
						<span className="font-semibold text-gray-400">State:&nbsp;</span>
						<span className="font-medium text-gray-300">{authUser?.location?.state}</span>
					</div>

					<div className="w-full text-center md:text-left break-words whitespace-normal">
						<span className="font-semibold text-gray-400">Country:&nbsp;</span>
						<span className="font-medium text-gray-300">{authUser?.location?.country}</span>
					</div>

					<div className="w-full text-center md:text-left break-words whitespace-normal">
						<span className="font-semibold text-gray-400">Pincode:&nbsp;</span>
						<span className="font-medium text-gray-300">{authUser?.location?.pincode}</span>
					</div>
				</div>

				<div className="w-full h-[0.5px] bg-gray-500" />

				<div className="flex items-center justify-center w-full z-10 gap-10 md:gap-32">
					{authUser?.socials?.linkedIn || updatableFields.socials.linkedIn ? (
						<div className="flex flex-col items-center gap-0.5">
							<a
								href={authUser!.socials!.linkedIn! || updatableFields.socials.linkedIn}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 text-4xl hover:text-blue-400 cursor-pointer"
							>
								<FaLinkedin />
							</a>
							<FaPen
								onClick={() =>
									setEditingField({
										key: "linkedIn",
										title: "Edit LinkedIn",
										value: updatableFields.socials.linkedIn,
									})
								}
								className="text-gray-400 cursor-pointer hover:text-white mt-0.5"
							/>
						</div>
					) : (
						<div className="flex items-center flex-col">
							<FaLinkedin className="text-gray-300 text-4xl hover:text-blue-400 cursor-pointer" />
							<span className="text-base flex items-center text-gray-400">
								Add your LinkedIn
							</span>
							<FaPen
								onClick={() =>
									setEditingField({
										key: "linkedIn",
										title: "Edit LinkedIn",
										value: updatableFields.socials.linkedIn,
									})
								}
								className="text-gray-400 cursor-pointer hover:text-white mt-0.5"
							/>
						</div>
					)}

					{authUser?.socials?.x || updatableFields.socials.x ? (
						<div className="flex flex-col items-center gap-0.5">
							<a
								href={authUser!.socials!.x! || updatableFields.socials.x}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-300 text-4xl hover:text-blue-400 cursor-pointer"
							>
								<FaXTwitter />
							</a>
							<FaPen
								onClick={() =>
									setEditingField({
										key: "linkedIn",
										title: "Edit LinkedIn",
										value: updatableFields.socials.linkedIn,
									})
								}
								className="text-gray-400 cursor-pointer hover:text-white mt-0.5"
							/>
						</div>
					) : (
						<div className="flex items-center flex-col">
							<FaXTwitter className="text-gray-300 text-4xl hover:text-blue-400 cursor-pointer" />
							<span className="text-base flex items-center text-gray-400">
								Add your X Handle
							</span>
							<FaPen
								onClick={() =>
									setEditingField({
										key: "x",
										title: "Edit X Handle",
										value: updatableFields.socials.x,
									})
								}
								className="text-gray-400 cursor-pointer hover:text-white mt-0.5"
							/>
						</div>
					)}
				</div>

				<div className="w-full h-[0.5px] bg-gray-500" />

				<div className="w-full flex items-center justify-center">
					<button
						className="btn-accent w-[50%] py-1.5"
						disabled={uploading}
						onClick={handleSave}
					>
						{uploading ? <Spinner /> : "Save Changes"}
					</button>
				</div>

				{/* Edit Modal */}
				{editingField && (
					<RecruiterEditModal
						isOpen={!!editingField}
						title={editingField.title}
						value={editingField.value}
						onChange={(val) =>
							setEditingField((prev) => (prev ? { ...prev, value: val } : null))
						}
						onClose={() => setEditingField(null)}
						onSave={handleUpdateProfile}
					/>
				)}
			</div>
		</div>
	)
}

export default RecruiterProfile;