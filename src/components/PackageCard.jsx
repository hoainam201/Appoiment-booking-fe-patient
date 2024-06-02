import React from "react";
import logo from "../assets/images/healthpackage.png"
import Rating from "@mui/material/Rating";
import {useNavigate} from "react-router-dom";

export default function PackageCard( {...props}) {

    const navigate = useNavigate();

  return (
    <button className={`w-auto text-left h-64 bg-white rounded-2xl shadow-lg outline outline-1 outline-gray-300 my-2`}
            onClick={() => navigate(`/service/${props?.id}`)}>
      <div className={`w-full h-40`}>
        <img
          src={props?.image || logo}
          className={`object-cover w-full h-full rounded-t-2xl`}/>
      </div>
      <div className={`w-auto h-24 mx-2 flex justify-start`}>
        <div className={`h-full flex flex-col justify-end w-full`}>
          <div className={`font-bold max-h-1/2 overflow-hidden line-clamp-2`}>{props?.name}</div>
            <Rating
                    defaultValue={`4.5`}
                    precision={0.1} readOnly/>
          <div className={`flex justify-between`}>
            <div className={`justify-start items-center`}>Giá:</div>
            <div className={`justify-end items-center`}>{props?.fee} VND</div>
          </div>
        </div>
      </div>
    </button>
  )
}