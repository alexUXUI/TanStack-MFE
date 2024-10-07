import './App.css';

import './App.css';
import {
  Outlet,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

// @ts-ignore
import Service from 'service/Service';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/product" className="[&.active]:font-bold">
          Product
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

// @TODO: this should be created in the Service MFE and imported here
const serviceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/service',
  component: Service,
});

// add to route tree
const routeTree = rootRoute.addChildren([indexRoute, serviceRoute]);

// pass route tree to router
const router = createRouter({ routeTree });

const Product = () => {
  return (
    <div className="content">
      <h1>Product SPA 📦</h1>
      <RouterProvider router={router} />
    </div>
  );
};

export default Product;
