import React, {useEffect, useState} from 'react';
import {Table, Tag, Button} from 'antd';
import {format} from 'date-fns';
import {bookingStatus} from "../../../utils/constants";
import USER from "../../../services/userService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {FormattedDate} from "react-intl";
import Loading from "../../../components/Loading";
import {useMediaQuery} from "@mui/material";



const MyBooking = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
            if (!token) {
                navigate('/Login');
            }
        },
        [navigate, token]
    );


    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            fixed: 'left',
            responsive: ['lg'],
        },
        {
            title: 'Dịch vụ',
            dataIndex: 'service_name',
            key: 'service_name',
            fixed: 'left',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Thời gian khám',
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
            title: 'Thời gian tạo',
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
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            filters: bookingStatus.map(status => ({text: status.name, value: status.id})),
            onFilter: (value, record) => record.status === value,
            render: (_, {status}) => (
                <>
                    {
                        <Tag color={bookingStatus[status].color}>
                            {bookingStatus[status].name}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: 'Lựa chọn',
            key: 'action',
            render: (_, {id, status}) => {
                switch (status) {
                    case 0:
                    case 1:
                        return (
                            <>
                                <Button shape="round" danger onClick={() => handleCancelBooking(id)}>Hủy khám</Button>
                            </>
                        )
                    default:
                        return (
                            <div className="gap-2">
                                <Button shape="round" onClick={() => navigate(`/appointments/${id}`)}>Chi tiết</Button>
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
    }, []);

    const handleCancelBooking = async (id) => {
        try {
            toast.dismiss();
            toast.loading("Đang xử lý...");
            const response = await USER.cancelBooking(id);
            if (response.status === 200) {
                toast.dismiss();
                toast.success("Đặt lần khám thanh cách");
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
            {data && data.length> 0 ? <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    defaultCurrent: 1,
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                    showTotal: (total) => `Bạn đã đặt ${total} lần khám`,
                }}
                scroll={{x: 'max-content'}}
        />: <div className="h-96">
                <Loading/>
            </div> }
        </div>
    );
};

export default MyBooking;