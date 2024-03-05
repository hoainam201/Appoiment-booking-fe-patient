import React from "react";
import FacilityCard from "../../components/FacilityCard";
import {useEffect, useState} from "react";
import USER from "../../services/userService";

export default function HealthFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [maxHeight, setMaxHeight] = useState(0);

  const getFacilities = async () => {
    try{
      const res = await USER.getFacilities();
      setFacilities(res.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Xác định chiều cao lớn nhất
    const heights = facilities.map((facility) => {
      const element = document.getElementById(`facility-${facility.id}`);
      return element ? element.clientHeight : 0;
    });
    const newMaxHeight = Math.max(...heights);

    // Cập nhật trạng thái chiều cao lớn nhất
    if (newMaxHeight !== maxHeight) {
      setMaxHeight(newMaxHeight);
    }
  }, [facilities, maxHeight]);

  useEffect(() => {
    getFacilities();
  },[]);

  return (
    <div>
      <div
        className={`justify-center items-center mx-28`}
      >
      <div
        className={`flex flex-wrap justify-start items-center w-full gap-5 p-3`}
      >
        {facilities.map((facility) => (
          <FacilityCard key={facility.id} {...facility} />
        ))}
      </div>
      </div>
    </div>
  );
}