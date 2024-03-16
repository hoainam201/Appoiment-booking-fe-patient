import React from "react";
import logo from "../assets/images/healthpackage.png"

export default function PackageCard() {

  return (
    <button className={`w-72 text-left h-80 bg-white rounded-2xl shadow-lg outline outline-1 outline-gray-300 my-2`}>
      <div className={`w-full h-1/2`}>
        <img
          src={logo}
          className={`object-cover w-full h-full rounded-t-2xl`}/>
      </div>
      <div className={`w-auto h-1/2 mx-2 flex justify-start`}>
        <div className={`h-full flex flex-col justify-evenly w-full`}>
          <div className={`font-bold max-h-1/2 overflow-hidden line-clamp-2`}>Gói khám sức khỏe tổng quát cơ bản cho nữ (PKYD1F)</div>
          <div className={`flex text-nowrap overflow-hidden`}>
             Bệnhviên aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>
          <div className={`flex justify-between`}>
            <div className={`justify-start items-center`}>Giá:</div>
            <div className={`justify-end items-center`}>3.000.000 VND</div>
          </div>
        </div>
      </div>
    </button>
  )
}