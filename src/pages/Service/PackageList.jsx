import React, {useEffect, useState} from "react";
import PackageCard from "../../components/PackageCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import USER from "../../services/userService";
import {toast} from "react-toastify";
import Loading from "../../components/Loading";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {specialities} from "../../utils/constants";

export default function PackageList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [sort, setSort] = useState(0);


  const getPackage = async () => {
    try {
      const res = await USER.getPackages(pageNumber ? pageNumber : null);
      if (res.status === 200) {
        console.log(res.data);
        setPackages(res.data.packages.rows);
        setTotalPages(res.data.maxPage);
      } else {
        toast.dismiss();
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau")
    }
  }


  const handleSearch = async () => {
    try {
      const res = await USER.searchService(search.trim().replace(/\s+/g, ' '), 1, speciality, pageNumber, sort);
      if(res.status === 200) {
        setPackages(res.data.services);
        setTotalPages(res.data.maxPage)
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    handleSearch()
  }, [pageNumber]);

  return (
    <div>
      <div
        className={`justify-center items-center mx-20`}
      >
        <div className="flex flex-col lg:flex-row mx-auto gap-2 mb-4 w-full">
          <Input
            size="large"
            className="w-full rounded-full"
            placeholder="Search..."
            value={search}
            onChange={event => setSearch(event.target.value)}
            prefix={<SearchOutlined/>}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <div className="flex h-10 gap-2">
            <select
              defaultValue="0"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="rounded-full w-[120px] border-2 border-[#dcdcdc] hover:border-blue-700 text-center"
            >
              <option value="">Tất cả</option>
              {specialities.map((item) => {
                return <option key={item.id} value={item.id}>{item.name}</option>
              })}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full w-[150px] border-2 border-[#dcdcdc] hover:border-blue-700 text-center"
            >
              <option value="1">Mới nhất</option>
              <option value="2">Cũ nhất</option>
              <option value="3">Đánh giá tăng</option>
              <option value="4">Đánh giá giảm</option>
              <option value="5">Giá tăng dần</option>
              <option value="6">Giá giảm dần</option>
            </select>
            <button
              onClick={handleSearch}
              className="flex bg-blue-500 gap-1 items-center border-2 border-blue-500 hover:outline-1 hover:outline-white rounded-full w-[120px] text-center justify-center">
              <SearchOutlined className="text-white"/>
              <span className="text-white">Tìm kiếm</span>
            </button>
          </div>
        </div>
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