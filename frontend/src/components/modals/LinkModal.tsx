import { useState } from "react";
import BaseModal from "./BaseModal";

interface LinkModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    fieldName: string
    currentValue?: string | null
    onSave: (value: string) => void
}

const LinkModal = ({ isOpen, onClose, title, fieldName, currentValue, onSave }: LinkModalProps) => {
    const [value, setValue] = useState(currentValue || "")

    const handleSubmit = () => {
        if (value.trim()) {
            onSave(value.trim())
            onClose()
        }
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <label htmlFor={fieldName} className="text-sm font-medium text-gray-300">
                        {fieldName}
                    </label>
                    <input
                        id={fieldName}
                        type="url"
                        placeholder={`Enter ${fieldName.toLowerCase()} URL`}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
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

export default LinkModal;