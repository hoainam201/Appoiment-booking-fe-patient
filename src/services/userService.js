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
  }
}

export default USER