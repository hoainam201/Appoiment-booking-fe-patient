import React from "react";
import Logo from "../assets/images/hospital.png";
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import {FacebookIcon, FacebookShareButton, XIcon, TwitterShareButton} from "react-share";



export default function FacilityInfo(props) {

  const url = process.env.REACT_APP_DOMAIN + "health-facilities/" + props?.id;

  return (
    <div className={`flex flex-col bg-white w-full h-auto rounded-2xl gap-3 my-4`}>
      <div className={`flex justify-center items-center`}>
        <img src={props.avatar || Logo} className={`w-40 h-40 object-cover`}/>
      </div>
      <div className={`mx-10 w-3/4`}>
        <div className={`font-bold text-3xl text-blue-400 whitespace-pre-line break-words`}>
          {props.name}
        </div>
        <hr className="my-2"/>
        <div className={`flex whitespace-pre-line break-words`}>
          <ShareLocationIcon color="primary"/>
          <span className="text-lg">{props.address}</span>
        </div>
        <div className="flex sm:justify-start justify-center gap-1 my-1">
          <FacebookShareButton url={`${url}`} hashtag={`HealthPro`}>
            <FacebookIcon size={32} round={true}/>
          </FacebookShareButton>
          <TwitterShareButton url={`${url}`} hashtag={`HealthPro`} title={props?.name}>
            <XIcon size={32} round={true}/>
          </TwitterShareButton>
        </div>
      </div>
    </div>
  )
}