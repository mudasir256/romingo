import { FC } from "react";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import DetailsPage from "./pages/DetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ManageReservationPage from "./pages/ManageReservationPage";

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
  {
    path: "/details/:id",
    component: DetailsPage,
    requireAuth: false,
  },
  {
    path: "/checkout",
    component: CheckoutPage,
    requireAuth: false,
  },
  {
    path: "/reservation/manage",
    component: ManageReservationPage,
    requireAuth: false
  }
];

export default routes;
