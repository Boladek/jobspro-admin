import React from "react";
import { GigComponent } from "../../component/gig-component";

function GigsPage() {
	return (
		<div className="flex border bg-[#f6f7fa] border-red-500 h-full">
			<div className="max-w-sm w-fit border border-red-500 p-4 h-full max-h-full overflow-y-auto">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
				assumenda laboriosam ea veritatis adipisci, odio eius possimus excepturi
				tenetur, enim minus labore facere! Sint quaerat corrupti ut,
				voluptatibus itaque quod adipisci a molestiae officia minima nesciunt
				totam reiciendis delectus necessitatibus saepe repudiandae, earum
				provident blanditiis culpa possimus incidunt perferendis! Minima atque
				fugit iusto vero doloribus, at, officia repellendus possimus voluptate
				voluptatibus dolorum nam, accusantium assumenda. Aperiam, quia ipsa ab
				ea magnam aliquam vitae nemo, ducimus laborum explicabo maxime
				laudantium. Ducimus illo at dicta provident inventore voluptatum quas
				velit dignissimos perspiciatis quia, facere sint harum voluptates
				architecto reiciendis cumque cupiditate sunt.
			</div>
			<div className="flex-1 border border-blue-500 p-4 h-full">
				<p className="font-bold mb-2">
					Best Matches <span className="font-extralight">Most Recent</span>
				</p>
				<div className="bg-[#E5EFFF] p-4 rounded-xl text-xs text-primary mb-2">
					Search through the latest job openings that align with your skills and
					profile, ensuring they meet the criteria sought by business.
				</div>
				<div>
					<GigComponent />
				</div>
			</div>
		</div>
	);
}

export default GigsPage;
