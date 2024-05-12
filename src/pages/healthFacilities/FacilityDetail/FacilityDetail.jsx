import React, {useState, useEffect} from "react";
import FacilityInfo from "../../../components/FacilityInfo";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DoctorButton from "../../../components/DoctorButton";
import TotalReivew from "../../../components/TotalReivew";
import ReviewCard from "../../../components/ReviewCard";
import {useParams} from "react-router-dom";
import USER from "../../../services/userService";
import Viewer from "../../../components/Editor/Viewer";
import LeafletMap from "../../../components/Map/LeafletMap";
import {toast} from "react-toastify";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {iconPerson} from "../../../components/Map/icon";

import {Fly} from "../../../components/Map/Fly";


const FacilityDetail = () => {
    const [id, setId] = useState('');
    const [data, setData] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const facilityId = useParams();


    useEffect(() => {
        const getFacilityDetail = async () => {
            try {
                const res = await USER.getFacilityDetail(facilityId.id);
                if (res.status === 200) {
                    console.log(res.data);
                    setData(res.data);
                    setLat(res.data.latitude);
                    setLng(res.data.longitude);
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getFacilityDetail();
    }, [facilityId.id]);


    return (
        <div className={`bg-blue-100 pb-5`}>
            <div className={`flex mx-36 gap-5 mb-4`}>
                <div className={`flex w-1/3`}>
                    <FacilityInfo {...data}/>
                </div>
                <div className={`flex w-2/3 mx-auto my-auto`}>
                    <div className={` w-full max-h-96`}>
                        <div
                            className={`flex flex-col bg-white w-full h-full rounded-2xl gap-3 my-4 overflow-x-hidden wrapper`}>
                            <div className={`flex justify-start mt-3 h-auto mx-10 w-3/4`}>
                                <div className={`font-bold text-2xl text-blue-800`}>Giới thiệu</div>
                            </div>
                            <div className={`mx-10 w-3/4 mb-3`}>
                                <div className={`text-lg whitespace-pre-line break-words`}>
                                    <Viewer value={data.description}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex mx-36 gap-5`}>
                <div className={`flex w-1/3`}>
                    <div className={`flex flex-col bg-white w-full h-auto rounded-xl gap-3 my-4 `}>
                        <div className={`flex justify-start mt-3 h-auto mx-10 w-3/4`}>
                            <div className={`font-bold text-2xl text-blue-800`}>Bản đồ</div>
                        </div>
                        {lat !== 0 ? <LeafletMap lat={lat} lng={lng}/> : <div className={`w-full h-96`}/>}
                    </div>
                </div>
                <div className={`flex w-2/3 mx-auto h-full`}>
                    <div className={`w-full h-96`}>
                        <div className={`flex flex-col bg-white w-full h-auto rounded-2xl gap-3 my-4 `}>
                            <div className={`flex justify-start mt-3 h-auto mx-10 w-3/4 gap-3`}>
                                <div className={`text-blue-400 text-2xl`}>Danh sách bác sĩ</div>
                                <Box sx={{
                                    width: 150,
                                    height: 50,
                                }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Chuyên khoa</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={0}
                                            label="Chuyên khoa"
                                            size="small"
                                            onChange={(event) => {
                                                setId(event.target.value);
                                            }}
                                        >
                                            <MenuItem value={0}>Tất cả</MenuItem>
                                            <MenuItem value={10}>Tai-Mũi-Họng</MenuItem>
                                            <MenuItem value={20}>Thận-tiết niệu</MenuItem>
                                            <MenuItem value={30}>Sản-nhi</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <hr className={`mx-5 mt-2 bg-gray-500`}/>
                            <div className={`gap-2 mx-2 max-h-72 overflow-auto`}>
                                {data?.doctors?.map((item) => {
                                    return (
                                        <DoctorButton/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex mx-36 mt-12 gap-5 bg-white rounded-xl">
                    <div className={`w-1/3 justify-start`}>
                        <TotalReivew/>
                    </div>
                    <div className={`flex flex-col w-full`}>
                        <p className={`w-full text-2xl font-sans`}>Đánh giá từ người dùng</p>
                        <div>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <ReviewCard key={item}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacilityDetail;