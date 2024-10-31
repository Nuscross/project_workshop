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
        {
          path: "newsletter",
          element: <Newsletter />,
          action: newsletterAction,
        },
        {
          path: "about",
          element: <About />
        },
      ]
    },
  ]
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
export default App;