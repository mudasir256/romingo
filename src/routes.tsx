import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
const ContactPage = loadable(() => import('./pages/StaticPages/Contact'))
const Privacy = loadable(() => import('./pages/StaticPages/Privacy'))
const Terms = loadable(() => import('./pages/StaticPages/Terms'))
const ListYourProperty = loadable(() => import('./pages/StaticPages/ListYourProperty'))
const RedRoverPartner = loadable(() => import('./pages/StaticPages/RedRoverPartner'))
const Application = loadable(() => import('./pages/StaticPages/Application'))
const CreateAccount = loadable(() => import('./pages/CreateAccount'))
const SignIn = loadable(() => import('./pages/SignIn'))


const Austin = loadable(() => import('./pages/Cities/Austin'))
const Dallas = loadable(() => import('./pages/Cities/Dallas'))
const Denver = loadable(() => import('./pages/Cities/Denver'))
const Houston = loadable(() => import('./pages/Cities/Houston'))
const LosAngeles = loadable(() => import('./pages/Cities/LosAngeles'))
const PalmSprings = loadable(() => import('./pages/Cities/PalmSprings'))
const Phoenix = loadable(() => import('./pages/Cities/Phoenix'))
const Portland = loadable(() => import('./pages/Cities/Portland'))
const SaltLakeCity = loadable(() => import('./pages/Cities/SaltLakeCity'))
const SanAntonio = loadable(() => import('./pages/Cities/SanAntonio'))
const SanDiego = loadable(() => import('./pages/Cities/SanDiego'))
const SanFrancisco = loadable(() => import('./pages/Cities/SanFrancisco'))
const SantaFe = loadable(() => import('./pages/Cities/SantaFe'))
const Scottsdale = loadable(() => import('./pages/Cities/Scottsdale'))
const Seattle = loadable(() => import('./pages/Cities/Seattle'))
const Tucson = loadable(() => import('./pages/Cities/Tucson'))

//NEW
const Atlanta = loadable(() => import('./pages/Cities/Atlanta'))
const Baltimore = loadable(() => import('./pages/Cities/Baltimore'))
const Boston = loadable(() => import('./pages/Cities/Boston'))
const Charlotte = loadable(() => import('./pages/Cities/Charlotte'))
const Chicago = loadable(() => import('./pages/Cities/Chicago'))
const Cleveland = loadable(() => import('./pages/Cities/Cleveland'))
const Detroit = loadable(() => import('./pages/Cities/Detroit'))
const Indianapolis = loadable(() => import('./pages/Cities/Indianapolis'))
const Miami = loadable(() => import('./pages/Cities/Miami'))
const Milwaukee = loadable(() => import('./pages/Cities/Milwaukee'))
const Minneapolis = loadable(() => import('./pages/Cities/Minneapolis'))
//nashville
const NewOrleans = loadable(() => import('./pages/Cities/NewOrleans'))
const NewYork = loadable(() => import('./pages/Cities/NewYork'))
const Washington = loadable(() => import('./pages/Cities/Washington'))



const Blog = loadable(() => import('./pages/Blog'))
const BlogPost = loadable(() => import('./pages/BlogPost'))

const HiltonPolicy = loadable(() => import('./pages/PolicyPages/Hilton'))
const HyattPolicy = loadable(() => import('./pages/PolicyPages/Hyatt'))
const IHGPolicy = loadable(() => import('./pages/PolicyPages/IHG'))
const MarriottPolicy = loadable(() => import('./pages/PolicyPages/Marriott'))
const Motel6Policy = loadable(() => import('./pages/PolicyPages/Motel6'))
const BoutiquePolicy = loadable(() => import('./pages/PolicyPages/Boutique'))


import { authService } from "./services/authService.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { IntercomProvider } from 'react-use-intercom';
import ListingPageNew from "./pages/ListingPage/ListingPageNew";
import DetailsPage1 from "./pages/DetailsPage/DetailsPage1";

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
    component: ListingPageNew,
    requireAuth: false,
  },
  {
    path: '/profile',
    component: ProfilePage,
    requireAuth: false
  },
  {
    path: "/pet-friendly-hotel/:state/:city/:name",
    component: DetailsPage1,
    requireAuth: false,
  },
  // {
  //   path: "/pet-friendly-hotels/:state/:city/:name",
  //   component: DetailsPage1,
  //   requireAuth: false,
  // },
  {
    path: "/reservation/manage",
    component: ManageReservationPage,
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
    path: "/blog/",
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
  },
  {
    path: '/login',
    component: SignIn,
    requireAuth: false,
  }
];

