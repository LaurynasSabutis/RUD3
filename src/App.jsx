import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/navbar/Navbar";

const AppLayout = () => (
  <div className="root-container">
    <div className="nav-container">
      <Navbar />
    </div>

    <div className="root-body">
      <Outlet />
    </div>
  </div>
);

function App() {
  // Add routes here - Armandas
  const route = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "movies",
          element: <Movies />,
        },
        {
          path: "tv_series",
          element: <TVSeries />,
        },
        {
          path: "bookmarked_items",
          element: <Bookmarks />,
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      // 404 not found page
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
