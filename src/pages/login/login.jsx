import React, {useState, useEffect, useMemo} from "react";
import {Button} from "@mui/material";
import {toast,} from "react-toastify";
import {useNavigate} from 'react-router-dom';
import USER from "../../services/userService";
import Header from "../../layouts/Header";
import { Layout } from 'antd';

const { Footer, Sider, Content } = Layout;


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleMailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigateToRegister = () => {
    navigate('/register');
  }

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error('Please enter email and password');
        return;
      }
      console.log(email, password);
      const res = await USER.login({
        email,
        password
      });
      const token = res?.data?.token;
      console.log(res.data);
      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
      }
      toast.success('Login successful');
    } catch (error) {
      toast.error('Login failed');
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
      <Header/>
      <section className=" z-10">
        <div className="h-3/4">
          <div
            className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div
              className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-1 lg:w-6/12 xl:w-6/12">
              <img
                src="https://blog.cloudticity.com/hubfs/benefits-of-medical-technology%20%281%29.jpg"
                className="w-full"
                alt="Sample"/>
            </div>
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form>
                <div
                  className="mb-2 flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg">Đăng nhập</p>
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
                    <label className="justify-start">Mật khẩu</label>
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
                  <a href="#!">Quên mật khẩu?</a>
                </div>

                <div className="text-center lg:text-left">
                  <Button
                    variant={`contained`}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>

                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Chưa có tài khoản?
                    <button
                      onClick={navigateToRegister}
                      className="px-1 text-rose-600 transition duration-150 ease-in-out hover:text-danger-600 focus:text-red-800 active:text-red-800"
                    >Đăng ký</button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="Footer">
        <h2>Nam</h2>
      </div>
    </div>
  );

}

export default Login