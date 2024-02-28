import * as React from 'react';
import { Box, ThemeProvider, Button } from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function BoxSx(props) {
  const navigate = useNavigate();
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
    >
      <Box
        sx={{
          width: 160,
          height: 160,
          borderRadius: 1,
          outline: '1px solid #007FFF',
          '&:hover': {
            outline: '2px solid #007FFF',
          },
        }}
      >
        <button
          className={`w-full h-full flex flex-col justify-center items-center text-center`}
          onClick={() => navigate(props.linkTo)}
        >
          <img src={`${props.image}`}/>
          <div className={`pt-0.5`}>
            {props.name}
          </div>
        </button>
      </Box>
    </ThemeProvider>
  );
}

