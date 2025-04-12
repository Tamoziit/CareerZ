import { useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";

export interface EditModalProps {
	isOpen: boolean;
	title: string;
	value: string;
	onChange: (val: string) => void;
	onClose: () => void;
	onSave: () => void;
}

const EditModal = ({
	isOpen,
	title,
	value,
	onChange,
	onClose,
	onSave,
}: EditModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
			<div
				ref={modalRef}
				className="relative glassmorphic-3 rounded-lg shadow-lg p-6 w-full max-w-md"
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-200 hover:text-white p-1 rounded-full hover:bg-gray-700 transition"
					aria-label="Close modal"
				>
					<IoCloseSharp size={20} />
				</button>

				<h2 className="text-xl font-semibold mb-4 text-gray-200">{title}</h2>
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full input-primary"
				/>
				<div className="flex justify-end space-x-2 mt-3">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
					>
						Cancel
					</button>
					<button
						onClick={onSave}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditModal;