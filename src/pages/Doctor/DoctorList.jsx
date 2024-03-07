import React from "react";
import DoctorCard from "../../components/DoctorCard";
import {useEffect, useState} from "react";
import USER from "../../services/userService";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const getDoctors = async () => {
    try{
      const res = await USER.getDoctors(pageNumber? pageNumber:null);
      setDoctors(res.data.doctor);
      setTotalPages(res.data.maxPage)
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
          className={`flex flex-wrap justify-start items-center w-full gap-5 p-3`}
        >
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} {...doctor} />
          ))}
        </div>
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
      </div>
    </div>
  );
}