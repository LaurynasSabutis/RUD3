import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"


function App() {
// Add routes here - Armandas
  const route = createBrowserRouter([
    {
      path: "/",
      element:<Home/>
    },
    {
      path: "*",
      element:<NotFound/>
    }
  ])

  // this is how u can GET data from the json like this for example GET 0 post
  // const [newJson, setNewJson] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedData = await fetch("http://localhost:3000/0")
  //     const json = await fetchedData.json()
  //     setNewJson(json)
  //   }
  //   fetchData()
  // }, [])

  // console.log(newJson)

  return (
    <>
            <RouterProvider router={route}></RouterProvider>

    </>
  )
}

export default App
