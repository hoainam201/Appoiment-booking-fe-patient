import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';

export default function ActionAreaCard(props) {
  return (
    <Card sx={{
      maxWidth: 150,
      maxHeight: 210,
      backgroundColor: '#2563eb',
      boxShadow: 'none',
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          weight="150"
          image="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F2b42e50c-ad0f-4dcb-a45f-8e3c16f1e093-luotdatkham.png&w=1920&q=75"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" color={`white`}>
            {props?.number}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props?.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
