import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import TopMovies from "./pages/TopMovies";
import Details from "./pages/Details";
import "./App.css";

function Root() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <TopMovies />,
        children: [
            {
                path: "",
                element: <TopMovies />,
            },

            {
                path: "topmovies",
                element: <TopMovies />,
            },
            {
                path: "details/:movieId",
                element: <Details />,
            } /*
      {
        path: "calender",
        element: <Calender />,
      },*/,
            ,
        ],
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
