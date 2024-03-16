import * as Pages from '../pages';

export const NormalRoutes = [
  {
    path: '/',
    element: <Pages.Home/>
  },
  {
    path: '/Login',
    element: <Pages.Login/>
  },
  {
    path: '/Register',
    element: <Pages.Register/>
  },
  {
    path: '/forgot-password',
    element: <Pages.ForgotPassword/>
  },
  {
    path: '/profile',
    element: <Pages.UserProfile/>
  },
  {
    path: '/change-password',
    element: <Pages.ChangePassword/>
  },
  {
    path: '/health-facilities',
    element: <Pages.HealthFacilities/>
  },
  {
    path: '/health-facilities/:id',
    element: <Pages.FacilityDetail/>
  },
  {
    path: '/doctor',
    element: <Pages.DoctorList/>
  },
  {
    path: '/doctor/:id',
    element: <Pages.DoctorDetail/>
  },
  {
    path: '/booking',
    element: <Pages.DoctorBooking/>
  },
  {
    path: '/health-package',
    element: <Pages.HealthPackageList/>
  },
  {
    path: '/health-package/:id',
    element: <Pages.HealthPackageDetail/>
  }
];

export const NotFound = {
  path: '*',
  element: <Pages.NotFound/>
}