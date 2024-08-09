import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import CarsListPage from "./pages/CarsList";
import CarPage from "./pages/Car";
import AccountPage from "./pages/Account";
import SuccessPage from "./pages/Success";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cars", element: <CarsListPage /> },
      { path: "cars/:carId", element: <CarPage /> },
      { path: "success", element: <SuccessPage /> },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
