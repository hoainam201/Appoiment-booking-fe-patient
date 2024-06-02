import news from "../assets/images/news.png";
import {useNavigate} from "react-router-dom";

export default function NewsButton({name, image, id}) {
  const navigate = useNavigate();
  return (
    <button
      className={`w-full h-28 outline outline-1 rounded-xl hover:outline-2 outline-blue-100 my-0.5 hover:underline hover:outline-1 hover:outline-blue-100`}
      onClick={() => navigate(`/news/${id}`)}
    >
      <div className={`flex gap-5`}>
        <div className={`flex justify-start h-full w-28 items-center`}>
          <img src={image || news} className={`w-full h-28 object-cover rounded-xl`}/>
        </div>
        <div className={`flex flex-col w-full`}>
          <div className={`font-bold text-2xl text-start break-words`}>{name}</div>
        </div>
      </div>
    </button>
  )
}