import './App.css';
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

// @ts-ignore
import Product from 'product/Product';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Shell
        </Link>{' '}
        <Link to="/product" className="[&.active]:font-bold">
          Product
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
  path: '/',
  component: function Index() {
    return (
      <div className="p-2">
        <h3>Shell Home</h3>
      </div>
    );
  },
});

// @TODO: this should be created in the Product MFE and imported here
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product',
  component: Product,
});

const serviceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/service',
  component: () => {},
});

// add to route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  productRoute,
  serviceRoute,
]);

// pass route tree to router
const router = createRouter({ routeTree });

const App = () => {
  return (
    <div className="content">
      <h1>Shell 🐚</h1>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
