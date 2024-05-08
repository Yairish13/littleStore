import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

interface DynamicRoutesProps {
  routes: RouteConfig[];
}

const DynamicRoutes: FC<DynamicRoutesProps> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default DynamicRoutes;
