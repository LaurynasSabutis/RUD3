import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
<<<<<<< HEAD
import Bookmarks from "./pages/Bookmarks"
import Movies from "./pages/Movies"
import TVSeries from "./pages/TVSeries"


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
