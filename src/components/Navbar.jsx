import {Menu, Button} from "antd";
import {HomeOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import React from "react";

const Header = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: (
        <button
        onClick={() => navigate('/')}
        >
          Cơ sở y tế
        </button>
      ),
      key: 'mail',
    },
    {
      label: 'Dịch vụ y tế',
      key: 'app',
    },
    {
      label: 'Gói khám',
      key: 'SubMenu',
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
        <a href="https://ant.design" rel="noopener noreferrer">
          Cẩm nang
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