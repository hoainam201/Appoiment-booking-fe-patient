import React from "react";
import DoctorInfo from "../../components/DoctorInfo";
import Button from "@mui/material/Button";
import Rating from '@mui/material/Rating';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReviewCard from "../../components/ReviewCard";
import TotalReivew from "../../components/TotalReivew";

export default function DoctorDetail() {

  return (
    <div>
      <DoctorInfo/>
      <div className="flex mx-36 mt-12 gap-5">
        <div className={`w-1/3 justify-start`}>
          <TotalReivew/>
        </div>
        <div className={`flex flex-col w-full`}>
          <p className={`w-full text-2xl`}>Đánh giá từ người dùng</p>
          <div>
            {[1, 2, 3, 4, 5].map((item) => (
              <ReviewCard key={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}