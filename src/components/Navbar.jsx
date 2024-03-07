import {Menu, Button} from "antd";
import {HomeOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import React from "react";
import {specialities} from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = (specialty) => {
    navigate('/health-facilities/' + specialty);
  };
  const items = [
    {
      label: (
        <button
          onClick={() => navigate('/health-facilities')}
        >
          Cơ sở y tế
        </button>
      ),
      key: 'Health Facilities',
    },
    {
      label: (
        <button
          onClick={() => navigate('/doctor')}
        >
          Bác sĩ
        </button>
      ),
      key: 'Doctor',
    },
    {
      label: 'Chuyên khoa',
      key: 'SubMenu',
      children: specialities.map((specialty) => ({
        label: (
          <button
            onClick={() => handleClick(specialty.id)}
          >
            {specialty.name}
          </button>
        ),
        key: specialty.id,
      }))
    },
    {
      label: (
        <button onClick={() => navigate('/')} rel="noopener noreferrer">
          Cẩm nang
        </button>
      ),
      key: 'alipay',
    },
  ];

  return (
    <Menu items={items} mode="horizontal" className="justify-center top-0"/>
  )
}

export default Header;