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
import {Empty, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {specialitiesKey} from "../../utils/constants";
import {useTranslation} from "react-i18next";


export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [sort, setSort] = useState(0);
  const navigate = useNavigate();
  const {t} = useTranslation();


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

  const handleSearch = async () => {
    try {
      const res = await USER.searchService(search.trim().replace(/\s+/g, ' '), 0, speciality, pageNumber, sort);
      if(res.status === 200) {
        setDoctors(res.data.services);
        setTotalPages(res.data.maxPage)
      }
    }
    catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    handleSearch();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[pageNumber]);

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
            value={search}
            onChange={event => setSearch(event.target.value)}
            prefix={<SearchOutlined/>}
            onPressEnter={()=>{
              setPageNumber(1);
              handleSearch();
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
          />
          <div className="flex h-10 gap-2">
            <select
              defaultValue="0"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="rounded-full w-[120px] border-2 border-[#dcdcdc] hover:border-blue-700 text-center"
            >
              <option value="">{t('All')}</option>
              {specialitiesKey.map((item) => {
                return <option key={item.id} value={item.id}>{t(`${item.key}`)}</option>
              })}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full w-[150px] border-2 border-[#dcdcdc] hover:border-blue-700 text-center"
            >
              <option value="1">{t('latest')}</option>
              <option value="2">{t('oldest')}</option>
              <option value="3">{t('ratingAsc')}</option>
              <option value="4">{t('ratingDesc')}</option>
              <option value="5">{t('priceAsc')}</option>
              <option value="6">{t('priceDesc')}</option>
            </select>
            <button
              onClick={() => {
                setPageNumber(1);
                handleSearch();
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
        {doctors ? (
          doctors.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-center w-full gap-5">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  {...doctor}
                />
              ))}
            </div>
          ) : (
            <div className="h-[60vh]">
              <Empty />
            </div>
          )
        ) : (
          <div className="h-[60vh]">
            <Loading />
          </div>
        )}

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