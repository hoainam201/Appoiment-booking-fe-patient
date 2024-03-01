import React, {useEffect, useMemo, useState} from "react";
import {Button} from "@mui/material";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';
import login from "../../assets/images/login.png";
import USER from "../../services/userService";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    navigate('/login');
  };

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || !confirmPassword) {
        toast.error('Please enter email and password');
        return;
      }
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      const res = await USER.register({
        name: name,
        email: email,
        password: password,
      })
      if (res.status === 200) {
        toast.success('Đăng ký thành công!');
        navigate('/login');
      } else if(res.status === 409){
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Đăng ký thất bại!');
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
      <Header/>
      <section className="z-10">
        <div className="h-2/3">
          <div
            className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div
              className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-1 lg:w-6/12 xl:w-6/12">
              <img
                src={login}
                className="w-full"
                alt="Sample" />
            </div>
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form>
                <div
                  className="mb-2 flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg">Đăng ký</p>
                </div>

                <div className="relative mb-6">
                  <div className="flex">
                    <label className = "justify-start">Họ và tên</label>
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
                    <label class = "justify-start">Mật khẩu</label>
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
                    <label className = "justify-start">Mật khẩu</label>
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
                    Đăng ký
                  </Button>

                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Đã có tài khoản?
                    <button
                      onClick={navigateToLogin}
                      className="px-1 text-rose-600 transition duration-150 ease-in-out hover:text-danger-600 focus:text-red-800 active:text-red-800"
                    >Đăng nhập</button
                    >
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );

}

export default Register