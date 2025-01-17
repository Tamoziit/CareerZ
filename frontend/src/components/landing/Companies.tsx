import { companies } from "../../data/constants"

const Companies = () => {
	return (
		<div id="companies" className="mt-10 w-full items-center justify-center p-4">
			<div className="w-full flex flex-col gap-1 items-center justify-center">
				<h1 className="text-[39px] lg:text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-300 z-10">Partner Companies</h1>
				<p className="lg:text-lg italic text-gray-200 text-center">Companies who have put their precious Faith & Trust on Us!</p>
			</div>

			<div className="grid grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
				{companies.map((company, _idx) => (
					<div
						key={_idx}
						className="bg-white/5 backdrop-blur-lg shadow-md border border-white/30 rounded-lg flex flex-col items-center justify-center p-4"
					>
						<h1 className="text-lg font-semibold mb-2 text-gray-300">{company.name}</h1>

						<img src={company.url} alt={company.name} className="w-[50px] md:w-[100px]" />
					</div>
				))}
			</div>
		</div>
	)
}

export default Companies;