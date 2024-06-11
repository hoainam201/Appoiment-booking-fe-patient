import React, {useState, useEffect, useMemo} from "react";
import {Button} from "@mui/material";
import {toast,} from "react-toastify";
import {useNavigate} from 'react-router-dom';
import USER from "../../../services/userService";
import Header from "../../../layouts/Header";
import { Layout } from 'antd';

const { Footer, Sider, Content } = Layout;


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');


  const handleMailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleReset = async () => {
    try {
      if (!email ) {
        toast.error('Vui lòng điền thông tin email');
        return;
      }
      const res = await USER.forgotPassword({
        email: email,
      });
      if (res.status === 200) {
        navigate('/Login');
        toast.success('Mật khẩu đã được đặt lại. Vui lòng kiểm tra email');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Thất bại');
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
              <form>
                <div
                  className="mb-2 flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg">Quên mật khẩu</p>
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


                <div className="text-center lg:text-left">
                  <Button
                    variant={`contained`}
                    onClick={handleReset}
                  >
                    Lấy lại mật khẩu
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default ForgotPassword;