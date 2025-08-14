import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Gallery from "./Gallery";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/gallery", element: <Gallery /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
