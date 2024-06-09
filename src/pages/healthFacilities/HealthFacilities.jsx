import React from "react";
import FacilityCard from "../../components/FacilityCard";
import {useEffect, useState} from "react";
import USER from "../../services/userService";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loading from "../../components/Loading";
import {useSearch} from "../../context/SearchContext";
import {SearchOutlined} from "@ant-design/icons";
import {Input, Select} from "antd";
import {specialities} from "../../utils/constants";
const { Option } = Select;

export default function HealthFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const {searchQuery, searchResults, address, speciality, updateSearchQuery, updateSearchResults, updateAddress, updateSpeciality} = useSearch();

  const province = (
    <Select defaultValue="" onChange={(value) => updateAddress(value)}>
      <Option value="">Tất cả</Option>
      <Option value="Hà Nội">Hà Nội</Option>
      <Option value="Đà Nẵng">Đà Nẵng</Option>
    </Select>
  )

  const getFacilities = async () => {
    try {
      const res = await USER.getFacilities(pageNumber ? pageNumber : null);
      setFacilities(res.data.healthFacility);
      setTotalPages(res.data.maxPage)
    } catch (error) {
      console.error(error);
    }
  }

  const searchFacilities = async () => {
    try {
      console.log(searchQuery, address, speciality);
      const res = await USER.searchFacility(searchQuery.trim().replace(/\s+/g, ' '), pageNumber, address, speciality);
      if(res.status === 200) {
        setFacilities(res.data.healthFacility);
        setTotalPages(res.data.maxPage)
      }
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    searchFacilities();
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
            value={searchQuery}
            onChange={event => updateSearchQuery(event.target.value)}
            prefix={<SearchOutlined/>}
            onPressEnter={searchFacilities}
          />
          <div className="flex h-10 gap-2">
            <select
              value={address}
              onChange={(e) => updateAddress(e.target.value)}
              className="rounded-full w-[120px] border-2 border-[#dcdcdc] hover:border-blue-700 text-center"
            >
              <option value="">Tất cả</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>

            <select
              defaultValue="0"
              value={speciality}
              onChange={(e) => updateSpeciality(e.target.value)}
              className="rounded-full w-[120px] border-2 border-[#dcdcdc] hover:border-blue-700 text-center"
            >
              <option value="">Tất cả</option>
              {specialities.map((item) => {
                return <option key={item.id} value={item.id}>{item.name}</option>
              })}
            </select>
            <button
              onClick={searchFacilities}
              className="flex bg-blue-500 gap-1 items-center border-2 border-blue-500 hover:outline-1 hover:outline-white rounded-full w-[120px] text-center justify-center">
              <SearchOutlined className="text-white"/>
              <span className="text-white">Tìm kiếm</span>
            </button>
          </div>
        </div>
        <div
          className={`grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 w-full`}
        >
          {facilities && facilities.length > 0 ? (
            facilities.map((facility) => (
              <FacilityCard key={facility.id} {...facility} />
            ))
          ) : null}
        </div>
        {!facilities || facilities.length === 0 ? (
          <div className="h-[60vh]">
            <Loading/>
          </div>
        ) : null}
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