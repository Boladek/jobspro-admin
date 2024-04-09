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
import ReviewProfilePage from "../pages/Profile/review-profile";
// import { profileRoutes } from "../pages/Profile/expert-profile/routes";
import { ShortBio } from "../pages/Profile/expert-profile/short-bio";
import { Education } from "../pages/Profile/expert-profile/education";
import { WorkingRate } from "../pages/Profile/expert-profile/working-rate";
import { VerifyPhoneNumber } from "../pages/Profile/expert-profile/verfiy-phone-number";
import { PhoneNumber } from "../pages/Profile/expert-profile/phone-number";
import { Skill } from "../pages/Profile/expert-profile/skill";
import { Industry } from "../pages/Profile/expert-profile/industry";
import { Experience } from "../pages/Profile/expert-profile/experience";
import { Profile } from "../pages/Profile/expert-profile/profile";
import { Resume } from "../pages/Profile/expert-profile/resume";
// console.log(profileRoutes);

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
		path: "dashboard/profile",
		element: <ProfileLayout />,
		children: [
			{
				path: "agent/:role",
				element: <ClientProfile />,
			},
			{
				path: ":role",
				element: (
					<>
						<Outlet />
					</>
				),
				children: [
					{
						path: "short-bio",
						element: <ShortBio />,
					},
					{
						path: "verify-phone",
						element: <VerifyPhoneNumber />,
					},
					{
						path: "industry",
						element: <Industry />,
					},
					{
						path: "working-rate",
						element: <WorkingRate />,
					},
					{
						path: "resume",
						element: <Resume />,
					},
					{
						path: "experience",
						element: <Experience />,
					},
					{
						path: "education",
						element: <Education />,
					},
					{
						path: "skills",
						element: <Skill />,
					},
					{
						path: "phone-number",
						element: <PhoneNumber />,
					},
					{
						path: "profile",
						element: <Profile />,
					},
				],
			},
		],
	},
	{
		path: "profile-review",
		element: <ReviewProfilePage />,
	},
]);

const BaseRoutes = () => <RouterProvider router={router} />;

export default BaseRoutes;
