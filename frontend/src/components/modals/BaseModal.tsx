import { type ReactNode, useEffect, useRef } from "react"

interface BaseModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

const BaseModal = ({ isOpen, onClose, title, children }: BaseModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)

    // Closing on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }

        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [onClose])

    // Closing when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick)
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="w-full max-w-md rounded-lg glassmorphic p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl gradient-text-1">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default BaseModal;