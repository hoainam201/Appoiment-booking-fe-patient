import {Menu, Button} from "antd";
import {HomeOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import React from "react";
import {specialities} from "../utils/constants";
import {useTranslation} from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const handleClick = (specialty) => {
    navigate('/speciality/' + specialty);
  };
  const items = [
    {
      label: (
        <button
          onClick={() => navigate('/health-facilities')}
        >
          {t('navbar.health_facilities')}
        </button>
      ),
      key: 'Health Facilities',
    },
    {
      label: (
        <button
          onClick={() => navigate('/doctor')}
        >
          {t('navbar.doctor')}
        </button>
      ),
      key: 'Service',
    },
    // {
    //   label: 'Chuyên khoa',
    //   key: 'SubMenu',
    //   children: specialities.map((specialty) => ({
    //     label: (
    //       <button
    //         onClick={() => handleClick(specialty.id)}
    //       >
    //         {specialty.name}
    //       </button>
    //     ),
    //     key: specialty.id,
    //   }))
    // },
    {
      label: (
        <button onClick={() => navigate('/health-package')} rel="noopener noreferrer">
          {t('navbar.health_package')}
        </button>
      ),
      key: 'package',
    },
    {
      label: (
        <button onClick={() => navigate('/news')} rel="noopener noreferrer">
          {t('navbar.news')}
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