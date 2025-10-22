import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Bookmarks from "./pages/Bookmarks"
import Movies from "./pages/Movies"
import TVSeries from "./pages/TVSeries"


function App() {
// Add routes here - Armandas
  const route = createBrowserRouter([
    {
      path: "/",
      element:<Home/>
    },
    {
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
