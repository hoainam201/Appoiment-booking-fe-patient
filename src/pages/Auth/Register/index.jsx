import React, {useEffect, useMemo, useState} from "react";
import {Button} from "@mui/material";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';
import login from "../../../assets/images/login.png";
import USER from "../../../services/userService";
import Header from "../../../layouts/Header";
import Footer from "../../../layouts/Footer";
import {isValidEmail} from "../../../utils/validate";
import {useTranslation} from "react-i18next";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {t} = useTranslation();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const navigateToLogin = () => {
    navigate('/Login');
  };

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || !confirmPassword) {
        toast.error(t('fillAllFields'));
        return;
      }
      if (password !== confirmPassword) {
        toast.error(t('passwordsDoNotMatch'));
        return;
      }
      if(isValidEmail(email) === false) {
        toast.error('Please enter valid email');
        return;
      }
      const res = await USER.register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      })
      if (res.status === 200) {
        toast.success(t('registrationSuccessful'));
        navigate('/Login');
      } else if(res.status === 409){
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('registrationFailed');
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
    <div>
      <section className="z-10">
        <div className="h-2/3">
          <div
            className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div
              className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-1 lg:w-6/12 xl:w-6/12">
              <img
                src={login}
                className="w-full hidden lg:block"
                alt="Sample" />
            </div>
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form>
                <div
                  className="mb-2 flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg">{t('register')}</p>
                </div>

                <div className="relative mb-6">
                  <div className="flex">
                    <label className = "justify-start">{t('fullName')}</label>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                    placeholder="Nguyễn Văn A" />
                </div>

                <div className="relative mb-6">
                  <div className="flex">
                    <label className = "justify-start">Email</label>
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={handleMailChange}
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                    placeholder="abc@gmail.com" />
                </div>

                <div className="relative mb-6">
                  <div className="flex">
                    <label class = "justify-start">{t('passwords')}</label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                    placeholder="••••••••" />
                </div>

                <div className="relative mb-6">
                  <div className="flex">
                    <label className = "justify-start">{t('confirmPassword')}</label>
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                    placeholder="••••••••" />
                </div>


                <div className="text-center lg:text-left">
                  <Button
                    variant={`contained`}
                    onClick={handleRegister}
                  >
                    {t('register')}
                  </Button>

                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    {t('haveAccount')}
                    <button
                      onClick={navigateToLogin}
                      className="px-1 text-rose-600 transition duration-150 ease-in-out hover:text-danger-600 focus:text-red-800 active:text-red-800"
                    >{t('login')}</button
                    >
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

export default Register