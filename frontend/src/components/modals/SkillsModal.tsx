import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import BaseModal from "./BaseModal";

interface SkillsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentSkills: string[];
    onSave: (skills: string[]) => void;
}

const SkillsModal = ({ isOpen, onClose, currentSkills, onSave }: SkillsModalProps) => {
    const [skills, setSkills] = useState<string[]>(currentSkills || []);
    const [newSkill, setNewSkill] = useState("");

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const handleSubmit = () => {
        onSave(skills);
        onClose();
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Update Skills">
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                    />
                    <button
                        onClick={handleAddSkill}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded-md">
                            <span className="text-gray-200">{skill}</span>
                            <button className="text-gray-400 hover:text-white" onClick={() => handleRemoveSkill(skill)}>
                                <FaTimes className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
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
    );
};

export default SkillsModal;