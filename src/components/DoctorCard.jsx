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
    <Card sx={{
      width: 300,
    }}
    >
      <img src={props.avatar ? props.avatar : doctor}
           className={`w-40 h-40 mx-auto  object-fill`}/>
      <CardContent>
        <Typography gutterBottom variant="h5"
                    sx={{
                      fontWeight: 'flower',
                      whiteSpace: 'nowrap',
                    }}>
          {props.name}
        </Typography>
        <Rating name="half-rating-read"
                defaultValue={props.rating}
                precision={0.1} readOnly/>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant={`contained`}
        >Đặt khám</Button>
        <Button
          size="small"
          onClick={() => {
            navigate('/doctor/' + props.id);
          }}
        >Chi tiết</Button>
      </CardActions>
    </Card>
  );
}