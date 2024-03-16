import React from "react";
import DoctorImg from "../../assets/images/img2.png";
import {useState} from "react";

const DoctorBooking = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    console.log(name, phone, address, date, time, reason)
  }
  return (
    <div>
      <div className={`flex justify-center w-full bg-blue-100`}>
        <div className={`flex flex-col w-1/2 mt-2`}>
          <div className={`flex w-full h-24 gap-3 justify-start`}>
            <img className={`w-auto h-full rounded-full`} src={DoctorImg}/>
            <div>
              <div className={`text-xl`}>Đặt lịch khám</div>
              <div className={`text-2xl font-bold`}>Bác sĩ nguyễn hãng</div>
              <div className={`text-xl`}>Giá: 300.000VND</div>
            </div>
          </div>
          <div className={`w-full h-1 bg-gray-200 my-3`}/>
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Họ tên
              </label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username"
                     type="text"
                     value={props?.name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Nguyễn Văn A"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Số điện thoại
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="username"
                     type="text"
                     onChange={(e) => setPhone(e.target.value)}
                     placeholder="0123456789"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ngày tháng năm sinh
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="date"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ngày khám
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     onChange={(e) => setTime(e.target.value)}
                     type="datetime-local"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Lý do khám
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     onChange={(e) => setReason(e.target.value)}
                     type="text"/>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Đặt khám
              </button>
            </div>
            <div className="mt-4">
              <li>Vui lòng điền chính xác thông tin để bệnh viện lập hồ sơ</li>
              <li>Chi phí đặt lích khám sẽ thanh toán tại bệnh viện</li>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DoctorBooking