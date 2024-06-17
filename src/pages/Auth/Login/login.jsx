import React, {useState, useEffect, useMemo} from "react";
import {Button} from "@mui/material";
import {toast,} from "react-toastify";
import {useNavigate} from 'react-router-dom';
import USER from "../../../services/userService";
import {isValidEmail} from "../../../utils/validate";
import {useTranslation} from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {t} = useTranslation();


  const handleMailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigateToRegister = () => {
    navigate('/Register');
  }

  const navigateToForgotPassword = () => {
    navigate('/forgot-password');
  }

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error(t('enterEmailAndPassword'));
        return;
      }
      if(isValidEmail(email) === false) {
        toast.error(t('enterValidEmail'));
        return;
      }
      console.log(email, password);
      const res = await USER.login({
        email: email.trim().toLowerCase(),
        password: password,
      });
      const token = res?.data?.token;
      if (token && res.status === 200) {
        localStorage.setItem('token', token);
        navigate(-1);
        toast.success(t('loginSuccessful'));
      } else {
        toast.error(t('loginFailed'));
      }
    } catch (error) {
      toast.error(t('loginFailed'));
    }
  };

  const token = useMemo(() => localStorage.getItem('token'), []);

  useEffect(() => {
      if (token) {
        navigate('/');
      }
    },
    [navigate, token]
  );

  return (
    <div className="relative">
      <section className=" z-10">
        <div className="h-3/4">
          <div
            className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div
              className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-1 lg:w-6/12 xl:w-6/12">
              <img
                src="https://blog.cloudticity.com/hubfs/benefits-of-medical-technology%20%281%29.jpg"
                className="w-full hidden lg:block"
                alt="Sample"/>
            </div>
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form onKeyDown={(e) => e.key === 'Enter' ? handleLogin() : null}>
                <div
                  className="mb-2 flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg">{t('login')}</p>
                </div>


                <div className="relative mb-6">
                  <div className="flex">
                    <label className="justify-start">Email</label>
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={handleMailChange}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                    placeholder="abc@gmail.com"/>
                </div>

                <div className="relative mb-6">
                  <div className="flex">
                    <label className="justify-start">{t('passwords')}</label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                    placeholder="••••••••"/>
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <button type="button" className="hover:underline" onClick={navigateToForgotPassword}>{t('forgotPassword')}</button>
                </div>

                <div className="text-center lg:text-left">
                  <Button
                    variant="contained"
                    onClick={handleLogin}
                  >
                    {t('login')}
                  </Button>

                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    {t('noAccount')}
                    <button
                      type="button"
                      onClick={navigateToRegister}
                      className="px-1 text-rose-600 transition duration-150 ease-in-out hover:text-danger-600 focus:text-red-800 active:text-red-800"
                    >{t('register')}</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default Login