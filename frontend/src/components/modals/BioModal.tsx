import { useState } from "react"
import BaseModal from "./BaseModal"

interface BioModalProps {
    isOpen: boolean
    onClose: () => void
    currentBio?: string | null
    onSave: (bio: string) => void
}

const BioModal = ({ isOpen, onClose, currentBio, onSave }: BioModalProps) => {
    const [bio, setBio] = useState(currentBio || "")

    const handleSubmit = () => {
        onSave(bio.trim())
        onClose()
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Update Bio">
            <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <label htmlFor="bio" className="text-sm font-medium text-gray-300">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        placeholder="Tell us about yourself"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
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

export default BioModal;