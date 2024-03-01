import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import USER from "../../services/userService";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import {Button} from "@mui/material";
import {toast} from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');


  if (!token) {
    navigate('/login');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await USER.getProfile();
        setData(response.data);
        console.log(data);
        setName(response.data.name);
        setPhone(response.data.phone);
        setGender(response.data.gender);
        setEmail(response.data.email);
        setAddress(response.data.address);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const res = await USER.updateProfile({
        name,
        phone,
        gender,
        address
      });
      if (res.status === 200) {
        toast.success('Cập nhật thành công');
      } else {
        toast.error('Cập nhật thất bại');
      }

    } catch (error) {
      console.error(error);
    }
  }

  const hanleCancel = () => {
    setName(data.name);
    setPhone(data.phone);
    setGender(data.gender);
    setAddress(data.address);
  }


  return (
    <div>
      <Header />
      <div className="bg-white overflow-hidden shadow rounded-lg border w-1/2 m-auto">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Địa chỉ email
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {email}
            </dd>
          </div>
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Họ và tên
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input value={name} onChange={(e) => setName(e.target.value)}/>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Giới tính
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Số điện thoại
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  value={phone}
                  placeholder="Chưa có số điện thoại"
                  onChange={(e) => setPhone(e.target.value)}/>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Địa chỉ
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  value={address}
                  placeholder="Chưa có địa chỉ"
                  onChange={(e) => setAddress(e.target.value)}/>
              </dd>
            </div>
          </dl>
        </div>
        <div className={`flex ml-5 gap-2 my-2`}>
          <Button variant="contained" onClick={handleSave}>Cập nhật</Button>
          <Button
            onClick={hanleCancel}
          >Hủy</Button>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default UserProfile;