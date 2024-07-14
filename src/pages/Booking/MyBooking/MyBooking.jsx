import React, {useEffect, useState} from 'react';
import {Table, Tag, Button, Empty} from 'antd';
import {format} from 'date-fns';
import {bookingStatus, bookingStatusI} from "../../../utils/constants";
import USER from "../../../services/userService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {FormattedDate} from "react-intl";
import Loading from "../../../components/Loading";
import {useMediaQuery} from "@mui/material";
import {useTranslation} from "react-i18next";


const MyBooking = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
      if (!token) {
        navigate('/Login');
      }
    },
    [navigate, token]
  );


  const columns = [
    {
      title: t('fullName'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      fixed: 'left',
      responsive: ['lg'],
    },
    {
      title: t('medicalService'),
      dataIndex: 'service_name',
      key: 'service_name',
      fixed: 'left',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('dob'),
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: t('phoneNumber'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('time'),
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => new Date(a.time) - new Date(b.time),
      render: (text) => <FormattedDate value={text}
                                       year="numeric"
                                       month="long"
                                       day="numeric"
                                       hour="numeric"
                                       minute="numeric"/>
    },
    {
      title: t('createdAt'),
      dataIndex: 'created_at',
      key: 'create_at',
      sorter: (a, b) => new Date(a.create) - new Date(b.create),
      render: (text) => <FormattedDate value={text}
                                       year="numeric"
                                       month="long"
                                       day="numeric"
                                       hour="numeric"
                                       minute="numeric"/>
    },
    {
      title: t('status'),
      key: 'status',
      dataIndex: 'status',
      filters: bookingStatusI.map(status => ({text: t(status.name), value: status.id})),
      onFilter: (value, record) => record.status === value,
      render: (_, {status}) => (
        <>
          {
            <Tag color={bookingStatusI[status].color}>
              {t(bookingStatusI[status].name)}
            </Tag>
          }
        </>
      ),
    },
    {
      title: t('action'),
      key: 'action',
      render: (_, {id, status}) => {
        switch (status) {
          case 0:
          case 1:
            return (
              <>
                <Button shape="round" danger onClick={() => handleCancelBooking(id)}>{t('cancel')}</Button>
                <Button shape="round" onClick={() => navigate(`/appointments/${id}`)}>{t('detail')}</Button>
              </>
            )
          default:
            return (
              <div className="gap-2">
                <Button shape="round" onClick={() => navigate(`/appointments/${id}`)}>{t('detail')}</Button>
              </div>
            )
        }
      },
    },
  ];

  const fetchData = async () => {
    try {
      const response = await USER.getMyBooking();
      if (response.status === 200) {
        toast.dismiss();
        setData(response.data);
        console.log(response.data);
      } else {
        toast.dismiss();
        toast.error("Vui lòng thử lại sau!")
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      const response = await USER.cancelBooking(id);
      if (response.status === 200) {
        toast.dismiss();
        fetchData();
      } else {
        toast.dismiss();
        toast.error("Có lỗi xảy ra.Vui lòng thử lại sau!");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Vui lòng thử lại sau!");
    }
  };

  return (
    <div className="h-full py-5 lg:mx-20">
      {data && data.length > 0 ? <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'],
          // showTotal: (total) => `Bạn đã đặt ${total} lần khám`,
        }}
        scroll={{x: 'max-content'}}
      /> : <div className="h-96">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
      </div>}
    </div>
  );
};

export default MyBooking;