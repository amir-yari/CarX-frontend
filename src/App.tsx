import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import CarsListPage from "./pages/CarsList";
import TripsListPage from "./pages/TripsList";
import CarPage from "./pages/Car";
import AccountPage from "./pages/Account";
import { CheckoutForm, Return } from "./components/stripe";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/Error";

import { useUserDispatch, useUserSelector } from "./store/hooks";
import { fetchUserLocation } from "./store/user-actions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cars", element: <CarsListPage /> },
      { path: "trips", element: <TripsListPage /> },
      { path: "cars/:carId", element: <CarPage /> },
      { path: "checkout", element: <CheckoutForm /> },
      { path: "return", element: <Return /> },
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
  const userLocation = useUserSelector((state) => {
    state.user.location;
  });
  const userDispatch = useUserDispatch();
  useEffect(() => {
    if (userLocation! === undefined) {
      userDispatch(fetchUserLocation());
    }
  }, [userDispatch]);

  return <RouterProvider router={router} />;
};

export default App;
