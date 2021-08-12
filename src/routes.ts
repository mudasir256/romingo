import { FC } from "react";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";

interface Routes {
  path: string;
  component: FC<any>;
  requireAuth: boolean;
}

const routes: Routes[] = [
  {
    path: "/",
    component: HomePage,
    requireAuth: false,
  },
  {
    path: "/listings",
    component: ListingPage,
    requireAuth: false,
  },
];

export default routes;
