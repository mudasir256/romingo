import { FC } from "react";
import HomePage from "./pages/HomePage";

interface Routes {
	path: string;
	component: FC<any>;
	requireAuth: boolean;
}

const routes: Routes[] = [
	{
		path: "/",
		component: HomePage,
		requireAuth: false
	},
]

export default routes;