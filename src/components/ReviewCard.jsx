import React from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const ReviewCard = () => {
  return (
    <div className="outline outline-1 outline-gray-200 rounded-md my-2">
      <div className="flex flex-col ml-3">
        <div className="flex gap-3 my-1">
          <div className="font-bold">Nguyen Van A</div>
          <Rating name="read-only" value={5} readOnly/>
          <div className="text-sm"> hh:mm dd/mm/yyyy</div>
        </div>
        <div>ABC</div>
        <hr/>
        <div className="flex my-1">
          <Button
            size="small"
          >
            <ThumbUpOffAltIcon/>
          </Button>
          <Button
            size="small"
          >
            <ThumbDownOffAltIcon color="error"/>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard;