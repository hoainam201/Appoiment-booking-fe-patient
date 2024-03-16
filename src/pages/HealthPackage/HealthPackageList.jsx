import React from "react";
import PackageCard from "../../components/PackageCard";

export default function HealthPackageList() {

  return (
    <div>
      <div
        className={`justify-center items-center mx-32`}
      >
        <div
          className={`flex flex-wrap justify-start items-center w-full gap-5 p-3`}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <PackageCard key={item} />
          ))}
        </div>
      </div>
    </div>
  )
}