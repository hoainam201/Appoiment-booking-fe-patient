import React from "react";
import Logo from "../assets/images/img2.png";

const DoctorButton = () => {

  return (
    <div
      // className={`w-full h-full`}
    >
      <button className={`w-full h-full outline outline-1 rounded-xl hover:outline-2 outline-blue-100 my-0.5`}>
        <div className={`flex gap-5 mx-5`}>
          <div className={`flex justify-center items-center`}>
            <img src={Logo} className={`w-8 h-8 object-cover rounded-full`}/>
          </div>
          <div className={`flex flex-col`}>
            <div className={`font-bold text-2xl whitespace-pre-line break-words text-green-500`}>BS NGuyen A</div>
            <div className={`text-sm`}>Giá khám: 200000VND</div>
          </div>
        </div>
      </button>
    </div>
  )
}

export default DoctorButton;