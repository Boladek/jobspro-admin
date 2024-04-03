import React from "react";
import { Outlet } from "react-router-dom";
import bg from "../assets/bg-design.png";
import { Header } from "./header";
import { Footer } from "./footer";

export function ProfileLayout() {
	return (
		<div className="max-w-screen-2xl mx-auto h-svh flex flex-col">
			<Header />
			<div className="flex-1 flex border border-red-500">
				<div
					className="w-2/5 h-full hidden md:block bg-cover bg-center"
					style={{ backgroundImage: `url(${bg})` }}
				></div>
				<div className="w-full md:w-3/5 h-full flex flex-col overflow-y-auto">
					<div className="p-2 flex-1 flex justify-center items-center">
						<Outlet />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
