import React from "react";
import Logo from "../assets/images/img2.png";
import {useNavigate} from "react-router-dom";

const ServiceButton = (props) => {
  const navigate = useNavigate();
  return (
    <div
      // className={`w-full h-full`}
    >
      <button className={`w-full h-full outline outline-1 rounded-xl hover:outline-2 outline-blue-100 my-0.5`}
              onClick={() => navigate(`/service/${props.id}`)}
      >
        <div className={`flex gap-5 mx-5`}>
          <div className={`flex justify-center items-center`}>
            <img src={props.image || Logo} className={`w-8 h-8 object-cover rounded-full`}/>
          </div>
          <div className={`flex flex-col w-full`}>
            <div className={`font-bold text-2xl text-green-500 text-start break-words`}>{props.name.trim()}</div>
            <div className={`text-sm text-start break-words`}>Giá khám: {props.fee}VND</div>
          </div>
        </div>
      </button>
    </div>
  )
}

export default ServiceButton;