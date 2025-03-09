import FormModal from "./FormModal"

interface Education {
    degree: string
    institute: string
    startDate: string
    endDate?: string | null
}

interface EducationModalProps {
    isOpen: boolean
    onClose: () => void
    currentEducation?: Education | null
    onSave: (education: Education) => void
}

const EducationModal = ({ isOpen, onClose, currentEducation, onSave }: EducationModalProps) => {
    const initialValues: Education = currentEducation || {
        degree: "",
        institute: "",
        startDate: "",
        endDate: "",
    }

    const fields = [
        {
            name: "degree",
            label: "Degree",
            type: "text" as const,
            required: true,
            placeholder: "Bachelor of Science in Computer Science",
        },
        {
            name: "institute",
            label: "Institute",
            type: "text" as const,
            required: true,
            placeholder: "University Name",
        },
        {
            name: "startDate",
            label: "Start Date",
            type: "date" as const,
            required: true,
        },
        {
            name: "endDate",
            label: "End Date",
            type: "date" as const,
            required: false,
        },
    ]

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title={currentEducation ? "Edit Education" : "Add Education"}
            fields={fields}
            initialValues={initialValues}
            onSave={onSave}
        />
    )
}

export default EducationModal;