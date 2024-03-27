import React, {useEffect, useMemo} from "react";
import DoctorImg from "../../assets/images/img2.png";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/vi";

const times = ["8:00", "8:30", "9:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];


const DoctorBooking = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (props) => {
    console.log(name, phone, address, date, time, reason)
  }

  const token = useMemo(() => localStorage.getItem('token'), []);

  useEffect(() => {
      if (!token) {
        navigate('/Login');
      }
      if (!props.name){
        // navigate('/');
      }
    },
    [navigate, token, props]
  );

  const handleSelect = (t) => {
    setTime(t);
    console.log(t);
  }

  return (
    <div>
      <div className={`flex justify-center w-full bg-blue-100`}>
        <div className={`flex flex-col w-1/2 mt-2`}>
          <div className={`flex w-full h-24 gap-3 justify-start`}>
            <img className={`w-auto h-full rounded-full`} src={props?.img || DoctorImg}/>
            <div>
              <div className={`text-xl`}>Đặt lịch khám</div>
              <div className={`text-2xl font-bold`}>props?.name</div>
              <div className={`text-xl`}>Giá: props?.price VND</div>
            </div>
          </div>
          <div className={`w-full h-1 bg-gray-200 my-3`}/>
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Họ tên
              </label>
              <input
                className="h-14 border rounded w-full py-2 px-3 text-gray-700 outline-none border-[#d5d5d5]
                focus:border-[#003bfd] focus:border-2 hover:border-black"
                id="username"
                type="text"
                value={props?.name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Số điện thoại
              </label>
              <input
                className="h-14 border rounded w-full py-2 px-3 text-gray-700 outline-none border-[#d5d5d5]
                focus:border-[#003bfd] focus:border-2 hover:border-black"
                id="username"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0123456789"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ngày tháng năm sinh
              </label>
              <LocalizationProvider
                sx={{ width: '100%' }}
                dateAdapter={AdapterDayjs}
                adapterLocale="vi">
                <DemoContainer
                  sx={{ width: '100%' }}
                  components={['DatePicker']}>
                  <DatePicker
                    sx={{
                      width: '100%',
                  }}
                    onChange={(e) => setDob(e)}/>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ngày khám
              </label>
                <LocalizationProvider
                  sx={{ width: '100%' }}
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi">
                  <DemoContainer
                    sx={{ width: '100%' }}
                    components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%' }}
                      onChange={(e) => setDate(e)}/>
                  </DemoContainer>
                </LocalizationProvider>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Giờ khám
              </label>
              <div
                className="rounded w-full py-2 px-3 text-gray-700 leading-tight h-max-[170px]"
                onChange={(e) => setTime(e.target.value)}
                type="date">
                <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 1,
                  width: '100%',
                  height: '100%',
                }}
                >
                  {times.map((t) => (
                    <Chip
                      sx={{
                        width: '100px',
                        height: '35px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      label={t}
                      onClick={() => handleSelect(t)}
                      color={t === time ? 'primary' : 'default'}/>
                  ))}
                </Stack>

              </div>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Đặt khám
              </button>
            </div>
            <div className="mt-4">
              <li>Vui lòng điền chính xác thông tin để bệnh viện lập hồ sơ</li>
              <li>Chi phí đặt lích khám sẽ thanh toán tại bệnh viện</li>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DoctorBooking