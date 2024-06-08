import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import doctor from '../assets/images/doctor.png';
import {useNavigate} from "react-router-dom";

export default function ImgMediaCard(props) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate('/service/' + props.id);
      }}
      className="border-2 border-white shadow-md p-1 rounded-lg cursor-pointer w-full hover:border-blue-500"
    >
      <img src={props.image ? props.image : doctor}
           className={`w-40 h-40 mx-auto object-center rounded-full`}/>
      <div>
        <p className="text-xl text-blue-500 font-bold">
          {props.name}
        </p>
        <Rating name="half-rating-read"
                defaultValue={props.avg_rating}
                precision={0.1} readOnly/>
        <div className={`flex justify-center`}>
          <div className={`justify-start items-center`}>Giá:</div>
          <div className={`justify-end items-center`}>{props?.fee} VND</div>
        </div>
      </div>
    </button>
  );
}