import React from "react";
import FacilityCard from "../../components/FacilityCard";
import {useEffect, useState} from "react";
import USER from "../../services/userService";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function HealthFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  const getFacilities = async () => {
    try{
      const res = await USER.getFacilities(pageNumber? pageNumber:null);
      setFacilities(res.data.healthFacility);
      console.log(facilities);
      setTotalPages(res.data.maxPage)
    }
    catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getFacilities();
  },[pageNumber]);

  return (
    <div>
      <div
        className={`justify-center items-center mx-20`}
      >
      <div
        className={`flex flex-wrap justify-start items-center w-full gap-5 p-3`}
      >
        {facilities.map((facility) => (
          <FacilityCard key={facility.id} {...facility} />
        ))}
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