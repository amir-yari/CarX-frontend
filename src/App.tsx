import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import CarsListPage from "./pages/CarsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/cars", element: <CarsListPage /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
