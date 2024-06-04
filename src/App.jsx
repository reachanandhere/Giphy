import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/app-layout";
import Categories from "./pages/categories";
import Search from "./pages/search";
import SingleGif from "./pages/single-gif";
import Favorites from "./pages/favorites";
import Home from "./pages/home";
import GifProvider from "./context/gifcontext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Categories />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:type/:slug",
        element: <SingleGif />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

function App() {
  return (<GifProvider>
    <RouterProvider router={router} />
  </GifProvider>);
}

export default App;
