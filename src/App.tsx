import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import CarsListPage from "./pages/CarsList";
import CarPage from "./pages/Car";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cars", element: <CarsListPage /> },
      { path: "cars/:carId", element: <CarPage /> },
    ],
  },
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default App;
