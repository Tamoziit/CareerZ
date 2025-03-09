import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { GiSuitcase } from "react-icons/gi";
import { MdAutoGraph } from "react-icons/md";
import { LuMessageSquareText } from "react-icons/lu";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { FaAward } from "react-icons/fa6";

const AppNavbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { loading, logout } = useLogout();

	const items = [
		{
			name: "Resume",
			icon: <FaFileAlt />,
			link: "/applicant/resume",
		},
		{
			name: "Jobs",
			icon: <GiSuitcase />,
			link: "/applicant/jobs",
		},
		{
			name: "Internships",
			icon: <MdAutoGraph />,
			link: "/applicant/internships",
		},
		{
			name: "Messages",
			icon: <LuMessageSquareText />,
			link: "/applicant/messages",
		},
		{
			name: "Applications",
			icon: <FaAward />,
			link: "/applicant/applications",
		}
	];

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<div className="py-2 px-8 absolute left-0 top-0 w-full text-white flex items-center justify-between lg:bg-white/5 lg:backdrop-blur-md lg:shadow-md lg:border lg:border-white/20 z-50">
			<div>
				<img src="/logo.png" alt="logo" className="w-[190px]" />
			</div>

			{/* Hamburger Icon for Mobile */}
			<button
				className="lg:hidden flex items-center text-gray-300 focus:outline-none"
				onClick={toggleMenu}
			>
				<svg
					className="w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					{isMenuOpen ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					)}
				</svg>
			</button>

			{/* Desktop Navigation */}
			<div className="hidden lg:flex gap-6">
				{items.map((item, _idx) => (
					<div key={_idx} className="flex items-center gap-2">
						<span>{item.icon}</span>
						<Link
							key={_idx}
							to={item.link}
							className="relative text-lg font-medium text-gray-300 before:absolute before:bottom-0 before:left-0 before:h-[2.3px] before:w-0 before:bg-blue-300 before:transition-all before:duration-300 hover:before:w-full"
						>
							{item.name}
						</Link>
					</div>
				))}

				<button
					disabled={loading}
					onClick={logout}
				>
					<MdOutlineLogout className="size-5" />
				</button>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="absolute top-full right-0 w-full p-3 lg:hidden bg-white/5 backdrop-blur-2xl shadow-md border border-white/20">
					<ul className="flex flex-col items-center space-y-4 py-4">
						{items.map((item, _idx) => (
							<li key={_idx} className="flex items-center gap-2">
								<span>{item.icon}</span>
								<Link
									to={item.link}
									className="relative text-lg font-medium text-gray-100 before:absolute before:bottom-0 before:left-0 before:h-[2.3px] before:w-0 before:bg-blue-300 before:transition-all before:duration-300 hover:before:w-full z-20"
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</Link>
							</li>
						))}

						<div className="flex items-center gap-2">
							<MdOutlineLogout className="size-5" />
							<button
								className="relative gap-2 text-lg font-medium text-gray-100 before:absolute before:bottom-0 before:left-0 before:h-[2.3px] before:w-0 before:bg-blue-300 before:transition-all before:duration-300 hover:before:w-full"
								disabled={loading}
								onClick={logout}
							>
								Logout
							</button>
						</div>
					</ul>
				</div>
			)}
		</div>
	);
};

export default AppNavbar;