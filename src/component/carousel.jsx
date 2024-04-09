import { useEffect, useState } from "react";

export function Carousel() {
	const data = [
		{
			title: "First Title",
			description:
				"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea tempore, hic ex recusandae aut laborum quod laudantium. Hic blanditiis quae atque deserunt quo consequuntur quisquam porro animi. Minus ducimus ipsum fugit iste aliquam quo, rem reiciendis, facere nobis tenetur debitis.",
		},
		{
			title: "Second Title",
			description:
				"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea tempore, hic ex recusandae aut laborum quod laudantium. Hic blanditiis quae atque deserunt quo consequuntur quisquam porro animi. Minus ducimus ipsum fugit iste aliquam quo, rem reiciendis, facere nobis tenetur debitis.",
		},
		{
			title: "Third Title",
			description:
				"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea tempore, hic ex recusandae aut laborum quod laudantium. Hic blanditiis quae atque deserunt quo consequuntur quisquam porro animi. Minus ducimus ipsum fugit iste aliquam quo, rem reiciendis, facere nobis tenetur debitis.",
		},
	];
	const [index, setIndex] = useState(0);

	const carouselInfiniteScroll = () => {
		if (index === data.length - 1) {
			setIndex(0);
			return;
		} else {
			setIndex(index + 1);
			return;
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			carouselInfiniteScroll();
		}, 3000);
		return () => clearInterval(interval);
	});

	const gotoNext = () => {
		if (index === data.length - 1) {
			setIndex(0);
		} else {
			setIndex(index + 1);
		}
	};

	const gotoPrevious = () => {
		if (index === 0) {
			setIndex(data.length - 1);
		} else {
			setIndex(index - 1);
		}
	};

	console.log({ index });

	return (
		<div className="py-4 px-6 rounded-2xl bg-white/20 w-full">
			<div className="w-full flex overflow-hidden">
				{data.map((item) => (
					<div
						key={item.title}
						className="w-full min-w-full transition ease-in 300s"
						style={{
							transform: `translate(-${index * 100}%)`,
						}}
					>
						<p className="text-3xl text-white font-semibold">{item.title}</p>
						<p className="text-sm text-gray-200">{item.description}</p>
					</div>
				))}
			</div>
			<div className="py-4 flex gap-2">
				{data.map((item, pos) => (
					<div
						key={item.title}
						className={`bg-white w-2 h-2 rounded-full transition linear 500s ${
							index === pos ? "w-6 h-2" : ""
						}`}
						style={{
							backgroundColor: index === pos ? "#206DB0" : "",
						}}
					></div>
				))}
			</div>
			<div className="flex justify-end gap-2">
				<button
					className="rounded-full border border-white px-2 py-1 text-xs text-white hover:text-gray-200 bg-gray-500/20"
					onClick={gotoPrevious}
				>
					&larr;
				</button>
				<button
					className="rounded-full border border-white px-2 py-1 text-xs text-white hover:text-gray-200 bg-gray-500/20"
					onClick={gotoNext}
				>
					&#8594;
				</button>
			</div>
		</div>
	);
}
