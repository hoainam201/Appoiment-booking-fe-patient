import React from "react";
import {Button} from "@mui/material";
import Logo from "../assets/images/img2.png";

const stringWithNewLine = "Dòng 1\nDòng 2\nDòng 3";

const DoctorInfo = () => {

  return(
    <div className={`flex mx-36 mt-5 h-auto`}>
      <img src={Logo
      } className={`w-40 h-40 object-fill`}/>
      <div className={`ml-10 w-1/2`}>
        <div className={`font-bold text-3xl`}>Doctor Name</div>
        <div className={`text-sm whitespace-pre-line break-words`}>
          {stringWithNewLine}
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
  )
};

export default DoctorInfo;