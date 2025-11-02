import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";

const App = () => {
  const route = createBrowserRouter(
    createRoutesFromElements(<Route index element={<RootLayout />}></Route>)
  );
  return <RouterProvider router={route} />;
};

export default App;
