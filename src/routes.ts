import { FC } from "react";
import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import DetailsPage from "./pages/DetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import LosAngeles from "./pages/Cities/LosAngeles";
import SanDiego from "./pages/Cities/SanDiego";
import PalmSprings from "./pages/Cities/PalmSprings";
import OrangeCounty from "./pages/Cities/OrangeCounty";
import SanFrancisco from "./pages/Cities/SanFran";
import SantaBarbara from "./pages/Cities/SantaBarbara";
import ManageReservationPage from "./pages/ManageReservationPage";
import About from "./pages/StaticPages/About";
import FAQ from "./pages/StaticPages/FAQ";
import Contact from "./pages/StaticPages/Contact";
import RomingoScorePage from "./pages/StaticPages/RomingoScorePage";

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
    requireAuth: false,
  },
  {
    path: "/los-angeles",
    component: LosAngeles,
    requireAuth: false,
  },
  {
    path: "/san-diego",
    component: SanDiego,
    requireAuth: false,
  },
  {
    path: "/orange-county",
    component: OrangeCounty,
    requireAuth: false,
  },
  {
    path: "/san-francisco",
    component: SanFrancisco,
    requireAuth: false,
  },
  {
    path: "/santa-barbara",
    component: SantaBarbara,
    requireAuth: false,
  },
  {
    path: "/palm-springs",
    component: PalmSprings,
    requireAuth: false,
  },
  {
    path: "/about",
    component: About,
    requireAuth: false,
  },
  {
    path: "/faq",
    component: FAQ,
    requireAuth: false,
  },
  {
    path: "/contact",
    component: Contact,
    requireAuth: false,
  },
  {
    path: "/romingo-score",
    component: RomingoScorePage,
    requireAuth: false,
  },
];

export default routes;
