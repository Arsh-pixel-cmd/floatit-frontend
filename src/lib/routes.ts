export const ROUTES = {
  landing: '/',
  dashboard: '/dashboard',
  canvas: '/canvas',
  profile: '/profile',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