const AuthGuards = (props: any) => {
  const token = authService.getToken();
  if (token && props.children) {
    return props.children;
  }

  return <Navigate to="/login" replace />;
};

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_CLIENT_KEY as string
);

const AllRoutes = () => {
  return (
    <Routes>
      {routes.map((route, key) => 
        {
          if (!route.requireAuth)
            return (
              <Route
                path={route.path}
                element={<route.component />}
                key={key}
              />
            );
          else
            return (
              <AuthGuards key={key}>
                <Route path={route.path} element={<route.component />} />
              </AuthGuards>
            );
        }
        // <Route
        //   path={route.path}
        //   element={<route.component />}
        //   key={key}
        // />
      )}

      <Route 
        path="/contact" 
        element={
          <IntercomProvider appId="qa6datd3">
            <ContactPage />
          </IntercomProvider>
        }
      />

      <Route 
        path="/reservation/details" 
        element={
          <Elements stripe={stripePromise}>
            <YourReservationPage />
          </Elements>
        }
      />

      <Route path="/pet-friendly-hotels/austin-texas" element={<Austin />} />
      <Route path="/pet-friendly-hotels/dallas-texas" element={<Dallas />} />
      <Route path="/pet-friendly-hotels/houston-texas" element={<Houston />} />
      <Route path="/pet-friendly-hotels/phoenix-arizona" element={<Phoenix />} />
      <Route path="/pet-friendly-hotels/scottsdale-arizona" element={<Scottsdale />} />
      <Route path="/pet-friendly-hotels/tucson-arizona" element={<Tucson />} />
      <Route path="/pet-friendly-hotels/santa-fe-new-mexico" element={<SantaFe />} />
      <Route path="/pet-friendly-hotels/san-antonio-texas" element={<SanAntonio />} />
      <Route path="/pet-friendly-hotels/denver-colorado" element={<Denver />} />
      <Route path="/pet-friendly-hotels/seattle-washington" element={<Seattle />} />
      <Route path="/pet-friendly-hotels/portland-oregon" element={<Portland />} />
      <Route path="/pet-friendly-hotels/salt-lake-city-utah" element={<SaltLakeCity />} />
      <Route path="/pet-friendly-hotels/palm-springs-california" element={<PalmSprings />} />
      <Route path="/pet-friendly-hotels/los-angeles-california" element={<LosAngeles />} />
      <Route path="/pet-friendly-hotels/san-diego-california" element={<SanDiego />} />
      <Route path="/pet-friendly-hotels/san-francisco-california" element={<SanFrancisco />} />

      <Route path="/pet-friendly-hotels/atlanta-georgia" element={<Atlanta />} />
      <Route path="/pet-friendly-hotels/baltimore-maryland" element={<Baltimore />} />
      <Route path="/pet-friendly-hotels/boston-massachusetts" element={<Boston />} />
      <Route path="/pet-friendly-hotels/charlotte-north-carolina" element={<Charlotte />} />
      <Route path="/pet-friendly-hotels/chicago-illinois" element={<Chicago />} />
      <Route path="/pet-friendly-hotels/cleveland-ohio" element={<Cleveland />} />
      <Route path="/pet-friendly-hotels/detroit-michigan" element={<Detroit />} />
      <Route path="/pet-friendly-hotels/indianapolis-indiana" element={<Indianapolis />} />
      <Route path="/pet-friendly-hotels/miami-florida" element={<Miami />} />
      <Route path="/pet-friendly-hotels/milwaukee-wisconsin" element={<Milwaukee />} />
      <Route path="/pet-friendly-hotels/minneapolis-minnesota" element={<Minneapolis />} />
      <Route path="/pet-friendly-hotels/new-orleans-louisiana" element={<NewOrleans />} />
      <Route path="/pet-friendly-hotels/new-york-new-york" element={<NewYork />} />
      <Route path="/pet-friendly-hotels/washington-dc" element={<Washington />} />

     
      <Route path="/hilton-pet-policy" element={<HiltonPolicy />} />
      <Route path="/hyatt-pet-policy" element={<HyattPolicy />} />
      <Route path="/ihg-pet-policy" element={<IHGPolicy />} />
      <Route path="/marriott-pet-policy" element={<MarriottPolicy />} />
      <Route path="/motel-6-pet-policy" element={<Motel6Policy />} />
      <Route path="/boutique-pet-policy" element={<BoutiquePolicy />} />

      <Route element={ErrorPage} />
    </Routes>
  );
};

export default AllRoutes;
