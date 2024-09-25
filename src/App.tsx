import { AppHeader } from "components/AppHeader";

import "./App.css";

import {
  Outlet,
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense } from "react";
import Home from "components/Home/Home";
import CAFTOP from "components/CAFTOP/CAFTOP";

/** Create a React Router with the needed Routes using the Data API */
const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="item/:itemId" element={<CAFTOP />} />
      <Route path="new" element={<CAFTOP />} />
      <Route
        path="*" // Catch-all to display homepage if no match
        element={<Home />}
      />
    </Route>
  )
);

function MainLayout() {
  return (
    <div className="appContainer">
      <div className="appHeader">
        <AppHeader />
      </div>
      <div className="appContent">
        <Suspense
          fallback={<div style={{ paddingLeft: ".5em" }}>Loading...</div>}
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
