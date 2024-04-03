import React, { useState } from "react";
import { Modal } from "./modal";

export function Content() {
	const [open, setOpen] = useState(false);

	return (
		<div className="bg-slate-400 p-1 block h-full">
			<div
				className="w-full flex border border-rose-200"
				onClick={() => setOpen(!open)}
			>
				<div className="w-1/2 outline outline-red-600">first</div>
				<div className="w-1/2 border border-red-600">second</div>
			</div>
			<script>const date = new Date()</script>
			<dialog open={open}>
				<p>Greetings, one and all!</p>
				{/* <form method="dialog"></form> */}
				<button
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
					onClick={() => setOpen(false)}
				>
					OK
				</button>
			</dialog>
			{/* {open && (
				<Modal handleClose={() => setOpen(false)}>
					<div>The content of the modal</div>
				</Modal>
			)} */}
		</div>
	);
}
