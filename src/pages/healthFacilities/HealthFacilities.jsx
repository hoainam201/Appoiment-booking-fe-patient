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
import {specialities, specialitiesKey} from "../../utils/constants";
import {useTranslation} from "react-i18next";

const {Option} = Select;

export default function HealthFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const {
    searchQuery,
    searchResults,
    address,
    speciality,
    updateSearchQuery,
    updateSearchResults,
    updateAddress,
    updateSpeciality
  } = useSearch();
  const {t} = useTranslation();


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
      // console.log(searchQuery, address, speciality);
      const res = await USER.searchFacility(searchQuery.trim().replace(/\s+/g, ' '), pageNumber, address, speciality);
      if (res.status === 200) {
        console.log(res.data , pageNumber);
        setFacilities(res.data.healthFacility);
        setTotalPages(res.data.maxPage)
      }
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    searchFacilities();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pageNumber]);

  return (
    <div>
      <div
        className={`justify-center items-center mx-2 sm:mx-20`}
      >
        <div className="flex flex-col lg:flex-row mx-auto gap-2 mb-4 w-full">
          <Input
            size="large"
            className="w-full rounded-full"
            placeholder="Search..."
            value={searchQuery}
            onChange={event => updateSearchQuery(event.target.value)}
            prefix={<SearchOutlined/>}
            onPressEnter={()=>{
              setPageNumber(1);
              searchFacilities();
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
          />
          <div className="flex h-10 gap-2">
            <select
              value={address}
              onChange={(e) => updateAddress(e.target.value)}
              className="rounded-full w-[120px] border-2 border-[#dcdcdc] hover:border-blue-700 text-center"
            >
              <option value="">{t('national')}</option>
              <option value="Hà Nội">{t('hanoi')}</option>
              <option value="Đà Nẵng">{t('danang')}</option>
              <option value="Hồ Chí Minh">{t('hochiminh')}</option>
            </select>

            <select
              defaultValue="0"
              value={speciality}
              onChange={(e) => updateSpeciality(e.target.value)}
              className="rounded-full w-[120px] border-2 border-[#dcdcdc] hover:border-blue-700 text-center"
            >
              <option value="">{t('All')}</option>
              {specialitiesKey.map((item) => {
                return <option key={item.id} value={item.id}>{t(`${item.key}`)}</option>
              })}
            </select>
            <button
              onClick={() => {
                setPageNumber(1);
                searchFacilities();
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              className="flex bg-blue-500 gap-1 items-center border-2 border-blue-500 hover:outline-1 hover:outline-white rounded-full w-[120px] text-center justify-center">
              <SearchOutlined className="text-white"/>
              <span className="text-white">{t('navbar.search')}</span>
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
          <div className={'flex justify-center items-center mx-auto my-1'}>
            <Stack spacing={5}>
              <Pagination
                count={totalPages}
                variant={`outlined`}
                onChange={(event, value) => {
                  // console.log(value);
                  setPageNumber(value);
                }}
                page={pageNumber}
              />
            </Stack>
          </div>
        ) : null}
      </div>
    </div>
  );
}