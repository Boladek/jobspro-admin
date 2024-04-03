import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Background } from "../component/background";
import LoginPage from "../pages/Registration/login";
import RolePage from "../pages/Registration/role";
import ForgotPasswordPage from "../pages/Registration/forgot-password";
import VerifyEmailPage from "../pages/Registration/verify-email";
import ResetPasswordPage from "../pages/Registration/reset-password";
import SelectCustomerTypePage from "../pages/Registration/select-customer";
import CreateAccountPage from "../pages/Registration/create-account";
import { ProfileLayout } from "../component/profile-layout";
import ClientProfile from "../pages/Profile/client-profile";
import ExpertProfile from "../pages/Profile/expert-profile";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Background />,
		children: [
			{
				index: true,
				element: <LoginPage />,
			},
			{
				path: "forgot-password",
				element: <ForgotPasswordPage />,
			},
			{
				path: "verify-email",
				element: <VerifyEmailPage />,
			},
			{
				path: "reset-password",
				element: <ResetPasswordPage />,
			},
			{
				path: "sign-up",
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <RolePage />,
					},
					{
						path: ":role/select-customer",
						element: <SelectCustomerTypePage />,
					},
					{
						path: ":role/create-account",
						element: <CreateAccountPage />,
					},
				],
			},
		],
	},
	{
		path: "profile",
		element: <ProfileLayout />,
		children: [
			{
				path: "agent",
				element: <ClientProfile />,
			},
			{
				path: "expert",
				element: <ExpertProfile />,
			},
			// {
			// 	index: true,
			// 	element: <div>Layout</div>,
			// },
		],
	},
]);

const BaseRoutes = () => <RouterProvider router={router} />;

export default BaseRoutes;
