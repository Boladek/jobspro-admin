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
import ReviewProfilePage from "../pages/Profile/review-profile";
import NotFoundPage from "../pages/not-found-page";
import MorePage from "../pages/more";
import { MainLayout } from "../component/main-layout";
import ProfilePage from "../pages/more/profile";
import PreferencePage from "../pages/more/preference/index";
import { AdminLayout } from "../component/admin/admin-layout";
import AdminLandingPage from "../pages/admin/admin-landing-page";
import AdminMessagesPage from "../pages/admin/admin-messages-page";
import AdminPushNotificationsPage from "../pages/admin/admin-push-notifications-page";
import AdminJobsPage from "../pages/admin/admin-jobs-page";
import AdminDisputesPage from "../pages/admin/admin-disputes-page";
import AdminUsersPage from "../pages/admin/users/index";
import AdminUserDetailsPage from "../pages/admin/users/admin-user-details-page";
import { PrivateRoutes } from "./private-routes";
import LandingPage from "../pages/dashboard/landing-page";
import ClientProfileFlow from "../pages/Profile";
import AgentProSetupFlow from "../pages/Profile/agent-pro-profile-setup";
import EarningsPage from "../pages/more/earnings";
import KYCPage from "../pages/more/kyc";
import GigsPage from "../pages/gigs/find-gigs";
import ManageGigs from "../pages/gigs/manage-gigs";
import GigDetailsSummary from "../pages/gigs/gig-details";
import CreateGigPage from "../pages/gigs/create-gigs";
import EscrowPage from "../pages/more/earnings/escrow-page";
import AccountProfilePage from "../pages/account-profile";

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
					{ path: "profile", element: <ProfilePage /> },
					{
						path: "earning",
						element: <Outlet />,
						children: [
							{ index: true, element: <EarningsPage /> },
							{ path: "fund-wallet", element: <div>fund wallet</div> },
							{ path: "cards", element: <div>Cards</div> },
							{ path: "escrow", element: <EscrowPage /> },
						],
					},
					{ path: "stats", element: <div>Stats</div> },
					{ path: "kyc", element: <KYCPage /> },
					{ path: "favourites", element: <div>Favourites</div> },
					{ path: "help-and-support", element: <div>Help & Support</div> },
				],
			},
			{ path: "dashboard", element: <LandingPage /> },
			{ path: "profile", element: <AccountProfilePage /> },
			{
				path: "gigs/:role",
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <ManageGigs />,
					},
					{
						path: "find-gigs",
						element: <GigsPage />,
					},
					{
						path: "details/:id",
						element: <GigDetailsSummary />,
					},
					{
						path: "create-gig",
						element: <CreateGigPage />,
					},
				],
			},
			{
				path: "dashboard/profile",
				element: <ProfileLayout />,
				children: [
					{
						path: ":role",
						element: <ClientProfileFlow />,
					},
					{
						path: "agent/setup",
						element: <AgentProSetupFlow />,
					},
				],
			},
			{
				path: "dashboard/review",
				element: <ReviewProfilePage />,
			},
			// { path: "tasks", element: <div>Tasks</div> },
			// { path: "messages", element: <div>Messages</div> },
			// { path: "wallets", element: <div>Wallets</div> },
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
				element: <Outlet />,
				children: [
					{ index: true, element: <AdminUsersPage /> },
					{ path: ":userId", element: <AdminUserDetailsPage /> },
				],
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
