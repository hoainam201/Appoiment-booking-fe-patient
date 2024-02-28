import * as Pages from '../pages';

export const NormalRoutes = [
  {
    path: '/',
    element: <Pages.Home/>
  },
  {
    path: '/login',
    element: <Pages.Login/>
  },
  {
    path: '/register',
    element: <Pages.Register/>
  }
];

