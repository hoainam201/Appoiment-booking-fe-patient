import React, {useState} from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {FormattedDate} from "react-intl";
import USER from "../services/userService";

const ReviewCard = (props) => {
  const token = localStorage.getItem('token');

  const [isFavourited, setIsFavourited] = useState(props.review?.is_favourited);
  const [favouritesCount, setFavouritesCount] = useState(props.review?.favourites_count);

  const handleFavourite = async () => {
    try {
      const res = await USER.favourite(props.review?.id);
      if (res.status === 201) {
        setIsFavourited(true);
        setFavouritesCount(parseInt(favouritesCount) + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleUnFavourite = async () => {
    try {
      const res = await USER.unFavourite(props.review?.id);
      if (res.status === 200) {
        setIsFavourited(false);
        setFavouritesCount(parseInt(favouritesCount) - 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="outline outline-1 outline-gray-200 rounded-md my-2 hover:outline-2 hover:outline-gray-300 hover:shadow">
      <div className="flex flex-col ml-3">
        <div className="flex sm:flex-row flex-col gap-3 my-1">
          <div className="flex gap-2">
            <div className="font-bold">{props.review?.name}</div>
            <Rating name="read-only" value={props.review?.rating} readOnly/>
          </div>
          <div className="text-sm">
            <FormattedDate
              value={props.review?.created_at}
              year="numeric"
              month="long"
              day="numeric"
              hour="numeric"
              minute="numeric"
            />
          </div>
        </div>
        {props.review?.comment && (
          <div>
            <hr />
            <p className="my-1 text-lg break-words">{props.review?.comment}{props.review?.comment}</p>
            <hr />
            <div className="flex">
              {isFavourited ? (
                <Button
                  {...(token ? {} : { disabled: true })}
                  onClick={handleUnFavourite}
                  size="small"
                >
                  <FavoriteIcon /><p>{favouritesCount}</p>
                </Button>
              ) : (
                <Button
                  {...(token ? {} : { disabled: true })}
                  size="small"
                  onClick={handleFavourite}
                >
                  <FavoriteBorderIcon /><p>{favouritesCount}</p>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
