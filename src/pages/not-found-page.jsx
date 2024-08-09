import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<div className="p-2 grid place-items-center border h-svh bg-primary/10">
			<div className="p-4 max-w-96 w-full text-center">
				<p className="text-8xl text-primary font-bold mb-2">Oops!</p>
				<p className="text-xl font-semibold mb-2">404 - Page not found</p>
				<p className="text-sm mb-4">
					The page you&lsquo;re trying to access might have been removed, had
					it&lsquo;s name changed or temporarily unavailable
				</p>
				<div className="flex gap-2 justify-between">
					<button
						className="bg-primary py-2 px-4 text-white rounded-full hover:opacity-75 text-center text-sm"
						onClick={() => navigate("/")}
					>
						Back to home Page
					</button>
					<button
						className="bg-primary py-2 px-4 text-white rounded-full hover:opacity-75 text-center text-sm"
						onClick={() => navigate(-1)}
					>
						Back to previous Page
					</button>
				</div>
			</div>
		</div>
	);
}
