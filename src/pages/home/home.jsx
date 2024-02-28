import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../layouts/Header";
import {Input} from "antd";
import {SearchOutlined, MenuOutlined} from "@ant-design/icons";
import BoxSx from "../../components/Box";
import ActionAreaCard from "../../components/ActionAreaCard";
import "./home.css";
import Footer from "../../layouts/Footer";


const Home = () => {
  const navigate = useNavigate();
  const [contentPlaceholder, setContentPlaceholder] = useState('Search...');
  const [isShowMenu, setIsShowMenu] = useState(true);

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

  const items = [
    {
      id: 1,
      name: "Đặt khám tại cơ sở",
      image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F7751fd3f-f46c-436a-af19-2c64d4d5cf25-dkcs.png&w=64&q=75",
      linkTo: "/login",
    },
    {
      id: 2,
      name: "Đặt khám bác sĩ",
      image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F488715df-05ff-42ef-bf6b-27d91d132158-bacsi.png&w=64&q=75",
      linkTo: "/register",
    },
    {
      id: 3,
      name: "Gói khám sức khỏe",
      image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fb4181f19-f965-40b8-a4c5-2996cb960104-goi_kham.png&w=64&q=75",
      linkTo: "/",
    },
    {
      id: 4,
      name: "Dịch vụ y tế",
      image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2Fdf388485-514d-44ef-ad7e-352c083f24e0-dkxn.png&w=64&q=75",
      linkTo: "/",
    },
    {
      id: 5,
      name: "Cẩm nang",
      image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2Ffa0b00be-d554-404a-bf9a-4a5f216ee978-chaam_saac_taaoa_i_nhaa.png&w=64&q=75",
      linkTo: "/",
    }
  ]

  return (
    <div className={`relative`}>
      <Header/>
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
              <Input size="large" className="w-full rounded-full" placeholder="Search..." prefix={<SearchOutlined/>}/>
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
        <div className={`flex flex-col justify-center w-2/3 bg-blue-600 my-36 rounded-lg`}>
          <div className={`text-white text-center text-4xl my-4`}>Thông tin</div>
          <div className={`text-white text-lg pt-4 pb-8 `}>
            <div className={`justify-center brue flex items-center gap-10`}>
              <ActionAreaCard/>
              <ActionAreaCard/>
              <ActionAreaCard/>
              <ActionAreaCard/>
              <ActionAreaCard/>
              <ActionAreaCard/>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home;