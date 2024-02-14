import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import "./index.scss";
import { PageWelcome } from "./pages/PageWelcome.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { PageBooks } from "./pages/PageBooks.tsx";
import { PageUsers } from "./pages/PageUsers.tsx";
import { AppProvider } from "./AppContext.tsx";
import { PageLogin } from "./pages/PageLogin.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "/welcome",
				element: <PageWelcome />,
			},
			{
				path: "books",
				element: <PageBooks />,
			},
			{
				path: "users",
				element: <PageUsers />,
			},
			{
				path: "login",
				element: <PageLogin />,
			},
			{
				path: "/",
				element: <Navigate to="/welcome" replace />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
);
