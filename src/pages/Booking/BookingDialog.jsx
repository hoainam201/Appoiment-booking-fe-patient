import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DoctorBooking from "./DoctorBooking";
import DoctorImg from "../../assets/images/doctor.png";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const times = ["8:00", "8:30", "9:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

export default function FormDialog(props, open, {setOpen}) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // const [open, setOpen] = useState(false);
  const handleSelect = (t) => {
    setTime(t);
    console.log(t);
  }

  const handleSubmit = (props) => {
    console.log(name, phone, address, date, time)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={`false`}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Đặt lịch khám</DialogTitle>
        <DialogContent>
          <div className={`flex flex-col w-full mt-2`}>
            <div className={`flex w-full h-24 gap-3 justify-start`}>
              <img className={`w-auto h-full rounded-full`} src={props?.img || DoctorImg}/>
              <div>
                <div className={`text-2xl font-bold`}>props?.name</div>
                <div className={`text-xl`}>Giá: props?.price VND</div>
              </div>
            </div>
            <div className={`w-full h-1 bg-gray-200 my-3`}/>
            <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
                  sx={{width: '100%'}}
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi">
                  <DemoContainer
                    sx={{width: '100%'}}
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
                  sx={{width: '100%'}}
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi">
                  <DemoContainer
                    sx={{width: '100%'}}
                    components={['DatePicker']}>
                    <DatePicker
                      sx={{width: '100%'}}
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
              <div className="mt-4">
                <li>Vui lòng điền chính xác thông tin để bệnh viện lập hồ sơ</li>
                <li>Chi phí đặt lích khám sẽ thanh toán tại bệnh viện</li>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit" onClick={handleSubmit} variant="contained">Đặt khám</Button>
        </DialogActions>
      </Dialog>
  );
}