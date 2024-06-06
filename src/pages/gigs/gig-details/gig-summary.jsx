import React from "react";
import { formatDate, formatNumber } from "../../../helpers/function";

export function GigSummary() {
	return (
		<div>
			<div className="flex gap-2 items-center mb-2">
				<span className="p-2 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
					Entertainment
				</span>
				<span> &gt; </span>
				<span className="p-2 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
					Acting
				</span>
			</div>
			<p className="text-primary text-2xl font-bold mb-4">
				Need servers for a birthday party
			</p>
			<div className="block md:flex gap-4">
				<div className="w-full md:w-1/2">
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Experience</p>
						<div>
							<span className="text-xs w-fit border border-[#FF9533] gap-2 text-[#FF9533] p-2 flex items-center rounded-full">
								<span className="h-2 w-2 rounded-full bg-[#FF9533]" /> Required
							</span>
						</div>
					</div>
					<hr />
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Duration</p>
						<p className="text-sm font-bold">8hrs</p>
					</div>
					<hr />
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Time range</p>
						<p className="text-sm font-bold">9:00am - 4:00pm(GMT+1)</p>
					</div>
					<hr />
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Date</p>
						<p className="text-sm font-bold">{formatDate(new Date())}</p>
					</div>
					<hr />
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Description</p>
						<p className="text-xs">
							This brief is to create posts under the `&quot;Summer
							Trends`&quot; concept. The theme is Mixing Metals and the images
							show how different items made of different metals can be mixed.
						</p>
					</div>

					<hr />
					<div className="my-2 border rounded-lg p-2">
						<p className="text-xs text-gray-500 mb-2">Dress code</p>
						<ul className="mb-4 list-disc pl-3">
							<li className="text-xs">
								The theme is Mixing Metals and the images show how different
								items made of different metals can be mixed.
							</li>
							<li className="text-xs">
								Use the images with the model together with the product shots,
								which should be placed on the blue background, to create
								exciting.
							</li>
						</ul>
					</div>
					<hr />
					<div className="my-2 border rounded-lg p-2">
						<p className="text-xs text-gray-500 mb-2">
							Additional Instructions
						</p>
						<ul className="mb-4 list-disc pl-3">
							<li className="text-xs">
								The theme is Mixing Metals and the images show how different
								items made of different metals can be mixed.
							</li>
							<li className="text-xs">
								Use the images with the model together with the product shots,
								which should be placed on the blue background, to create
								exciting.
							</li>
						</ul>
					</div>
				</div>
				<div className="w-full md:w-1/2">
					<div className="p-2 border rounded-lg">
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">Gig Amount</div>
							<div className="text-primary font-bold">
								N{formatNumber(20000)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div>
								<p className="text-sm text-gray-400">Est. Tip Amount</p>
								<p className="text-xs text-gray-500 italic">
									Not guaranteed, based on performance
								</p>
							</div>
							<div className="text-primary font-bold">
								N{formatNumber(2000)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">Total</div>
							<div className="text-primary font-bold">
								N{formatNumber(22000)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">JobsPro Fee</div>
							<div className="text-gray-500 text-sm font-bold">
								N{formatNumber(200)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">Escrow Fee</div>
							<div className="text-gray-500 text-sm font-bold">
								N{formatNumber(100)}
							</div>
						</div>
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-gray-400">Estimated Total</div>
							<div className="text-primary font-bold">
								N{formatNumber(21700)}
							</div>
						</div>
					</div>
					<hr />
					<div className="my-2">
						<p className="text-xs text-gray-500 mb-2">Skills Needed</p>
						<div className="flex gap-2 items-center mb-4">
							<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
								Entertainment
							</span>
							<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
								Acting
							</span>
							<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
								Acting
							</span>
							<span className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden">
								Acting
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
