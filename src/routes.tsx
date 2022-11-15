import { FC } from "react";
import { Switch, Route, Redirect } from "react-router";
import loadable from '@loadable/component'

import HomePage from './pages/HomePage'
// const HomePage = loadable(() => import('./pages/HomePage'))
const ListingPage = loadable(() => import('./pages/ListingPage'))
import DetailsPage from './pages/DetailsPage'
// const DetailsPage = loadable(() => import('./pages/DetailsPage'))
const CheckoutPage = loadable(() => import('./pages/CheckoutPage'))
const LosAngeles = loadable(() => import('./pages/Cities/LosAngeles'))
const SanDiego = loadable(() => import('./pages/Cities/SanDiego'))
const PalmSprings = loadable(() => import('./pages/Cities/PalmSprings'))
const OrangeCounty = loadable(() => import('./pages/Cities/OrangeCounty'))
const SanFrancisco = loadable(() => import('./pages/Cities/SanFran'))
const SantaBarbara = loadable(() => import('./pages/Cities/SantaBarbara'))
const ManageReservationPage = loadable(() => import('./pages/ManageReservationPage'))
const YourReservationPage = loadable(() => import('./pages/YourReservationPage'))
const ErrorPage = loadable(() => import('./pages/ErrorPage'))
const About = loadable(() => import('./pages/StaticPages/About'))
const FAQ = loadable(() => import('./pages/StaticPages/FAQ'))
const Contact = loadable(() => import('./pages/StaticPages/Contact'))
const Privacy = loadable(() => import('./pages/StaticPages/Privacy'))
const Terms = loadable(() => import('./pages/StaticPages/Terms'))
const RomingoScorePage = loadable(() => import('./pages/StaticPages/RomingoScorePage'))
const ListYourProperty = loadable(() => import('./pages/StaticPages/ListYourProperty'))
const RedRoverPartner = loadable(() => import('./pages/StaticPages/RedRoverPartner'))
const Application = loadable(() => import('./pages/StaticPages/Application'))

const LocationPageTemplate = loadable(() => import('./components/LocationPageTemplate'))

const Blog = loadable(() => import('./pages/Blog'))
const BlogPost = loadable(() => import('./pages/BlogPost'))
import { authService } from "./services/authService.js";

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
      <Route exact path="/austin"><LocationPageTemplate cityName="Austin, TX" /></Route>
      <Route exact path="/dallas"><LocationPageTemplate cityName="Dallas, TX" /></Route>
      <Route exact path="/houston"><LocationPageTemplate cityName="Houston, TX" /></Route>
      <Route exact path="/oceanside"><LocationPageTemplate cityName="Oceanside, CA" /></Route>
      <Route exact path="/phoenix"><LocationPageTemplate cityName="Phoenix, AZ" /></Route>
      <Route exact path="/scottsdale"><LocationPageTemplate cityName="Scottsdale, AZ" /></Route>
      <Route exact path="/tucson"><LocationPageTemplate cityName="Tucson, AZ" /></Route>
      <Route exact path="/santa-fe"><LocationPageTemplate cityName="Santa Fe, NM" /></Route>
      <Route exact path="/san-antonio"><LocationPageTemplate cityName="San Antonio, TX" /></Route>
      <Route exact path="/vail"><LocationPageTemplate cityName="Vail, CO" /></Route>
      <Route exact path="/colorado-springs"><LocationPageTemplate cityName="Colorado Springs, CO" /></Route>
      <Route exact path="/denver"><LocationPageTemplate cityName="Denver, CO" /></Route>
      <Route exact path="/seattle"><LocationPageTemplate cityName="Seattle, WA" /></Route>
      <Route exact path="/portland"><LocationPageTemplate cityName="Portland, OR" /></Route>
      <Route exact path="/sacramento"><LocationPageTemplate cityName="Sacramento, CA" /></Route>
      <Route exact path="/salt-lake-city"><LocationPageTemplate cityName="Salt Lake City, UT" /></Route>

      <Route component={ErrorPage} />
    </Switch>
  );
};

export default Routes;
