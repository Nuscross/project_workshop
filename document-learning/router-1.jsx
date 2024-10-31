
/// Router ///

// Install and Setup

npm i react-router-dom@6.11.2

/* --------------------------------- */

// Complete Route

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { About, Cocktail, Error, HomeLayout, Landing, Newsletter, SinglePageError } from "./pages";

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";

import { action as newsletterAction } from "./pages/Newsletter";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          // path: "landing",
          index: true,
          loader: landingLoader,
          element: <Landing />,
          errorElement: <SinglePageError />,
        },
        {
          path: "cocktail/:id",
          loader: singleCocktailLoader,
          element: <Cocktail />,
          errorElement: <SinglePageError />,
        },
      ]
    },
  ]
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

/* --------------------------------- */

// Setting Route

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h2>home page</h2>,
  },
  {
    path: '/about',
    element: (
      <div>
        <h2>about page</h2>
      </div>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

/* --------------------------------- */

// Set index.js to export page

export { default as About } from './About';
export { default as Cocktail } from './Cocktail';
export { default as Error } from './Error';
export { default as HomeLayout } from './HomeLayout';
export { default as Landing } from './Landing';
export { default as Newsletter } from './Newsletter';
export { default as SinglePageError } from './SinglePageError';

/* --------------------------------- */

import { About, Cocktail, Error, HomeLayout, Landing, Newsletter, SinglePageError } from "./pages";

/* --------------------------------- */

// Link Component

import { Link } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <h1>HomeLayout</h1>
      <Link to='/about'>About</Link>
    </div>
  );
};

/* --------------------------------- */

// Nested Pages

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: 'landing',
        element: <Landing />,
      },
      {
        path: 'cocktail',
        element: <Cocktail />,
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

/* --------------------------------- */

// Outlet

import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <nav>navbar</nav>
      <Outlet />
    </div>
  );
};

/* --------------------------------- */

// useOutletContext

const HomeLayout = () => {
  const value = "some value";

  return (
    <>
      <Navbar />
      <section className="page">
        <Outlet context={{value}} />
      </section>
    </>
  )
}

/* --------------------------------- */

import { useOutletContext } from "react-router-dom";

const CocktailCard = ({image, name, id, info, glass}) => {

  const data = useOutletContext();
  
  return (
    <Wrapper>
      <div className="img-container">
        <img src={image} alt={name} className="img" />
        <div className="footer">
          <h4>{name}</h4>
          <h5>{glass}</h5>
          <p>{info}</p>
          <Link to={`/cocktail/${id}`} className="btn">details</Link>
        </div>
      </div>
    </Wrapper>
  )
}

/* --------------------------------- */

// Navbar Component and NavLink

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <span className="logo">MixMaster</span>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/newsletter" className="nav-link">Newsletter</NavLink>
        </div>
      </div>
    </Wrapper>
  )
}

/* --------------------------------- */

// Setting Error

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: landingLoader,
        errorElement: <h2>There was an error...</h2>,
        element: <Landing />,
      },
    ],
  },
]);

/* --------------------------------- */

// Error Global

import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not found' />
          <h3>Ohh!</h3>
          <p>We can't seem to find page you are looking for</p>
          <Link to='/'>back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>something went wrong </h3>
      </div>
    </Wrapper>
  );
};

/* --------------------------------- */

// Single Error

import { useRouteError } from "react-router-dom";

const SinglePageError = () => {
  const error = useRouteError();

  // return <h2>{error.message}</h2>;
  return <h2>there was an error...</h2>;
}

/* --------------------------------- */

// Try/Catch (Check Error in Page) 

try {
  const response = await axios.post(newsletterUrl,data);
  toast.success(response.data.msg);
  return redirect('/');
} catch (error) {
  console.log(error);
  toast.error(error?.response?.data?.msg);
  return error;
}

/* --------------------------------- */

// Loader

import { useLoaderData } from 'react-router-dom';

export const loader = async ({params}) => {
  const { data } = await axios.get(`${singleCocktailUrl}${id}`);
  return { id, data };
}

const Landing = () => {
  const data = useLoaderData();
  console.log(data);
  return <h1>Landing</h1>;
};

/* --------------------------------- */

import { loader as landingLoader } from './pages/Landing.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement:<Error/>
    children: [
      {
        index: true,
        loader: landingLoader,
        element: <Landing />,
      },
      {
        index: true,
        loader: () => {
          // do stuff here
        },
        element: <Landing />,
      },
    ],
  },
]);

/* --------------------------------- */

// Route with Parameter

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "cocktail/:id",
          loader: singleCocktailLoader,
          element: <Cocktail />,
          errorElement: <SinglePageError />,
        },
        {
          path: "newsletter",
          element: <Newsletter />,
          action: newsletterAction,
        },
      ]
    },
  ]
);

/* --------------------------------- */

// useNavigation

import { Outlet, useNavigation } from "react-router-dom";

const HomeLayout = () => {

  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <section className="page">
        { isPageLoading ? <div className="loading"></div> : <Outlet context={{value}} /> } 
      </section>
    </>
  )

}

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  return (
      <button
        type="submit"
        className="btn btn-block"
        style={{marginTop:'0.5rem'}}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'submitting' : 'submit'}
      </button>
    </Form>
  )
}

/* --------------------------------- */

// Navigate Component

import { Navigate } from "react-router-dom";

const Cocktail = () => {

  const { data } = useLoaderData();

  if (!data || !data.drinks || data.drinks.length === 0) {
    return <Navigate to='/' />;
  }

  return <></>
}

/* --------------------------------- */

// Redirect Component

import { redirect } from "react-router-dom";

try {
  const response = await axios.post(newsletterUrl,data);
  toast.success(response.data.msg);
  return redirect('/'); // use redirect on action and loader
} catch (error) {
  console.log(error);
  toast.error(error?.response?.data?.msg);
  return error;
}

// It's recommended to use redirect in loaders and actions rather than 
// useNavigate in your components when the redirect is in response to data.

/* --------------------------------- */

// FormData API and Action

import { Form } from 'react-router-dom';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  return 'something';
};

const Newsletter = () => {
  return (
    <Form className='form' method='POST'>
    </Form>
  )
}

/* --------------------------------- */

import { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: 'newsletter',
        action: newsletterAction,
        element: <Newsletter />,
      },
    ],
  },
]);

/* --------------------------------- */

// Action with Request

import { Form } from 'react-router-dom';

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await axios.post(newsletterUrl, data);
  return response;
};