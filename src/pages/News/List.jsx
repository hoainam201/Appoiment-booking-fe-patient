import FacilityCard from "../../components/FacilityCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React, {useEffect, useState} from "react";
import {Empty} from "antd";
import Loading from "../../components/Loading";
import NewsButton from "../../components/NewsButton/NewsButton";
import UserService from "../../services/userService";

const NewsList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchNews = async () => {
    try {
      const res = await UserService.getAllNews(page);
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data.news);
        setTotalPages(res.data.maxPage);
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchNews();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div>
      <div
        className={`justify-center items-center mx-2 sm:mx-20`}
      >
        <div
          className={`grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 w-full `}
        >
          {data && data.length > 0 && (
            data.map((news) => (
              <NewsButton key={news.id} name={news.title} image={news.banner} id={news.id} subject={news.created_at}/>
            ))
          )}
        </div>
        {data.length === 0 && <div className="h-[60vh]">
          <Loading/>
        </div>}
        {totalPages > 1 ? (
          <div className={'flex justify-center items-center mx-auto'}>
            <Stack spacing={5}>
              <Pagination
                count={totalPages}
                variant={`outlined`}
                onChange={(event, value) => {
                  setPage(value);
                }}
              />
            </Stack>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default NewsList;