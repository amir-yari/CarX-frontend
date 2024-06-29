import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import CarsListPage from "./pages/CarsList";
import SignupPage from "./components/Signup";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/cars", element: <CarsListPage /> },
      { path: "/signup", element: <SignupPage /> },
    ],
  },
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default App;
