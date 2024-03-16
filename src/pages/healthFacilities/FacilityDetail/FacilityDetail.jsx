import React, {useState, useEffect} from "react";
import FacilityInfo from "../../../components/FacilityInfo";
import axios from "axios";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DoctorButton from "../../../components/DoctorButton";
import TotalReivew from "../../../components/TotalReivew";
import ReviewCard from "../../../components/ReviewCard";
import {useParams} from "react-router-dom";
import USER from "../../../services/userService";


const FacilityDetail = () => {
  const [id, setId] = useState('');
  const [data, setData] = useState([]);
  const facilityId = useParams();

  const getFacilityDetail = async () => {
    try {
      console.log(facilityId);
      const res = await USER.getFacilityDetail(facilityId.id);
      // console.log(res.data);
      await setData(res.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getFacilityDetail();
  },[]);

  useEffect(() => {
    console.log(data); // Giá trị mới của data sau khi setState
  }, [data]);

  return (
    <div className={`bg-blue-100 pb-5`}>
      <div className={`flex mx-36 gap-5`}>
        <div className={`flex w-1/3`}>
          <FacilityInfo {...data}/>
        </div>
        <div className={`flex w-2/3 my-4 mx-auto my-auto`}>
          <div className={` w-full max-h-96`}>
            <img
              className={`object-cover rounded-2xl w-full h-96`}
              src={`https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Fc5d3c633-566f-4908-8f10-92be2eb59634-nieaaaang-trong-suoaaaat-hi-align-laaa-giaa_-768x512.jpg&w=1920&q=75`}/>
          </div>
        </div>
      </div>
      <div className={`flex mx-36 gap-5`}>
        <div className={`flex w-1/3`}>
          <div className={`flex flex-col bg-white w-full h-auto rounded-2xl gap-3 my-4 `}>
            <div className={`flex justify-start mt-3 h-auto mx-10 w-3/4`}>
              <div className={`font-bold text-2xl text-blue-800`}>Giới thiệu</div>
            </div>
            <div className={`mx-10 w-3/4 mb-3`}>
              <div className={`text-lg whitespace-pre-line break-words`}>
                Nha khoa thẩm mỹ quốc tế Newgate là địa chỉ uy tín được nhiều khách hàng trao gửi niềm tin, mục tiêu mang đến nụ cười tự tin cho hàng triệu người Việt Nam. Trải qua 15 năm đi vào hoạt động, Newgate vẫn không ngừng nỗ lực để nâng cao chuyên môn và dịch vụ, khẳng định vị thế là một trong những phòng khám nha khoa uy tín hàng đầu tại thành phố Hồ Chí Minh nói riêng và cả nước nói chung.
              </div>
            </div>
          </div>
        </div>
        <div className={`flex w-2/3 mx-auto h-full`}>
          <div className={`w-full h-96`}>
            <div className={`flex flex-col bg-white w-full h-auto rounded-2xl gap-3 my-4 `}>
              <div className={`flex justify-start mt-3 h-auto mx-10 w-3/4 gap-3`}>
                <div className={`text-blue-400 text-2xl`}>Danh sách bác sĩ</div>
                <Box sx={{
                  width: 150,
                  height: 50,
                }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Chuyên khoa</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={0}
                      label="Chuyên khoa"
                      size="small"
                      onChange={(event) => {
                        setId(event.target.value);
                      }}
                    >
                      <MenuItem value={0}>Tất cả</MenuItem>
                      <MenuItem value={10}>Tai-Mũi-Họng</MenuItem>
                      <MenuItem value={20}>Thận-tiết niệu</MenuItem>
                      <MenuItem value={30}>Sản-nhi</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <hr className={`mx-5 mt-2 bg-gray-500`}/>
              <div className={`gap-2 mx-2 max-h-72 overflow-auto`}>
              {data?.doctors?.map((item) => {
                return (
                  <DoctorButton/>
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex mx-36 mt-12 gap-5 bg-white rounded-xl">
          <div className={`w-1/3 justify-start`}>
            <TotalReivew/>
          </div>
          <div className={`flex flex-col w-full`}>
            <p className={`w-full text-2xl font-sans`}>Đánh giá từ người dùng</p>
            <div>
              {[1, 2, 3, 4, 5].map((item) => (
                <ReviewCard key={item}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacilityDetail;