import { useState } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { IoGlobeSharp } from "react-icons/io5"
import BaseModal from "./BaseModal"

interface Socials {
    linkedIn?: string | null
    github?: string | null
    porfolio?: string | null
}

interface SocialsModalProps {
    isOpen: boolean
    onClose: () => void
    currentSocials?: Socials | null
    onSave: (socials: Socials) => void
}

const SocialsModal = ({ isOpen, onClose, currentSocials, onSave }: SocialsModalProps) => {
    const [socials, setSocials] = useState<Socials>({
        linkedIn: currentSocials?.linkedIn || "",
        github: currentSocials?.github || "",
        porfolio: currentSocials?.porfolio || "",
    })

    const handleChange = (field: keyof Socials, value: string) => {
        setSocials({
            ...socials,
            [field]: value,
        })
    }

    const handleSubmit = () => {
        // Cleaning up empty values to be null
        const cleanedSocials: Socials = {}

        if (socials.linkedIn?.trim()) cleanedSocials.linkedIn = socials.linkedIn.trim()
        if (socials.github?.trim()) cleanedSocials.github = socials.github.trim()
        if (socials.porfolio?.trim()) cleanedSocials.porfolio = socials.porfolio.trim()

        onSave(cleanedSocials)
        onClose()
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Update Social Links">
            <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <label htmlFor="github" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <FaGithub className="size-5" /> GitHub
                    </label>
                    <input
                        id="github"
                        type="url"
                        placeholder="https://github.com/username"
                        value={socials.github || ""}
                        onChange={(e) => handleChange("github", e.target.value)}
                        className="px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="linkedin" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <FaLinkedin className="size-5" /> LinkedIn
                    </label>
                    <input
                        id="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={socials.linkedIn || ""}
                        onChange={(e) => handleChange("linkedIn", e.target.value)}
                        className="px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="portfolio" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <IoGlobeSharp className="size-5" /> Portfolio
                    </label>
                    <input
                        id="portfolio"
                        type="url"
                        placeholder="https://yourportfolio.com"
                        value={socials.porfolio || ""}
                        onChange={(e) => handleChange("porfolio", e.target.value)}
                        className="px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </BaseModal>
    )
}

export default SocialsModal;