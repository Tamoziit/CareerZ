const About = () => {
	const cards = [
		{
			img: "/discover.png",
			head: "Discover",
			desc: "Explore and Discover a plethora of Opportunities"
		},
		{
			img: "/upskill.png",
			head: "Upskill",
			desc: "Upskill and Take your Career to the next Horizon"
		},
		{
			img: "/grow.png",
			head: "Grow",
			desc: "Onboard budding Talents and accelerate the Holistic growth of your company"
		}
	];

	return (
		<div id="about" className="mt-10 w-full items-center justify-center p-4">
			<div className="w-full flex flex-col gap-1 items-center justify-center">
				<h1 className="text-[39px] lg:text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-300 z-10">About</h1>
				<p className="lg:text-lg italic text-gray-200 text-center">What We Do is What we Are!</p>
			</div>

			<div className="w-full flex gap-4 lg:gap-10 items-center justify-center mt-10">
				{cards.map((card, _idx) => (
					<div
						key={_idx}
						className="bg-white/5 backdrop-blur-lg shadow-md border border-white/30 rounded-lg flex flex-col items-center justify-center p-4 w-[300px] lg:[400px]" 
					>
						<h1 className="text-lg font-semibold mb-0.5 text-gray-300">{card.head}</h1>
						<div className="h-[3px] bg-blue-300 w-6 rounded-lg" />
						<img
							src={card.img}
							alt={card.head}
							className="w-[160px] md:w-[200px] lg:w-[260px] mb-4 rounded-lg"
						/>
						<p className="hidden sm:block text-center text-sm text-gray-300">{card.desc}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default About;
