import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import ReviewCard from "../../components/ReviewCard";
import TotalReivew from "../../components/TotalReivew";
import Logo from "../../assets/images/doctor.png";
import Viewer from "../../components/Editor/Viewer";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../../services/userService";
import {toast} from "react-toastify";
import dayjs from 'dayjs';
import {Empty} from "antd";
import Rating from "@mui/material/Rating";
import {useTranslation} from "react-i18next";
import {FacebookIcon, FacebookShareButton, XIcon, TwitterShareButton} from "react-share";
import validator from "validator";
import Packagelogo from "../../assets/images/healthpackage.png";

const times = ["8:00", "8:30", "9:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

export default function Detail() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState({});
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");
  const [totalReviews, setTotalReviews] = useState(0);
  const [page, setPage] = useState(1);
  const {t} = useTranslation();
  const url = process.env.REACT_APP_DOMAIN + "services/" + useParams().id;

  const id = useParams().id;

  const fetchDoctor = async () => {
    try {
      const res = await UserService.getDoctorDetail(id);
      if (res.status === 200) {
        setDoctor(res.data);
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchReviews = async () => {
    try {
      const res = token ? await UserService.getReviewsByToken(id, page) : await UserService.getReviews(id, page);
      if (res.status === 200) {
        console.log(res.data);
        setReviews(res.data.reviews);
        setTotalReviews(res.data.total);
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDoctor();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchUser = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await UserService.getProfile();
      if (res.status === 200) {
        setName(res.data.name);
        setPhone(res.data.phone);
        console.log(res.data);
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error);
    }
  }


  const handleSelect = (t) => {
    setTime(t);
    // console.log(t);
  }

  const handleSubmit = async () => {
    try {
      const house = time.split(":")[0] - 7;
      const minute = time.split(":")[1];
      const dateTimeString = `${date.format('YYYY-MM-DD')}T${house}:${minute}:00.000Z`;
      const dayjsDate = dayjs(dateTimeString, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
      const isAfter = dayjsDate.isAfter(dayjs(), 'day');
      if (!isAfter) {
        toast.error(t('dateRequirement'));
        return;
      }
      if (!validator.isMobilePhone(phone, 'vi-VN') || phone.trim().length !== 10) {
        toast.dismiss(); // Huy toast
        toast.error(t('phoneInvalid'));
        return;
      }
      if(name.trim() === '') {
        toast.error(t('fillAllFields'));
        return;
      }
      if(name.trim().length < 1) {
        toast.error(t('usernameLength'));
        return;
      }
      const res = await UserService.bookAppointment({
        name: name,
        service_id: id,
        phone: phone,
        dob: dob,
        time: dayjsDate,
      });
      if (res.status === 200) {
        toast.dismiss();
        toast.success(t("bookingSuccessful"));
        navigate("/appointments");
      } else {
        toast.dismiss();
        toast.error(t("bookingFailed"));
      }
    } catch (error) {
      toast.dismiss();
      toast.error(t("bookingFailed"));
    }
  }

  const handleClickOpen = async () => {
    await fetchUser();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className={`flex sm:mx-36 flex-col lg:flex-row mt-5 h-auto`}>
        <div className={`sm:w-48 w-full items-center`}>
          <div className={`mt-3 flex justify-center`}>
            {
              doctor?.type === 0
                ? <img src={doctor?.image || Logo} className={`w-40 h-40 object-fill rounded-full`}/>
                : <img src={doctor?.image || Packagelogo} className={`w-40 h-40 object-fill`}/>
            }
          </div>
          <div className={`mt-3 flex justify-center`}>
            <Button
              onClick={handleClickOpen}
              variant={`contained`}>{t('booking')}</Button>
          </div>
        </div>
        <div className={`sm:ml-10 mx-2 sm:hidden block border p-2 m-2 rounded-xl border-gray-300`}>
          <div className={`text-xl`}>{t('clinicAddress')}</div>
          <div className={`text-xl`}>{doctor?.facility?.name}</div>
          <div className={`text-sm`}>{doctor?.facility?.address}</div>
          <div className={`text-sm`}>{t('fee')}: {doctor?.fee} VND</div>
          <div className="flex gap-1">
            <FacebookShareButton url={`${url}`} hashtag={`HealthPro`}>
              <FacebookIcon size={32} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton url={`${url}`} hashtag={`HealthPro`}>
              <XIcon size={32} round={true}/>
            </TwitterShareButton>
          </div>
        </div>
        <div className={`sm:ml-10 sm:w-1/2 mx-2`}>
          <div className={`font-bold text-3xl header-title`}>{doctor?.name}</div>
          <div className={`text-sm break-words  mt-3`}>
            <Viewer value={doctor?.description}/>
          </div>
        </div>
        <div className={`sm:ml-10 mx-2 hidden sm:block`}>
          <div className={`text-xl`}>{t('clinicAddress')}</div>
          <div className={`text-xl`}>{doctor?.facility?.name}</div>
          <div className={`text-sm`}>{doctor?.facility?.address}</div>
          <div className={`text-sm`}>{t('fee')}: {doctor?.fee} VND</div>
          <div className="flex gap-1">
            <FacebookShareButton url={`${url}`} hashtag={`HealthPro`}>
              <FacebookIcon size={32} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton url={`${url}`} hashtag={`HealthPro`}>
              <XIcon size={32} round={true}/>
            </TwitterShareButton>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:mx-36 lg:flex-row mt-12 gap-5 min-h-[400px]">
        <div className={`sm:w-1/3 justify-start w-full mx-2`}>
          <div className="flex flex-col outline outline-1 outline-gray-200 rounded-md">
            <div className="flex justify-center text-center text-xl">
              {t('reviewOverview')}
            </div>
            <div className="flex flex-col justify-center items-center">
              <Rating name="read-only" value={Math.ceil(doctor?.avg_rating * 10) / 10} precision={0.1} readOnly/>
              <div>{Math.ceil(doctor?.avg_rating * 10) / 10}/5 ({totalReviews} {t('review')})</div>
            </div>
          </div>
        </div>
        <div className={`flex flex-col w-full mx-2`}>
          <p className={`w-full text-2xl`}>{t('userReviews')}</p>
          <div>
            {reviews && reviews.length > 0 ?
              reviews.map((review) => (
                <ReviewCard review={review}/>
              ))
              : <div><Empty/></div>
            }
          </div>
        </div>
      </div>

      {/*Dialog*/}
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{t('booking')}</DialogTitle>
        <DialogContent>
          <div className={`flex flex-col w-full mt-2`}>
            <div className={`flex w-full h-24 gap-3 justify-start`}>
              <img className={`w-auto h-full rounded-full`} src={doctor?.image || Logo}/>
              <div>
                <div className={`text-2xl font-bold`}>{doctor?.name}</div>
                <div className={`text-xl`}>Giá: {doctor?.fee} VND</div>
              </div>
            </div>
            <div className={`w-full h-1 bg-gray-200 my-3`}/>
            <form className="bg-white rounded sm:px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  {t('fullName')}
                </label>
                <input
                  className="h-14 border rounded w-full py-2 px-3 text-gray-700 outline-none border-[#d5d5d5]
                focus:border-[#003bfd] focus:border-2 hover:border-black"
                  id="username"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t('phoneNumber')}
                </label>
                <input
                  className="h-14 border rounded w-full py-2 px-3 text-gray-700 outline-none border-[#d5d5d5]
                focus:border-[#003bfd] focus:border-2 hover:border-black"
                  id="username"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0123456789"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t('dob')}
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
                  {t('time')}
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
                  {t('hour')}
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
                <li>{t('fillInformation')}</li>
                <li>{t('paymentNote')}</li>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button type="submit" onClick={handleSubmit} variant="contained">{t('booking')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}