import React from "react";
import Logo from "../assets/images/hospital.png";
import {Button} from "@mui/material";

const stringWithNewLine = "Bệnh Viện Đại Học Y Dược Thành phố Hồ Chí Minh - Cơ Sở 2 không chỉ là nơi cung cấp dịch vụ y tế, mà còn là biểu tượng của sự phát triển và chăm sóc sức khỏe cho cộng đồng. Với sứ mệnh \"Y Tế Cho Sự Sống\", cơ sở này tiếp tục nỗ lực để đem lại niềm tin và sức khỏe cho mọi người.";

export default function FacilityInfo(props) {

  return (
    <div className={`flex flex-col bg-white w-full h-auto rounded-2xl gap-3 my-4 `}>
      <div className={`flex justify-center items-center`}>
        <img src={props.avatar || Logo} className={`w-40 h-40 object-fill`}/>
      </div>
      <div className={`mx-10 w-3/4`}>
        <div className={`font-bold text-3xl whitespace-pre-line break-words`}>
          {props.name}
        </div>
        <hr className="my-2"/>
        <div className={`text-lg whitespace-pre-line break-words`}>
          {props.address}
        </div>
      </div>
    </div>
  )
}