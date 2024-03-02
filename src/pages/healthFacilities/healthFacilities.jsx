import React from "react";
import FacilityCard from "../../components/FacilityCard";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import MapComponent from "../../components/MapComponent";

export default function HealthFacilities() {
  return (
    <div>
      <Header/>
      <h1>HealthFacilities</h1>
      <div
        className={`justify-center items-center mx-28`}
      >
      <div
        className={`flex flex-wrap justify-start items-center w-full gap-5 p-3`}
      >
        {Array.from({length: 20}).map((_, index) => (
          <div key={index}>
            <FacilityCard/>
          </div>
        ))}
      </div>
      </div>
      {/*<MapComponent/>*/}
      <Footer/>
    </div>
  );
}