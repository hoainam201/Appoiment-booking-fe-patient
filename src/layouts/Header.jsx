import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import {useNavigate, useLocation} from 'react-router-dom';
import {Button, Input} from "antd";
import {
  LoginOutlined,
  PlusOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  UserOutlined,
  KeyOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import logo from "../assets/images/Logo.png";
import {Avatar, Menu, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import USER from "../services/userService";
import "./style.css"
import {useTranslation} from "react-i18next";
import '../utils/i18n';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const settings = [
  {
    key: '1',
    label: 'Tài khoản',
    icon: <UserOutlined/>
  },
  {
    key: '2',
    label: 'Đổi mật khẩu',
    icon: <KeyOutlined/>
  },
  {
    key: '3',
    label: 'Lịch của bạn',
    icon: <UnorderedListOutlined/>
  },
  {
    key: '4',
    label: 'Đăng xuất',
    icon: <LoginOutlined/>
  }
];


const Header = () => {
  const navigate = useNavigate();
  const isLogin = useLocation().pathname === '/Login';
  const token = localStorage.getItem('token');

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [name, setName] = useState('');
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languageFromStorage = localStorage.getItem('language') || 'vi';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(token) {
            const response = await USER.getProfile();
            if (response.status === 200) {
              setName(response.data.name);
            } else if (response.status === 401) {
              localStorage.removeItem('token');
            }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [token]);


  const handleOpenUserMenu = () => {
    setAnchorElUser(!anchorElUser);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [language, setLanguage] = useState('EN');

  const turnLg = (buttonId) => {
    setLanguage(buttonId);
  };

  useEffect(() => {
    // Lấy ngôn ngữ hiện tại từ i18n và lưu vào localStorage
    localStorage.setItem('language', i18n.language);
  }, [i18n.language]);

  return (
    <div className="sticky top-0 flex flex-col w-full bg-white z-[999]">
      <div className="flex flex-col justify-center w-full bg-white h-28">
        <div className="flex justify-between py-4 px-20 top-0 w-full font-bold text-2xl">
          <button
            className="flex text-center items-center text-blue-400 font-bold text-nowrap"
            onClick={() => navigate('/')}
          >
            <div className="flex gap-4 w-10 h-10">
              <img className="w-full h-full" src={logo}/>
            </div>
            Health Pro
          </button>
          <div className="justify hidden md:flex">
            <Input size="small" className="w-96 rounded-full" placeholder="Search..." prefix={<SearchOutlined/>}/>
          </div>
          <div className="flex gap-4 w-1/4 justify-end">
            <div className="translate">
              <button id="VI" onClick={() => {
                turnLg('VI');
                changeLanguage('vi');
              }}>VI</button>
              <button id="EN" onClick={() => {
                turnLg('EN');
                changeLanguage('en');
              }}>EN</button>
              <div className={`spin ${i18n.language !== 'vi' ? 'turnToVI' : 'turnToEN'}`}></div>
            </div>
            {token ? (
              <Button
                shape="circle"
                size="large"
                onClick={handleOpenUserMenu}
                className="bg-blue-500 text-white "
              >
                <p className="rounded-full w-10 font-bold t">{name.charAt(0).toUpperCase()}</p>
                <Menu
                  sx={{mt: '45px'}}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.key} onClick={() => {
                      switch (setting.key) {
                        case '1':
                          navigate('/profile');
                          break;
                        case '2':
                          navigate('/change-password');
                          break;
                        case '3':
                          navigate('/appointments');
                          break;
                        case '4':
                          localStorage.removeItem('token');
                          navigate(0);
                          break;
                      }
                      handleCloseUserMenu();
                    }}>
                      <Typography textAlign="center">{setting.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Button>
            ) : (
              <Button
                shape="circle"
                size="large"
                onClick={() => navigate(isLogin ? '/Register' : '/Login')}
                icon={isLogin ? <PlusOutlined/> : <LoginOutlined/>}
              >
              </Button>
            )}
          </div>
        </div>
        <Navbar/>
      </div>
    </div>
  );
}

export default Header
