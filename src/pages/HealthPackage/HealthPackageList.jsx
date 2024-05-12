import React, {useState} from "react";
import PackageCard from "../../components/PackageCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

export default function HealthPackageList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(23);

  return (
    <div>
      <div
        className={`justify-center items-center mx-32`}
      >
        <div
          className={`flex flex-wrap justify-start items-center w-full gap-5 p-3`}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <PackageCard key={item} />
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
  )
}