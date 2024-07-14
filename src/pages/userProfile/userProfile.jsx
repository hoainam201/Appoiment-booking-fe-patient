import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import USER from "../../services/userService";
import {Button} from "@mui/material";
import {toast} from "react-toastify";
import validator from 'validator'
import {useTranslation} from "react-i18next";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

const UserProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const {t, i18n} = useTranslation();
  const [dob, setDob] = useState('');

  const today = dayjs();

  const token = useMemo(() => localStorage.getItem('token'), []);

  useEffect(() => {
      if (!token) {
        navigate('/Login');
      }
    },
    [navigate, token]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await USER.getProfile();
        setData(response.data);
        console.log(response.data);
        setName(response.data.name);
        setPhone(response.data.phone);
        setGender(response.data.gender);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setDob(response.data.dob);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleSave = async () => {
    try {
      if (name.trim() === '') {
        toast.dismiss();
        toast.error(t('fillAllFields'));
        return;
      }
      if (name.trim().length < 1) {
        toast.dismiss();
        toast.error(t('usernameLength'));
        return;
      }
      const req = {
        name: name.trim(),
        gender: gender,
        dob: dob
      }
      if (phone.trim() !== '') {
        if (!validator.isMobilePhone(phone, 'vi-VN') || phone.trim().length !== 10) {
          toast.dismiss(); // Huy toast
          toast.error(t('phoneInvalid'));
          return;
        }
        req.phone = phone.trim();
      }
      if (address.trim() !== '') {
        req.address = address.trim();
      }
      const res = await USER.updateProfile({
        ...req
      });
      if (res.status === 200) {
        toast.dismiss();
        toast.success(t('updateSuccessful'));
      } else {
        toast.dismiss();
        toast.error(t('updateFailed'));
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
      <div className="bg-white overflow-hidden shadow rounded-lg border w-full sm:w-1/2 m-auto">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {t('profile')}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {t('userInformation')}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {t('emailAddress')}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {email}
            </dd>
          </div>
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('fullName')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input value={name} onChange={(e) => setName(e.target.value)}/>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('gender')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="true">{t('male')}</option>
                  <option value="false">{t('female')}</option>
                </select>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('phoneNumber')}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  value={phone}
                  placeholder="Chưa có số điện thoại"
                  onChange={(e) => setPhone(e.target.value)}/>
              </dd>
            </div>
            <div className="py-1 sm:py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm my-auto font-medium text-gray-500">
                {t('dob')}
              </dt>
              <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <LocalizationProvider
                  sx={{
                    width: '100%',
                }}
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"

                >
                  <DemoContainer
                    sx={{
                      width: '100%',
                  }}
                    components={['DatePicker']}>
                    <DatePicker
                      sx={{
                        width: '100%',
                      }}
                      slotProps={{ textField: { size: 'small' } }}
                      value={dob ? dayjs(dob) : null}
                      maxDate={today}
                      onChange={(e) => setDob(e)}/>
                  </DemoContainer>
                </LocalizationProvider>
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                {t('address')}
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
          <Button variant="contained" onClick={handleSave}>{t('update')}</Button>
          <Button
            onClick={hanleCancel}
          >{t('cancel')}</Button>
        </div>
      </div>
    </div>
  );

};

export default UserProfile;