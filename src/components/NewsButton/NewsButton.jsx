import news from "../../assets/images/news.png";
import {useNavigate} from "react-router-dom";
import "./style.css";
import {FormattedDate} from "react-intl";

export default function NewsButton({name, image, id, subject}) {
  const navigate = useNavigate();
  return (
    <button className="child shadow-lg hover:border-2 hover:border-blue-500" onClick={() => navigate(`/news/${id}`)}>
      <img src={image || news} alt={name} />
      <div className="flex flex-col h-full justify-between">
        <p className="font-bold text-2xl text-blue-500 text-start mx-1">{name}</p>
        <p className="text-start mx-1 text-sm text-gray"><FormattedDate value={subject} year="numeric" month="long" day="numeric"/></p>
      </div>
    </button>
  )
}