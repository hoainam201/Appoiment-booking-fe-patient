import React, {useEffect, useState} from "react";
import PackageCard from "../../components/PackageCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import USER from "../../services/userService";
import {toast} from "react-toastify";
import Loading from "../../components/Loading";

export default function PackageList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [packages, setPackages] = useState([]);


    const getPackage = async () => {
        try{
            const res = await USER.getPackages(pageNumber? pageNumber:null);
            if(res.status === 200) {
                console.log(res.data);
                setPackages(res.data.packages.rows);
                setTotalPages(res.data.maxPage);
            }
            else {
                toast.dismiss();
                toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
            }
        }
        catch (error) {
            toast.dismiss();
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
        }
    }


    useEffect(() => {
        getPackage();
    },[pageNumber]);

  return (
    <div>
      <div
        className={`justify-center items-center mx-20`}
      >
        {packages && packages.length > 0 ? <div
          className={`grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-center w-full gap-5`}
        >
          {
            packages.map((item) => (
              <PackageCard key={item.id} {...item} />
            ))
          }
        </div> : <div className="h-[60vh]">
          <Loading/>
        </div>}
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
  )
}