import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Input} from "antd";
import {SearchOutlined, MenuOutlined} from "@ant-design/icons";
import BoxSx from "../../components/Box";
import "./home.css";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.png";
import img5 from "../../assets/images/img5.png";
import {useSearch} from "../../context/SearchContext";
import {useTranslation} from "react-i18next";
import Flickity from 'react-flickity-component'
import UserService from "../../services/userService";
import NewsImage from "../../assets/images/news.png";
import hospital from "../../assets/images/hospital.png";
import DoctorImage from "../../assets/images/doctor.png"
import PackgeImage from "../../assets/images/healthpackage.png"
import {specialitiesKey} from "../../utils/constants";


const Home = () => {
  const navigate = useNavigate();
  const [contentPlaceholder, setContentPlaceholder] = useState('');
  const [isShowMenu, setIsShowMenu] = useState(true);
  const {updateSearchQuery} = useSearch();
  const {t} = useTranslation();
  const [topHealthFacilities, setTopHealthFacilities] = useState([]);
  const token = localStorage.getItem("token");

  const [topDoctors, setTopDoctors] = useState([]);
  const [packages, setPackages] = useState([]);
  const [news, setNews] = useState([]);

  const flickityOptions = {
    initialIndex: 2
  }

  const fetchTopHealthFacilities = async () => {
    try {
      const res = await UserService.getTopHealthFacilities();
      if (res.status === 200) {
        setTopHealthFacilities(res.data);
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error);
    }
  }


  const fetchTopDoctors = async () => {
    try {
      const res = await UserService.getTopDoctors();
      if (res.status === 200) {
        setTopDoctors(res.data);
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error);
    }
  }


  const fetchPackages = async () => {
    try {
      let res = token ? await UserService.getTopServices() : await UserService.getTopServices();
      if (res.status === 200) {
        setPackages(res.data);
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error);
    }
  }


  const fetchNews = async () => {
    try {
      let res = await UserService.getLatestNews();
      if (res.status === 200) {
        setNews(res.data);
      } else {
        console.log(res)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTopHealthFacilities();
    fetchTopDoctors();
    fetchPackages();
    fetchNews();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsShowMenu(window.innerWidth > 768);
    };

    // Thiết lập giá trị mặc định dựa trên kích thước màn hình ban đầu
    handleResize();

    // Thêm sự kiện lắng nghe khi kích thước màn hình thay đổi
    window.addEventListener('resize', handleResize);

    // Cleanup để tránh memory leaks
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onSearch = () => {
    if (contentPlaceholder.trim() === '') {
      return;
    }
    updateSearchQuery(contentPlaceholder);
    navigate("/health-facilities");
  };

  const items = [
    {
      id: 1,
      name: t('navbar.health_facilities'),
      image: img1,
      linkTo: "/health-facilities",
    },
    {
      id: 2,
      name: t('navbar.doctor'),
      image: img2,
      linkTo: "/doctor",
    },
    {
      id: 3,
      name: t('navbar.health_package'),
      image: img3,
      linkTo: "/health-package",
    },
    // {
    //   id: 4,
    //   name: "Dịch vụ y tế",
    //   image: img4,
    //   linkTo: "/",
    // },
    {
      id: 5,
      name: t('navbar.news'),
      image: img5,
      linkTo: "/news",
    }
  ]

  const info = [
    {
      id: 1,
      name: "Lượt khám",
      image: img1,
      number: "200000+",
    },
    {
      id: 2,
      name: "Người dùng",
      image: img2,
      number: "20000+",
    },
    {
      id: 3,
      name: "Bác sĩ",
      image: img3,
      number: "200000+",
    },
    {
      id: 4,
      name: "Cơ sở y tế",
      image: img4,
      number: "200000+",
    },
    {
      id: 5,
      name: "Lượt truy cập",
      image: img5,
      number: "200000+",
    },
    {
      id: 6,
      name: "Dịch vụ khám",
      image: img1,
      number: "200+",
    }
  ]

  return (
    <div className={`relative w-full`}>
      <div className={`flex flex-col justify-center items-center bg-white`}>
        <div
          className={`home bg-cover bg-center w-full bg-no-repeat my-2`}
        >
          <div className={`flex items-center flex-col mt-20`}>
            <div className={`text-blue-400 sm:text-2xl text-xl font-sans mx-1`}>
              {t('homeTitle')}
            </div>
            <div className={`text-black sm:text-5xl font-sans mx-1 text-2xl `}>
              {t('homeSubTitle')}
            </div>
            <div className="flex justify-center w-full lg:w-2/3 px-4 sm:px-28 py-6">
              <Input
                size="large"
                className="w-full
                rounded-full"
                placeholder={t('navbar.search')}
                prefix={<SearchOutlined/>}
                onChange={(e) => {
                  setContentPlaceholder(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    onSearch();
                  }
                }}
              />
            </div>
            <div className={`text-black text-xl`}>
            </div>
            <div className={`expand`}>
              <button
                onClick={() => {
                  setIsShowMenu(!isShowMenu);
                }}
              ><MenuOutlined></MenuOutlined></button>
            </div>
            <div className={`nam gap-8 pt-4`}>
              {isShowMenu ? (
                items.map((item) => (
                  <BoxSx key={item.id} name={item.name} image={item.image} linkTo={item.linkTo}/>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {topHealthFacilities.length > 0 &&
          <div>
            <div className="sm:text-3xl text-xl font-bold text-blue-400 mx-auto my-4 text-center">
              {t('featuredHospitals')}
            </div>
            <div className="overflow-y-hidden my-2 mx-auto w-[90%]">
              <Flickity
                className={'carousel'} // default ''
                elementType={'div'} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={true} // default false
                reloadOnUpdate // default false
                static // default false
              >
                {
                  topHealthFacilities.map((item) =>
                    <button
                      className="h-72 justify-between flex-col flex w-80 border-2 border-gray-200 shadow-md p-1 rounded-lg cursor-pointer hover:border-blue-500 mx-1"
                      onClick={() => {
                        navigate('/health-facilities/' + item.id);
                      }}
                    >
                        <img src={item.avatar ? item.avatar : hospital}
                             className={`w-40 h-40 mx-auto object-cover`}/>
                      <div>
                        <p className="text-xl text-blue-500 font-bold">
                        {item.name}
                        </p>
                        <div className={`items-end`}>
                          <p className="text-sm text-gray-500">{item.address}</p>
                        </div>
                      </div>
                    </button>
                  )
                }
              </Flickity>
            </div>
          </div>}
        {
          news.length > 0 && topDoctors.length > 0 && packages.length > 0 &&
          <div className="flex justify-center sm:w-[90%] sm:mx-auto w-full mx-1">
            <div className="grid sm:grid-cols-[66%,1fr] grid-cols-1 gap-1 my-2 sm:mx-4 w-full">
              <div>
                <div>
                  <p className="font-sans sm:text-3xl text-xl uppercase mt-3">{t('doctorsForYou')}</p>
                  <hr/>
                  <div className="grid grid-cols-1 gap-3">
                    {
                      topDoctors.map((item) =>
                        <button>
                          <div
                            className="flex gap-1 h-36 sm:w-[90%] w-full cursor-pointer"
                            onClick={() => {
                              navigate('/service/' + item.id);
                            }}
                          >
                            <img src={item.image || DoctorImage} className={`w-36 h-36 object-cover`}/>
                            <div className='flex flex-col w-full justify-start items-start my-auto'>
                              <p className="sm:text-2xl text-xl text-blue-500 font-bold">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">{t(`${specialitiesKey[item.speciality].key}`)}</p>

                            </div>
                          </div>
                          <hr/>
                        </button>
                      )
                    }
                  </div>
                </div>
                <div>
                  <p className="font-sans sm:text-3xl text-xl uppercase mt-3">{t('packagesForYou')}</p>
                  <hr/>
                  <div className="grid grid-cols-1 gap-3">
                    {
                      packages.map((item) =>
                        <button>
                          <div
                            className="flex gap-1 h-36 sm:w-[90%] w-full cursor-pointer"
                            onClick={() => {
                              navigate('/service/' + item.id);
                            }}
                          >
                            <img src={item.image || PackgeImage} className={`w-36 h-36 object-cover`}/>
                            <div className='flex flex-col w-full justify-start items-start my-auto'>
                              <p className="sm:text-2xl text-xl text-blue-500 font-bold">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">{t(`${specialitiesKey[item.speciality].key}`)}</p>

                            </div>
                          </div>
                          <hr/>
                        </button>
                      )
                    }
                  </div>
                </div>

              </div>
              <div>
                <p className="font-sans text-xl font-bold">{t('latestNews')}</p>
                <hr/>
                <div className="grid grid-cols-1 gap-3">
                  {
                    news.map((item) =>
                      <div
                        className="flex h-auto sm:w-[90%] w-full border-2 border-gray-200 sm:p-1 rounded-lg cursor-pointer hover:border-blue-500 mx-1"
                        onClick={() => {
                          navigate('/news/' + item.id);
                        }}
                      >
                        <img src={item.image || NewsImage} className={`w-40 h-40 object-cover`}/>
                        <div>
                          <p className="text-xl text-blue-500 font-bold">
                            {item.title}
                          </p>
                          <div className={``}>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </div>
                      </div>)
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home;