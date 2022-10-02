import { FC } from "react";
import { Switch, Route, Redirect } from "react-router";

import HomePage from "./pages/HomePage";
import ListingPage from "./pages/ListingPage";
import DetailsPage from "./pages/DetailsPage";
import DetailPagev2 from "./pages/DetailPage-v2";
import CheckoutPage from "./pages/CheckoutPage";
import LosAngeles from "./pages/Cities/LosAngeles";
import SanDiego from "./pages/Cities/SanDiego";
import PalmSprings from "./pages/Cities/PalmSprings";
import OrangeCounty from "./pages/Cities/OrangeCounty";
import SanFrancisco from "./pages/Cities/SanFran";
import SantaBarbara from "./pages/Cities/SantaBarbara";
import ManageReservationPage from "./pages/ManageReservationPage";
import YourReservationPage from "./pages/YourReservationPage";
import About from "./pages/StaticPages/About";
import ErrorPage from "./pages/ErrorPage";
import FAQ from "./pages/StaticPages/FAQ";
import Contact from "./pages/StaticPages/Contact";
import Privacy from "./pages/StaticPages/Privacy";
import Terms from "./pages/StaticPages/Terms";
import RomingoScorePage from "./pages/StaticPages/RomingoScorePage";
import ListYourProperty from "./pages/StaticPages/ListYourProperty";
import RedRoverPartner from "./pages/StaticPages/RedRoverPartner";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Application from "./pages/StaticPages/Application";
import { authService } from "./services/authService.js";
import ModifyBooking from './components/ModifyBooking/ModifyBooking';

interface RouteInterface {
  path: string;
  component: FC<any>;
  requireAuth: boolean;
}

const routes: RouteInterface[] = [
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
    path: "/hotel/:alias",
    component: DetailsPage,
    requireAuth: false,
  },
  {
    path: "/checkout*",
    component: CheckoutPage,
    requireAuth: false,
  },
  {
    path: "/reservation/manage",
    component: ManageReservationPage,
    requireAuth: false,
  },
  {
    path: '/reservation/details',
    component: YourReservationPage,
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
  {
    path: "/privacy",
    component: Privacy,
    requireAuth: false,
  },
  {
    path: "/terms-of-use",
    component: Terms,
    requireAuth: false,
  },
  {
    path: "/romingo-partners",
    component: RedRoverPartner,
    requireAuth: false,
  },
  {
    path: "/list-your-property",
    component: ListYourProperty,
    requireAuth: false,
  },
  {
    path: "/application",
    component: Application,
    requireAuth: false,
  },
  {
    path: "/blog/:tag?",
    component: Blog,
    requireAuth: false,
  },
  {
    path: "/blog/post/:id",
    component: BlogPost,
    requireAuth: false,
  },
  {
    path: "/modify-booking",
    component: ModifyBooking,
    requireAuth: false
  }
];

const AuthGuards = (props: any) => {
  const token = authService.getToken();
  if (token && props.children) {
    return props.children;
  }

  return <Redirect to={"/login"} />;
};

const Routes = () => {
  return (
    <Switch>
      {routes.map((route, key) => {
        if (!route.requireAuth)
          return (
            <Route
              exact
              path={route.path}
              component={route.component}
              key={key}
            />
          );
        else
          return (
            <AuthGuards key={key}>
              <Route exact path={route.path} component={route.component} />
            </AuthGuards>
          );
      })}
      <Route component={ErrorPage} />
    </Switch>
  );
};

export default Routes;
