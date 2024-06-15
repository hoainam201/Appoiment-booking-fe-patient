import Viewer from "../../components/Editor/Viewer";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import USER from "../../services/userService";
import NewsButton from "../../components/NewsButton/NewsButton";
import {FormattedDate} from "react-intl";
import Loading from "../../components/Loading";
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";
import {useTranslation} from "react-i18next";

const Details = () => {
  const id = useParams();
  const [data, setData] = useState(null);
  const [orther, setOrther] = useState([]);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const res = await USER.getNewsDetail(id.id);
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data);
        setOrther(res.data.orther);
      } else {
        console.log(res)
      }
    }
    fetchData();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [id.id]);


  return (
    <div>
      {data ? <div className={`grid lg:grid-cols-[66%,1fr] grid-cols-1 overflow-auto sm:mx-20 gap-2`}>
        <div className="w-full flex flex-col">
          <div className={`text-6xl hover:text-blue-500`}>{data?.title}</div>
          <div className="flex justify-start gap-2">
            <FacebookShareButton url={`https://www.facebook.com/sharer/sharer.php?u=${data?.url}`}>
              <FacebookIcon size={32} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton url={`https://twitter.com/intent/tweet?text=${data?.title} ${data?.url}`}>
              <TwitterIcon size={32} round={true}/>
            </TwitterShareButton>
          </div>
          <Viewer value={data?.content}/>
          <div className="flex justify-end"><p className="italic hover:underline hover:text-blue-500">{data.author}</p>
          </div>
          <div className="flex justify-end">
            <FormattedDate value={data?.created_at} year="numeric" month="long" day="numeric"/>
          </div>
        </div>
        <div>
          {orther.length > 0 && <h3 className={`lg:mt-20 font-bold text-xl`}>{t('otherNews')}</h3>}
          {orther.length > 0 && orther.map((news) => {
            return <NewsButton key={news.id} name={news.title} image={news.banner} id={news.id}/>
          })}
        </div>
      </div> : <Loading/>}
    </div>
  )
}

export default Details;