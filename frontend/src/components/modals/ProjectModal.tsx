import FormModal from "./FormModal"

interface Project {
    name: string
    description: string
    url?: string | null
}

interface ProjectModalProps {
    isOpen: boolean
    onClose: () => void
    currentProject?: Project | null
    onSave: (project: Project) => void
}

const ProjectModal = ({ isOpen, onClose, currentProject, onSave }: ProjectModalProps) => {
    const initialValues: Project = currentProject || {
        name: "",
        description: "",
        url: "",
    }

    const fields = [
        {
            name: "name",
            label: "Project Name",
            type: "text" as const,
            required: true,
            placeholder: "My Awesome Project",
        },
        {
            name: "description",
            label: "Description",
            type: "textarea" as const,
            required: true,
            placeholder: "Describe your project",
        },
        {
            name: "url",
            label: "Project URL",
            type: "url" as const,
            required: false,
            placeholder: "https://github.com/username/project",
        },
    ]

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title={currentProject ? "Edit Project" : "Add Project"}
            fields={fields}
            initialValues={initialValues}
            onSave={onSave}
        />
    )
}

export default ProjectModal;