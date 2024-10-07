# About

Implementation of MFE architecture pattern, using TanStack technologies

## What am I looking at?

A repo with three MFEs (Frontend Microservices). 

The Shell MFE imports the Product MFE which imports the Service MFE.

Shell -> Product -> Service.

or

Parent -> Child -> Grandchild

### Unpacking terms

🐚 Shell: Top-level, responsible for switching between Product SPAs, based on the first URL segment.

📦 Product: SPA, responsible for aggregating Services, loads "Services" depending on the second URL segment.

🧩 Service: React component, responsible for a specific feature, designed to be horizontally reused across Product SPAs.

## Up and running

from root directory:

```
npm i
```

```
npm run start
```

from `/mfe/*` directories:

```
npm run dev
```

### Goals for routing, rough design

1. App Shell should not know which Product it is respnsible for rendering ahead of time.

Rather, App shell will "discover" which Product to render at runtime, referencing a schema.org MFE [manifest](https://github.com/awslabs/frontend-discovery).

2. Based on the MFE manifest, App Shell will create top-level routes for each Vertical Product SPA.

For example: if App shell gets a Manfiest that has a "Product" MFE, it will create a route `/product`. 

When a user vists the `/product` route, TanStack router will render the React SPA at that route.

3. Nested TanStack Routers & Child routes: 

when the "Product" MFE renders, it will be responsible for all children routes on the URL, after the top-level `/product` route. 

Product MFE should also not know about child routes ahead of time. It will also reference a manifest of its own, delcaring which services there are to aggregate.

For example: if the Product MFE SPA has a "Service" in its own manifest, Product SPA will create a `/product/service` route, and the Product MFE instance of Tanstack router will load and render a React component for the service.

4. Subsequent nesting of Routers: Routers can be nested such that they are given a base url and will care about the URL starting from that path segment.

### What is implemented

Currently, App Shell will get the Product SPA and render a route that is being exposed.