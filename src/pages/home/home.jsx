import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Input} from "antd";
import {SearchOutlined, MenuOutlined} from "@ant-design/icons";
import BoxSx from "../../components/Box";
import ActionAreaCard from "../../components/ActionAreaCard";
import "./home.css";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.png";
import img5 from "../../assets/images/img5.png";
import {useSearch} from "../../context/SearchContext";


const Home = () => {
  const navigate = useNavigate();
  const [contentPlaceholder, setContentPlaceholder] = useState('');
  const [isShowMenu, setIsShowMenu] = useState(true);
  const {updateSearchQuery} = useSearch();

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
    if(contentPlaceholder.trim() === '') {
      return;
    }
    updateSearchQuery(contentPlaceholder);
    navigate("/health-facilities");
  };

  const items = [
    {
      id: 1,
      name: "Đặt khám tại cơ sở",
      image: img1,
      linkTo: "/health-facilities",
    },
    {
      id: 2,
      name: "Đặt khám bác sĩ",
      image: img2,
      linkTo: "/doctor",
    },
    {
      id: 3,
      name: "Gói khám sức khỏe",
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
      name: "Cẩm nang",
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
    <div className={`relative`}>
      <div className={`flex flex-col justify-center items-center bg-blue-200`}>
        <div
          className={`home bg-cover bg-center w-full bg-no-repeat bg-bottom my-2`}
        >
          <div className={`flex items-center flex-col mt-36`}>
            <div className={`text-blue-400 text-2xl`}>
              Nền tảng công nghệ
            </div>
            <div className={`text-black text-5xl font-sans`}>
              Kết nối mọi người với dịch vụ y tế
            </div>
            <div className="flex justify-center w-2/3 px-28 py-6">
              <Input
                size="large"
                className="w-full
                rounded-full"
                placeholder="Search..."
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
              Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
            </div>
            <div className={`expand`}>
              <button
                onClick={() => {
                  setIsShowMenu(!isShowMenu);
                }}
              ><MenuOutlined ></MenuOutlined></button>
            </div>
            <div className={`nam gap-8 pt-4`} >
              {isShowMenu ? (
                items.map((item) => (
                  <BoxSx key={item.id} name={item.name} image={item.image} linkTo={item.linkTo}/>
                ))
              ) : (
                <></>
              )}
              {/*{items.map((item) => (*/}
              {/*  <BoxSx key={item.id} name={item.name} image={item.image} linkTo={item.linkTo}/>*/}
              {/*))}*/}
            </div>
          </div>
        </div>
        {/*<div className={`flex flex-col justify-center w-2/3 bg-blue-600 my-36 rounded-lg`}>*/}
        {/*  <div className={`text-white text-center text-4xl my-4`}>Thông tin</div>*/}
        {/*  <div className={`text-white text-lg pt-4 pb-8 `}>*/}
        {/*    <div className={`justify-center brue flex items-center gap-10`}>*/}
        {/*      {info.map((item) => (*/}
        {/*        <ActionAreaCard key={item.id} name={item.name} number={item.number}/>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default Home;