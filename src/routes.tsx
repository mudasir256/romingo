import { FC } from "react";
import { Switch, Route, Redirect } from "react-router";
import loadable from '@loadable/component'

import HomePage from './pages/HomePage'
// const HomePage = loadable(() => import('./pages/HomePage'))
const ListingPage = loadable(() => import('./pages/ListingPage'))
import DetailsPage from './pages/DetailsPage'
// const DetailsPage = loadable(() => import('./pages/DetailsPage'))
const ProfilePage = loadable(() => import('./pages/ProfilePage'))
const CheckoutPage = loadable(() => import('./pages/CheckoutPage'))

const ManageReservationPage = loadable(() => import('./pages/ManageReservationPage'))
const YourReservationPage = loadable(() => import('./pages/YourReservationPage'))
const ErrorPage = loadable(() => import('./pages/ErrorPage'))
const About = loadable(() => import('./pages/StaticPages/About'))
const FAQ = loadable(() => import('./pages/StaticPages/FAQ'))
const Contact = loadable(() => import('./pages/StaticPages/Contact'))
const Privacy = loadable(() => import('./pages/StaticPages/Privacy'))
const Terms = loadable(() => import('./pages/StaticPages/Terms'))
const ListYourProperty = loadable(() => import('./pages/StaticPages/ListYourProperty'))
const RedRoverPartner = loadable(() => import('./pages/StaticPages/RedRoverPartner'))
const Application = loadable(() => import('./pages/StaticPages/Application'))
const CreateAccount = loadable(() => import('./pages/CreateAccount'))

const LocationPageTemplate = loadable(() => import('./components/LocationPageTemplate'))

const Blog = loadable(() => import('./pages/Blog'))
const BlogPost = loadable(() => import('./pages/BlogPost'))

const HiltonPolicy = loadable(() => import('./pages/PolicyPages/Hilton'))

import { authService } from "./services/authService.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
    path: '/profile',
    component: ProfilePage,
    requireAuth: false
  },
  {
    path: "/hotel/:alias",
    component: DetailsPage,
    requireAuth: false,
  },
  // {
  //   path: "/checkout*",
  //   component: CheckoutPage,
  //   requireAuth: false,
  // },
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
    path: '/create-account',
    component: CreateAccount,
    requireAuth: false,
  }
];

const AuthGuards = (props: any) => {
  const token = authService.getToken();
  if (token && props.children) {
    return props.children;
  }

  return <Redirect to={"/login"} />;
};

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_CLIENT_KEY as string
);

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

      <Route exact path="/checkout*">
        <Elements stripe={stripePromise}>
          <CheckoutPage />
        </Elements>
      </Route>
      <Route exact path="/pet-friendly-hotels/austin-texas"><LocationPageTemplate cityName="Austin, TX" /></Route>
      <Route exact path="/pet-friendly-hotels/dallas-texas"><LocationPageTemplate cityName="Dallas, TX" /></Route>
      <Route exact path="/pet-friendly-hotels/houston-texas"><LocationPageTemplate cityName="Houston, TX" /></Route>
      <Route exact path="/pet-friendly-hotels/oceanside-california"><LocationPageTemplate cityName="Oceanside, CA" /></Route>
      <Route exact path="/pet-friendly-hotels/phoenix-arizona"><LocationPageTemplate cityName="Phoenix, AZ" /></Route>
      <Route exact path="/pet-friendly-hotels/scottsdale-arizona"><LocationPageTemplate cityName="Scottsdale, AZ" /></Route>
      <Route exact path="/pet-friendly-hotels/tucson-arizona"><LocationPageTemplate cityName="Tucson, AZ" /></Route>
      <Route exact path="/pet-friendly-hotels/santa-fe-new-mexico"><LocationPageTemplate cityName="Santa Fe, NM" /></Route>
      <Route exact path="/pet-friendly-hotels/san-antonio-texas"><LocationPageTemplate cityName="San Antonio, TX" /></Route>
      <Route exact path="/pet-friendly-hotels/vail-colorado"><LocationPageTemplate cityName="Vail, CO" /></Route>
      <Route exact path="/pet-friendly-hotels/colorado-springs-colorado"><LocationPageTemplate cityName="Colorado Springs, CO" /></Route>
      <Route exact path="/pet-friendly-hotels/denver-colorado"><LocationPageTemplate cityName="Denver, CO" /></Route>
      <Route exact path="/pet-friendly-hotels/seattle-washington"><LocationPageTemplate cityName="Seattle, WA" /></Route>
      <Route exact path="/pet-friendly-hotels/portland-oregon"><LocationPageTemplate cityName="Portland, OR" /></Route>
      <Route exact path="/pet-friendly-hotels/sacramento-california"><LocationPageTemplate cityName="Sacramento, CA" /></Route>
      <Route exact path="/pet-friendly-hotels/salt-lake-city-utah"><LocationPageTemplate cityName="Salt Lake City, UT" /></Route>
      <Route exact path="/pet-friendly-hotels/palm-springs-california"><LocationPageTemplate cityName="Palm Springs, CA" /></Route>
      <Route exact path="/pet-friendly-hotels/los-angeles-california"><LocationPageTemplate cityName="Los Angeles, CA" /></Route>
      <Route exact path="/pet-friendly-hotels/orange-county-california"><LocationPageTemplate cityName="Orange County, CA" /></Route>
      <Route exact path="/pet-friendly-hotels/san-diego-california"><LocationPageTemplate cityName="San Diego, CA" /></Route>
      <Route exact path="/pet-friendly-hotels/san-francisco-california"><LocationPageTemplate cityName="San Francisco, CA" /></Route>
      <Route exact path="/pet-friendly-hotels/santa-barbara-california"><LocationPageTemplate cityName="Santa Barbara, CA" /></Route>
     
      <Route exact path="/hilton-pet-policy"><HiltonPolicy /></Route>


      <Route component={ErrorPage} />
    </Switch>
  );
};

export default Routes;
