import FormModal from "./FormModal";

interface Experience {
    company: string
    role: string
    description: string
    startDate: string
    endDate?: string | null
}

interface ExperienceModalProps {
    isOpen: boolean
    onClose: () => void
    currentExperience?: Experience | null
    onSave: (experience: Experience) => void
}

const ExperienceModal = ({ isOpen, onClose, currentExperience, onSave }: ExperienceModalProps) => {
    const initialValues: Experience = currentExperience || {
        company: "",
        role: "",
        description: "",
        startDate: "",
        endDate: "",
    }

    const fields = [
        {
            name: "role",
            label: "Role",
            type: "text" as const,
            required: true,
            placeholder: "Software Engineer",
        },
        {
            name: "company",
            label: "Company",
            type: "text" as const,
            required: true,
            placeholder: "Company Name",
        },
        {
            name: "description",
            label: "Description",
            type: "textarea" as const,
            required: true,
            placeholder: "Describe your responsibilities and achievements",
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
            title={currentExperience ? "Edit Experience" : "Add Experience"}
            fields={fields}
            initialValues={initialValues}
            onSave={onSave}
        />
    )
}

export default ExperienceModal;