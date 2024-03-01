import React, {useState} from "react";
import Navbar from "../components/Navbar";
import {useNavigate, useLocation} from 'react-router-dom';
import {Button, Input} from "antd";
import {
  LoginOutlined,
  PlusOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  UserOutlined,
  KeyOutlined
} from "@ant-design/icons";
import logo from "../assets/images/Logo.png";
import {Avatar, IconButton, Tooltip, Menu, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";

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
    label: 'Đăng xuất',
    icon: <LoginOutlined/>
  }
];


const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isLogin = useLocation().pathname === '/login';
  const token = localStorage.getItem('token');

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(!anchorElUser);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="sticky top-0 flex flex-col w-full bg-white z-50">
      <div className="flex flex-col justify-center w-full bg-white h-28">
        <div className="flex justify-between py-4 px-20 top-0 w-full font-bold text-2xl">
          <button
            className="flex text-center items-center text-blue-400 font-bold"
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
          <div className="flex gap-4 w-1/4 justify-end">
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
            {token ? (
              <Button
                shape="circle"
                size="large"
                onClick={handleOpenUserMenu}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"
                         sx={{
                           width: 40,
                           height: 40,
                           top: -8,
                         }}
                />
                <Menu
                  sx={{ mt: '45px' }}
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
                    <MenuItem key={setting.key} onClick={()=>{
                      switch (setting.key) {
                        case '1':
                          navigate('/profile');
                          break;
                        case '2':
                          navigate('/change-password');
                          break;
                        case '3':
                          localStorage.removeItem('token');
                          navigate('/');
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
              onClick={() => navigate(isLogin ? '/register' : '/login')}
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
