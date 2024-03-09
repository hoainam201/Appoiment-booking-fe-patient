import React from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import {Box} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import LinearLoad from "./LinearLoad";

const items = [
  {
    value: 12,
    label: '1',
    percent: 5,
  },
  {
    value: 22,
    label: '2',
    percent: 10,
  },
  {
    value: 300,
    label: '3',
    percent: 15,
  },
  {
    value: 456,
    label: '4',
    percent: 25,
  },
  {
    value: 1000,
    label: '5',
    percent: 45,
  }
]

export default function TotalReivew() {

  return (
    <div className="flex flex-col outline outline-1 outline-gray-200 rounded-md">
      <div className="flex justify-center text-center text-xl">
        Tổng quan đánh giá
      </div>
      <div className="flex flex-col justify-center items-center">
        <Rating name="read-only" value={4.7} precision={0.1} readOnly/>
        <div>4.7/5 (123 đánh giá)</div>
      </div>
      <div>
        {items.map((item) => (
          <LinearLoad key={item} {...item}/>
        ))}
      </div>

    </div>
  )
}