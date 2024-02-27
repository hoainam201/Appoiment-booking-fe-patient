import {Menu, Button} from "antd";
import {HomeOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import React from "react";

const Header = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: 'Trang chủ',
      key: 'mail',
      icon: <HomeOutlined/>,
    },
    {
      label: 'Navigation Two',
      key: 'app',
      icon: <MailOutlined/>,
      disabled: true,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      icon: <SettingOutlined/>,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
      key: 'alipay',
    },
  ];

  return (
    <Menu items={items} mode="horizontal" className="justify-center top-0"/>
  )
}

export default Header;