import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import hospital from '../assets/images/hospital.png';

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <img src={hospital}
      className={`w-1/2 h-auto mx-auto`}/>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Bệnh viện mắt Hà Nội
        </Typography>
        <Rating name="half-rating-read" defaultValue={2.5} precision={0.1} readOnly />
      </CardContent>
      <CardActions>
        <Button size="small" variant={`contained`}>Đặt khám</Button>
        <Button size="small">Chi tiết</Button>
      </CardActions>
    </Card>
  );
}