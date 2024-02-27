import React, {useState} from "react";
import Navbar from "../components/Navbar";
import {useNavigate, useLocation} from 'react-router-dom';
import {Button, Input} from "antd";
import {
  LoginOutlined,
  PlusOutlined,
  SearchOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import logo from "../assets/images/Logo.png";


const Header = () => {
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === '/login';

  return (
    <div className="sticky top-0 flex flex-col w-full bg-white z-50">
      <div className="flex flex-col justify-center w-full bg-white h-28">
        <div className="flex justify-between py-4 px-20 top-0 w-full font-bold text-2xl">
          <button
            className="flex text-center items-center gap-2"
            onClick={() => navigate('/')}
          >
            <div className="flex gap-4 w-10 h-10">
              <img className="w-full h-full" src={logo}/>
            </div>
            Health Pro
          </button>
          <div className="flex justify">
            <Input size="small" className="w-96 rounded-full" placeholder="Search..." prefix={<SearchOutlined/>}/>
          </div>
          <div className="flex gap-4">
            <Button
              shape="round"
              size="large"
              onClick={() => navigate(isLogin ? '/register' : '/login')}
              icon={isLogin ? <PlusOutlined/> : <LoginOutlined/>}
            >
              {isLogin ? 'Đăng ký' : 'Đăng nhập'}
            </Button>
            <Button
              className="bg-blue-600"
              type="primary"
              shape="round"
              size="large"
              icon={<PlusCircleOutlined/>}
              onClick={() => navigate('/register')}
            >
              Đặt lịch
            </Button>
          </div>
        </div>
        <Navbar/>
      </div>
    </div>
  );
}

export default Header
