import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import hospital from '../assets/images/hospital.png';
import {useNavigate} from "react-router-dom";
import AddLocationIcon from "@mui/icons-material/AddLocation";

export default function FacilityCard(props) {
  const navigate = useNavigate();
  return (
    <button
      className="border-2 border-gray-300 p-1 rounded-lg cursor-pointer w-full hover:border-blue-500"
      onClick={() => {
        navigate('/health-facilities/' + props.id);
      }}
    >
      <img src={props.avatar ? props.avatar : hospital}
           className={`w-40 h-40 mx-auto object-cover`}/>
      <div>
        <p className="text-xl text-blue-500 font-bold">
          {props.name}
        </p>
        <div className={``}>
          <p className="text-sm text-gray-500">{props.address}</p>
        </div>
        <Rating name="half-rating-read"
                defaultValue={props.avg_rating}
                precision={0.1} readOnly/>
      </div>
    </button>
  );
}