import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
<<<<<<< HEAD
<<<<<<< HEAD
import Bookmarks from "./pages/Bookmarks"
import Movies from "./pages/Movies"
import TVSeries from "./pages/TVSeries"

=======
import Bookmarks from "./pages/bookmarks/Bookmarks"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Navbar from "./components/Navbar"

const AppLayout = () => (
  <div className='root-container'>
    <div className='nav-container'>
      <Navbar />
    </div>

    <div className='root-body'>
      <Outlet />
    </div>
  </div>
)
>>>>>>> 36bbc2c (Pridetas login bei sign up)

function App() {
// Add routes here - Armandas
  const route = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "bookmarked_items",
          element: <Bookmarks />
        }
      ]
    },
    {
<<<<<<< HEAD
      path: "/movies",
      element:<Movies/>
    },
    {
      path: "/tv_series",
      element:<TVSeries/>
    },
    {
      path: "/bookmarked_items",
      element: <Bookmarks/>
=======
      path: "/login",
      element: <Login />
>>>>>>> 658311f (Sukurtas login bei sign up)
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      // 404 not found page
      path: "*",
      element:<NotFound/>
    }
  ])



  return (
    <>
            <RouterProvider router={route}></RouterProvider>

    </>
  )
}

export default App
