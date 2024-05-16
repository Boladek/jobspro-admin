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
import { ClientProfile } from "../pages/Profile/client-profile";
import ReviewProfilePage from "../pages/Profile/review-profile";
import NotFoundPage from "../pages/not-found-page";
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
import MorePage from "../pages/more";
import { MainLayout } from "../component/main-layout";
import PreferencePage from "../pages/more/preference/index";
import { AdminLayout } from "../component/admin/admin-layout";
import AdminLandingPage from "../pages/admin/admin-landing-page";
import AdminMessagesPage from "../pages/admin/admin-messages-page";
import AdminPushNotificationsPage from "../pages/admin/admin-push-notifications-page";
import AdminJobsPage from "../pages/admin/admin-jobs-page";
import AdminDisputesPage from "../pages/admin/admin-disputes-page";
import AdminUsersPage from "../pages/admin/admin-users-page";
import { PrivateRoutes } from "./private-routes";
import LandingPage from "../pages/dashboard/landing-page";
import ClientProfileFlow from "../pages/Profile";
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
				path: "verify-email/:email",
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
		path: "/",
		element: (
			<PrivateRoutes>
				<MainLayout />
			</PrivateRoutes>
		),
		children: [
			{
				path: "settings",
				element: <MorePage />,
				children: [
					{ path: "preferences", element: <PreferencePage /> },
					{ path: "profile", element: <div>Profile</div> },
					{ path: "earning", element: <div>Earning</div> },
					{ path: "stats", element: <div>Stats</div> },
					{ path: "favourites", element: <div>Favourites</div> },
					{ path: "help-and-support", element: <div>Help & Support</div> },
				],
			},
			{ path: "dashboard", element: <LandingPage /> },
			{
				path: "dashboard/profile",
				element: <ProfileLayout />,
				children: [
					{
						path: ":role",
						element: <ClientProfileFlow />,
					},
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
				path: "dashboard/review",
				element: <ReviewProfilePage />,
			},
			{ path: "tasks", element: <div>Tasks</div> },
			{ path: "messages", element: <div>Messages</div> },
			{ path: "wallets", element: <div>Wallets</div> },
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
	{
		path: "admin",
		element: <AdminLayout />,
		children: [
			{
				path: "dashboard",
				element: <AdminLandingPage />,
			},
			{
				path: "users",
				element: <AdminUsersPage />,
			},
			{
				path: "push-notifications",
				element: <AdminPushNotificationsPage />,
			},
			{
				path: "messages",
				element: <AdminMessagesPage />,
			},
			{
				path: "disputes",
				element: <AdminDisputesPage />,
			},
			{
				path: "jobs",
				element: <AdminJobsPage />,
			},
		],
	},
]);

const BaseRoutes = () => <RouterProvider router={router} />;

export default BaseRoutes;
