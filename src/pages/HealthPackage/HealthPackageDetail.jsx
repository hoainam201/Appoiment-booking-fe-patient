import React from "react";
import Logo from "../../assets/images/healthpackage.png";
import {Button} from "@mui/material";
import TotalReivew from "../../components/TotalReivew";
import ReviewCard from "../../components/ReviewCard";

export default function HealthPackageDetail() {

  return (
    <div>
      <div className={`flex mx-36 mt-5 h-auto`}>
        <img src={Logo
        } className={`w-40 h-40 object-fill`}/>
        <div className={`ml-10 w-1/2`}>
          <div className={`font-bold text-3xl`}>Doctor Name</div>
          <div className={`text-sm whitespace-pre-line break-words`}>
            <li>Địa chỉ khám</li>
            <li>Bệnh viên A</li>
            <li>Địa chỉ</li>
            <li>Giá khám: 300.000VND </li>
            <li>Giá khám: 300.000VND </li>
            <li>Giá khám: 300.000VND </li>
            <li>Giá khám: 300.000VND </li>
            <li>Giá khám: 300.000VND </li>
            <li>Giá khám: 300.000VND </li>
          </div>
          <div className={`mt-5 mt-5`}>
            <Button variant={`contained`}>Đặt khám</Button>
          </div>
        </div>
        <div className={`ml-10`}>
          <div className={`text-xl`}>Địa chỉ khám</div>
          <div className={`text-xl`}>Bệnh viện A</div>
          <div className={`text-sm`}>Địa chỉ</div>
          <div className={`text-sm`}>Giá khám: 300.000VND </div>
        </div>
      </div>
      <div className="flex mx-36 mt-12 gap-5">
        <div className={`w-1/3 justify-start`}>
          <TotalReivew/>
        </div>
        <div className={`flex flex-col w-full`}>
          <p className={`w-full text-2xl`}>Đánh giá từ người dùng</p>
          <div>
            {[1, 2, 3, 4, 5].map((item) => (
              <ReviewCard/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}