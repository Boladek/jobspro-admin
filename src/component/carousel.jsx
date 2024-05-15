import { useEffect, useState } from "react";
import leftIcon from "../assets/left-icon.png";
import rightIcon from "../assets/right-icon.png";

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

	return (
		<div className="p-6 rounded-3xl bg-white/20 max-w-2xl w-full mx-auto">
			<div className="w-full flex overflow-hidden mb-4">
				{data.map((item) => (
					<div
						key={item.title}
						className="w-full min-w-full transition-all ease-linear duration-300"
						style={{
							transform: `translate(-${index * 100}%)`,
						}}
					>
						<p className="text-3xl text-white font-semibold mb-3">
							{item.title}
						</p>
						<p className="text-sm text-gray-200">{item.description}</p>
					</div>
				))}
			</div>
			<div className="mb-4 flex gap-2">
				{data.map((item, pos) => (
					<div
						key={item.title}
						className={`bg-white w-2 h-2 rounded-full transition-all ease-linear duration-300 ${
							index === pos ? "w-6 h-2" : ""
						}`}
						style={{
							backgroundColor: index === pos ? "#206DB0" : "",
						}}
					></div>
				))}
			</div>
			<div className="flex justify-end gap-2">
				<img
					src={leftIcon}
					onClick={gotoPrevious}
					className="h-8 cursor-pointer transition-transform transform hover:scale-105"
				/>
				<img
					src={rightIcon}
					onClick={gotoNext}
					className="h-8 cursor-pointer transition-transform transform hover:scale-105"
				/>
			</div>
		</div>
	);
}
