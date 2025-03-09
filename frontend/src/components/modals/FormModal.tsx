import { useState } from "react"
import BaseModal from "./BaseModal"

interface FormField {
    name: string
    label: string
    type: "text" | "textarea" | "date" | "url"
    required?: boolean
    placeholder?: string
}

interface FormModalProps<T> {
    isOpen: boolean
    onClose: () => void
    title: string
    fields: FormField[]
    initialValues: T
    onSave: (values: T) => void
}

const FormModal = <T,>({ isOpen, onClose, title, fields, initialValues, onSave }: FormModalProps<T>) => {

    const [values, setValues] = useState<T>(initialValues)
    const [currentlyEmployed, setCurrentlyEmployed] = useState(false)

    const handleChange = (field: string, value: any) => {
        setValues({
            ...values,
            [field]: value,
        })
    }

    const handleSubmit = () => {
        onSave(values)
        onClose()
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex flex-col gap-4">
                {fields.map((field) => (
                    <div key={field.name} className="grid gap-2">
                        <label htmlFor={field.name} className="text-sm font-medium text-gray-300">
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}
                        </label>

                        {field.type === "textarea" ? (
                            <textarea
                                id={field.name}
                                placeholder={field.placeholder}
                                value={(values as any)[field.name] || ""}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                className="px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                required={field.required}
                            />
                        ) : (
                            <input
                                id={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={(values as any)[field.name] || ""}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                className="px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={field.required}
                            />
                        )}
                    </div>
                ))}

                {/* Special handling for current employment */}
                {fields.some((f) => f.name === "endDate") && (
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="currentlyEmployed"
                            checked={currentlyEmployed}
                            onChange={(e) => {
                                setCurrentlyEmployed(e.target.checked)
                                if (e.target.checked) {
                                    handleChange("endDate", null)
                                }
                            }}
                            className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="currentlyEmployed" className="text-sm font-medium text-gray-300">
                            Currently working here
                        </label>
                    </div>
                )}

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

export default FormModal;