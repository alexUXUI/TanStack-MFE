import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/product" className="[&.active]:font-bold">
          Product Home
        </Link>{' '}
        <Link to="/product/service" className="[&.active]:font-bold">
          Service
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Product Home</h3>
      </div>
    );
  },
});

// @ts-ignore
import('service/Service').then((remoteComponent) => {
  console.log('remoteComponent', remoteComponent);
  // import remote react component
  const Service = remoteComponent.default;

  // create a tanstack route for it
  // @TODO: this should be created in the Product MFE and imported here
  const productRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/product/service',
    component: Service,
  });

  // add to route tree
  const routeTree = rootRoute.addChildren([indexRoute, productRoute]);

  // pass route tree to router
  const router = createRouter({ routeTree });

  const rootEl = document.getElementById('root');
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
      <React.StrictMode>
        {/* Use the router */}
        <RouterProvider router={router} />
      </React.StrictMode>,
    );
  }
});
