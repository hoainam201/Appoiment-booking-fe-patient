import privateHttp from './http/privateHttp.config';
import publicHttp from './http/publicHttp.config';

const USER = {
  register: async ({name, email, password}) => {
    let res = await publicHttp({
      method: 'post',
      url: '/user/register',
      data: {
        name,
        email,
        password
      }
    });
    return res;
  },
  login: async ({email, password}) => {
    let res = await publicHttp({
      method: 'post',
      url: '/user/login',
      data: {
        email,
        password
      }
    });
    return res;
  },
  forgotPassword: async ({email}) => {
    let res = await publicHttp({
      method: 'post',
      url: '/user/forget-password',
      data: {
        email
      }
    });
    return res;
  },
  changePassword: async ({oldPassword, newPassword}) => {
    let res = await privateHttp({
      method: 'put',
      url: '/user/change-password',
      data: {
        oldPassword,
        newPassword
      }
    });
    return res;
  },
  getProfile: async () => {
    let res = await privateHttp({
      method: 'get',
      url: '/user/find-user'
    });
    return res;
  },
  updateProfile: async ({name, phone, gender, address}) => {
    let res = await privateHttp({
      method: 'put',
      url: '/user/update-user',
      data: {
        name,
        phone,
        gender,
        address
      }
    });
    return res;
  },
  getFacilities: async (pageNumber) => {
    let res = await publicHttp({
      method: 'get',
      url: '/health-facilities' + (pageNumber ? `?page=${pageNumber}` : '')
    });
    return res;
  },
  getFacilityDetail: async (id) => {
    let res = await publicHttp({
      method: 'get',
      url: '/health-facilities/get-by-id/' + id
    });
    return res;
  },
  getDoctors: async (pageNumber) => {
    let res = await publicHttp({
      method: 'get',
      url: '/health-service/doctors/' + (pageNumber ? `?page=${pageNumber}` : '')
    });
    return res;
  },
  getPackages: async (pageNumber) => {
    let res = await publicHttp({
      method: 'get',
      url: '/health-service/packages/' + (pageNumber ? `?page=${pageNumber}` : '')
    });
    return res;
  },
  getDoctorDetail: async (id) => {
    let res = await publicHttp({
      method: 'get',
      url: '/health-service/details/' + id
    });
    return res;
  },
  bookAppointment: async ({name, service_id, phone, dob, time}) => {
    let res = await privateHttp({
      method: 'post',
      url: '/booking/create',
      data: {
        name,
        service_id,
        phone,
        dob,
        time
      }
    });
    return res;
  },
  getMyBooking: async () => {
    let res = await privateHttp({
      method: 'get',
      url: '/booking/get-booking-by-user'
    });
    return res;
  },
  cancelBooking: async (id) => {
    let res = await privateHttp({
      method: 'put',
      url: '/booking/cancel/' + id
    });
    return res;
  },
  getAllNews: async (pageNumber) => {
    let res = await publicHttp({
      method: 'get',
      url: '/news' + (pageNumber ? `?page=${pageNumber}` : '')
    });
    return res;
  },
  getNewsDetail: async (id) => {
    let res = await publicHttp({
      method: 'get',
      url: '/news/' + id
    });
    return res;
  },
  getBookingDetail: async (id) => {
    let res = await privateHttp({
      method: 'get',
      url: '/booking/detail/' + id
    });
    return res;
  },
  rateBooking: async (service_id, booking_id, rating, comment) => {
    let res = await privateHttp({
      method: 'post',
      url: '/service-review/create',
      data: {
        service_id,
        booking_id,
        rating,
        comment
      }
    });
    return res;
  },
  getReviews: async (id, page) => {
    let res = await publicHttp({
      method: 'get',
      url: '/service-review/service/' + id + (page ? `?page=${page}` : '')
    });
    return res;
  },
  getReviewFacility: async (id, page) => {
    let res = await publicHttp({
      method: 'get',
      url: '/service-review/facility/' + id + (page ? `?page=${page}` : '')
    });
    return res;
  },
  getReviewsByToken: async (id, page) => {
    let res = await privateHttp({
      method: 'get',
      url: '/service-review/service/user/' + id + (page ? `?page=${page}` : '')
    });
    return res;
  },
  getReviewFacilityByToken: async (id, page) => {
    let res = await privateHttp({
      method: 'get',
      url: '/service-review/facility/user/' + id + (page ? `?page=${page}` : '')
    });
    return res;
  },
  getReviewDetail: async (id) => {
    let res = await publicHttp({
      method: 'get',
      url: '/service-review/get/' + id
    });
    return res;
  },
  searchFacility: async (query, pageNumber, address, speciality) => {
    let res = await publicHttp({
      method: 'post',
      url: '/health-facilities/search/',
      data: {
        name: query,
        page: pageNumber,
        address,
        speciality
      }
    });
    return res;
  },
  searchService: async (name, type, speciality, page, sort) => {
    let res = await publicHttp({
      method: 'post',
      url: '/health-service/search/',
      data: {
        name,
        type,
        speciality,
        page,
        sort
      }
    });
    return res;
  },
  favourite: async (id) => {
    let res = await privateHttp({
      method: 'post',
      url: '/favourite/create',
      data: {
        service_review_id: id
      }
    });
    return res;
  },
  unFavourite: async (id) => {
    let res = await privateHttp({
      method: 'delete',
      url: '/favourite/destroy/',
      data: {
        service_review_id: id
      }
    });
    return res;
  },
  getTopHealthFacilities: async () => {
    let res = await publicHttp({
      method: 'get',
      url: '/health-facilities/top-health-facilities'
    });
    return res;
  },
  getTopDoctors: async () => {
    let res = await publicHttp({
      method: 'get',
      url: '/health-service/top-doctors'
    });
    return res;
  },
  getTopServices: async () => {
    let res = await publicHttp({
      method: 'get',
      url: '/health-service/top-packages'
    });
    return res;
  },
  getLatestNews: async () => {
    let res = await publicHttp({
      method: 'get',
      url: '/news/latest'
    });
    return res;
  },
  getRecommend: async () => {
    let res = await publicHttp({
      method: 'get',
      url: 'health-service/recommendations/1'
    });
    return res;
  }
}

export default USER