import React from "react";
import DoctorCard from "../../components/DoctorCard";
import {useEffect, useState} from "react";
import USER from "../../services/userService";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import doctor from "../../assets/images/doctor.png";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading";


export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();


  const getDoctors = async () => {
    try{
      const res = await USER.getDoctors(pageNumber? pageNumber:null);
      setDoctors(res.data.doctor);
      setTotalPages(res.data.maxPage);
    }
    catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getDoctors();
  },[pageNumber]);

  return (
    <div>
      <div
        className={`justify-center items-center mx-20`}
      >
        <div
          className={`grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-center w-full gap-5`}
        >
          {doctors ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))
          ): (
            <div className="h-[60vh]">
              <Loading/>
            </div>
          )}
        </div>
        {totalPages > 1 ? (
          <div className={'flex justify-center items-center mx-auto'}>
            <Stack spacing={5}>
              <Pagination
                count={totalPages}
                variant={`outlined`}
                onChange={(event, value) => {
                  console.log(value);
                  setPageNumber(value);
                }}
              />
            </Stack>
          </div>
        ) : null}
      </div>
    </div>
  );
}