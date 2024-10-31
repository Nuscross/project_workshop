
/// Router Current Version ///

// Setting Route

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

/* --------------------------------- */

// Nested Pages

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={<Home />} /> {/* Renders on / */}
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

/* --------------------------------- */

// Route with Parameter

<Route path="/profile/:id" element={<Profile />} />

import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams(); // Access the route parameter
  return <div>Profile ID: {id}</div>;
};

/* --------------------------------- */

// Setting Error

import ErrorPage from './pages/ErrorPage'; // Import the error page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        {/* Define a standalone route with an errorElement */}
        <Route path="/profile" element={<Profile />} errorElement={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

/* --------------------------------- */

// Setting Loader

import { profileLoader } from './loaders/profileLoader'; // Import loader

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Define a route with loader */}
        <Route
          path="/profile"
          element={<Profile />}
          loader={profileLoader}
          errorElement={<ErrorPage />} // Handle errors in the loader
        />
      </Routes>
    </Router>
  );
};