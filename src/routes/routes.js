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
    path: '/service/:id',
    element: <Pages.Detail/>
  },
  {
    path: '/booking',
    element: <Pages.DoctorBooking/>
  },
  {
    path: '/health-package',
    element: <Pages.PackageList/>
  },
  {
    path: '/booking-dialog',
    element: <Pages.BookingDialog/>
  },
  {
    path: '/appointments',
    element: <Pages.MyBooking/>
  },
  {
    path: '/news',
    element: <Pages.NewsList/>
  }, {
    path: '/news/:id',
    element: <Pages.NewDetails/>
  },
  {
    path: '/appointments/:id',
    element: <Pages.BookingDetail/>
  },
  {
    path: '/calorie-calculator',
    element: <Pages.CalorieCalculator/>
  },
  {
      path: '/bmi-calculator',
    element: <Pages.BMICalculator/>
  },
];

export const NotFound = {
  path: '*',
  element: <Pages.NotFound/>
}