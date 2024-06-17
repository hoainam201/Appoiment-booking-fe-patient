import React, {useState, useEffect} from "react";
import FacilityInfo from "../../components/FacilityInfo";
import ServiceButton from "../../components/ServiceButton";
import ReviewCard from "../../components/ReviewCard";
import {useParams} from "react-router-dom";
import USER from "../../services/userService";
import Viewer from "../../components/Editor/Viewer";
import LeafletMap from "../../components/Map/LeafletMap";
import {toast} from "react-toastify";
import Chip from "@mui/material/Chip";
import {serviceType} from "../../utils/constants";
import {Empty} from 'antd';
import UserService from "../../services/userService";
import Rating from "@mui/material/Rating";
import {useTranslation} from "react-i18next";

const FacilityDetail = () => {
  const [data, setData] = useState('');
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const facilityId = useParams();
  const [select, setSelect] = useState(0);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");
  const [totalReviews, setTotalReviews] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const {t} = useTranslation();
  const [searchResult, setSearchResult] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = token ? await UserService.getReviewFacilityByToken(facilityId.id, page) : await UserService.getReviewFacility(facilityId.id, page);
      if (res.status === 200) {
        console.log(res.data);
        setReviews(res.data.reviews);
        setTotalReviews(res.data.total);
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if(search.trim() !== '') {
      setSearchResult(services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase())));
      console.log(searchResult);
    } else {
      setSearchResult(services);
    }
  }, [search]);


  useEffect(() => {
    const getFacilityDetail = async () => {
      try {
        const res = await USER.getFacilityDetail(facilityId.id);
        if (res.status === 200) {
          console.log(res.data);
          setData(res.data);
          setLat(res.data.latitude);
          setLng(res.data.longitude);
          setServices(res.data.services);

        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    getFacilityDetail();
  }, [facilityId.id]);


  useEffect(() => {
    fetchReviews();
  }, [page]);


  return (
    <div className={`bg-[#e8f2f7] pb-5`}>
      <div className="grid lg:grid-cols-[33%,1fr] grid-cols-1 sm:mx-36 gap-5 mb-4">
        <div>
          <FacilityInfo {...data}/>
          <div className={`flex flex-col bg-white w-full h-96 rounded-xl gap-3 my-4 `}>
            <div className={`flex justify-start mt-3 h-auto mx-10 w-3/4`}>
              <div className={`font-bold text-2xl text-blue-800`}>{t('map')}</div>
            </div>
            {lat !== 0 ? <LeafletMap lat={lat} lng={lng}/> : <div className={`w-full h-96`}/>}
          </div>
        </div>
        <div>
          <div className={`w-full`}>
            <div
              className={`flex flex-col bg-white w-full h-full rounded-2xl gap-3 my-4 overflow-x-hidden wrapper`}>
              <div className={`flex justify-start mt-3 h-auto mx-10 w-3/4`}>
                <div className={`font-bold text-2xl text-blue-800`}>{t('introduction')}</div>
              </div>
              <div className={`mx-10 w-3/4 mb-3 h-96`}>
                <div className={`text-lg break-words`}>
                  <Viewer value={data.description}/>
                </div>
              </div>
            </div>
          </div>
          <div className={`w-full h-[500px]`}>
            <div className={`flex flex-col bg-white w-full h-full rounded-2xl gap-3 my-4 `}>
              <div className={`flex justify-start mt-3 h-auto sm:mx-10 w-3/4 gap-3`}>
                <div className={`text-blue-400 text-2xl`}>{t('list')}</div>
                <Chip
                  sx={{
                    width: '100px',
                    height: '35px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  label={t('navbar.doctor')}
                  onClick={() => setSelect(serviceType.DOCTOR)}
                  color={select === serviceType.DOCTOR ? 'primary' : 'default'}/>
                <Chip
                  sx={{
                    width: '100px',
                    height: '35px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  label={t('package')}
                  onClick={() => setSelect(serviceType.PACKAGE)}
                  color={select === serviceType.PACKAGE ? 'primary' : 'default'}/>
              </div>
              <div>
                <input
                  className={`border-2 border-gray-300 rounded-md w-[90%] h-10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 sm:mx-10 mx-1`}
                  placeholder={t('navbar.search')}
                  type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <hr className={`mx-5 mt-2 bg-gray-500`}/>
              <div className={`gap-2 mx-2 overflow-y-auto`}>
                {searchResult.length > 0 ? searchResult.map((item) => (
                    item.type === select && (
                      <ServiceButton
                        key={item.id}
                        {...item}
                        select={select}
                      />
                    ))) :
                  <Empty className="h-full"/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col lg:flex-row sm:mx-36 mt-5 gap-5 bg-white rounded-xl">
          <div className={`sm:w-1/3 justify-start w-full mx-2`}>
            <div className="flex flex-col outline outline-1 outline-gray-200 rounded-md">
              <div className="flex justify-center text-center text-xl">
                {t('reviewOverview')}
              </div>
              <div className="flex flex-col justify-center items-center">
                <Rating name="read-only" value={Math.ceil(data?.avg_rating * 10) / 10} precision={0.1} readOnly/>
                <div>{Math.ceil(data?.avg_rating * 10) / 10}/5 ({totalReviews} {t('review')})</div>
              </div>
              <div>
                {/*{items.map((item) => (*/}
                {/*  <LinearLoad key={item} {...item}/>*/}
                {/*))}*/}
              </div>

            </div>
          </div>
          <div className={`flex flex-col w-full`}>
            <p className={`w-full text-2xl font-sans`}>{t('userReviews')}</p>
            <div>
              {reviews && reviews.length > 0 ?
                reviews.map((review) => (
                  <ReviewCard review={review}/>
                ))
                : <div><Empty/></div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacilityDetail;