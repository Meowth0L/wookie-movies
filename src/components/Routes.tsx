import * as React from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { NavigationRoutes } from "../constants/routes";
import { HomePage, MoviePage, NotFoundPage } from "../pages";

const Routes = () => {
  return (
    <ReactRoutes>
      <Route path={NavigationRoutes.HOME} element={<HomePage />} />
      <Route path={NavigationRoutes.MOVIES} element={<HomePage />} />
      <Route path={NavigationRoutes.MOVIE} element={<MoviePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </ReactRoutes>
  );
};

export default Routes;
