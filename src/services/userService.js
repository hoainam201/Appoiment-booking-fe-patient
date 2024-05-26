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
    }
}

export default USER