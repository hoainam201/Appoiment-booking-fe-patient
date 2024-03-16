import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import hospital from '../assets/images/hospital.png';
import {useNavigate} from "react-router-dom";

export default function ImgMediaCard(props) {
  const navigate = useNavigate();
  return (
    <Card sx={{
      width: 300,
    }}
    >
      <img src={props.avatar ? props.avatar : hospital}
           className={`w-40 h-40 mx-auto rounded-full`}/>
      <CardContent>
        <Typography gutterBottom variant="h5"
                    sx={{
                      fontWeight: 'flower',
                      whiteSpace: 'nowrap',
                    }}>
          {props.name}
        </Typography>
        <Rating name="half-rating-read"
                defaultValue={(props.service_rate_average + props.qualification_rate_average + props.facility_rate_average) / 3}
                precision={0.1} readOnly/>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant={`contained`}
          onClick={() => {
            navigate('/health-facilities/' + props.id);
          }}
        >Chi tiết</Button>
      </CardActions>
    </Card>
  );
}