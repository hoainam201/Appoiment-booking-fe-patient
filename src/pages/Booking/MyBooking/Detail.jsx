import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {toast} from "react-toastify";
import IconButton from "@mui/material/IconButton";
import {useParams} from "react-router-dom";
import {FormattedDate} from "react-intl";
import USER from "../../../services/userService";
import Loading from "../../../components/Loading";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextArea from "antd/es/input/TextArea";
import DialogActions from "@mui/material/DialogActions";
import Rating from "@mui/material/Rating";
import Filter from 'bad-words';
import {badwords} from "../../../utils/badwords";


const Detail = () => {
  const [data, setData] = useState(null);
  const id = useParams();
  const [prescription, setPrescription] = useState(null);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [service, setService] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const filter = new Filter();
  filter.addWords(...badwords);


  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSave = async () => {
    try {
      // Kiểm tra xem người dùng đã đánh giá hay chưa
      if (rating === 0) {
        toast.dismiss();
        toast.error("Vui lòng đánh giá");
        return;
      }
      if(filter.isProfane(content)) {
        toast.dismiss();
        toast.error("Vui lòng sử dụng ngôn từ phù hợp");
        return;
      }
      // Hiển thị thông báo loading
      toast.dismiss();
      toast.loading("Đang đánh giá...");
      const index = id.id;
      // Gửi yêu cầu lưu đánh giá
      const response = await USER.rateBooking(service, index, rating, content);

      // Kiểm tra nếu yêu cầu thành công
      if (response.status === 201) {
        toast.dismiss();
        toast.success("Đánh giá đã được cập nhật");
        setOpen(false);
        // Cập nhật dữ liệu trên giao diện
        fetchData();
      }
      else {
        toast.dismiss();
        toast.error("Đã xảy ra lỗi khi lưu đánh giá. Vui lòng thử lại sau.");
      }
    } catch (error) {
      // Xử lý lỗi nếu yêu cầu không thành công
      toast.dismiss();
      toast.error("Đã xảy ra lỗi khi lưu đánh giá. Vui lòng thử lại sau.");
    }
  };



  const fetchData = async () => {
    try {
      const index = id.id;
      const response = await USER.getBookingDetail(index);
      if (response.status === 200) {
        console.log(response.data)
        setData(response.data);
        setService(response.data.service_id);
        if (response.data.diagnosis) {
          setDescription(response.data.diagnosis.description);
          setPrescription(response.data.prescription);
        }
        if(response.data.service_review_id){
          fetchReview(response.data.service_review_id);
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Vui lòng thử lại sau1");
    }
  }

  const fetchReview = async (id) => {
    try {
      const response = await USER.getReviewDetail(id);
      if (response.status === 200) {
        setReviewData(response.data);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Vui lòng thử lại sau1");
    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Tên thuốc',
      dataIndex: 'drug',
      key: 'drug',
      fixed: 'left',
      width: 200,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Liều dùng',
      dataIndex: 'instruction',
      key: 'instruction',
      // width: 300,
      render: (text) => <a>{text}</a>,
    },
  ]


  return (
    <>
      {data ? <div className="flex flex-col mx-20">
        <div className="flex justify-between">
          <Button
            sx={{
              mr: 1,
              textTransform: "none",
            }}
            onClick={() => window.history.back()}
            variant="text"
            startIcon={<ArrowBackIosIcon/>}
          >Quay lại</Button>
          <h1 className="text-3xl font-bold text-center">Thông tin</h1>
          {data?.service_review_id === null ?
            <Button
              sx={{
                mr: 1,
                textTransform: "none",
              }}
              disabled={data?.payment_status === 0}
              onClick={handleClickOpen}
              variant="contained"
            >Viết đánh giá</Button> : <Button
              sx={{
                mr: 1,
                textTransform: "none",
              }}
              disabled
              variant="contained"
            >Viết đánh giá</Button>}
        </div>
        <div className="flex items-center h-12 w-full justify-between">
          <p className="text-xl font-bold text-center">
            Tên bệnh nhân
          </p>
          <div className="flex ml-2 mt-1">
            <p>
              {data?.name}
            </p>
          </div>
        </div>
        <hr/>
        <div className="flex items-center h-12 w-full justify-between">
          <p className="text-xl font-bold text-center">
            Dịch vụ khám
          </p>
          <div className="flex ml-2 mt-1">
            <p>
              {data?.service.name}
            </p>
          </div>
        </div>
        <hr/>
        <div className="flex items-center h-12 w-full justify-between">
          <p className="text-xl font-bold text-center">
            Ngày tháng năm sinh
          </p>
          <div className="flex ml-2 mt-1">
            <p>
              <FormattedDate value={data?.dob} year="numeric" month="long" day="numeric"/>
            </p>
          </div>
        </div>
        <hr/>
        <div className="flex items-center h-12 w-full justify-between">
          <p className="text-xl font-bold text-center">
            Thời gian đăng ký khám
          </p>
          <div className="flex ml-2 mt-1">
            <p>
              <FormattedDate value={data?.time} year="numeric" month="long" day="numeric" hour="numeric"
                             minute="numeric"/>
            </p>
          </div>
        </div>
        <hr/>
        <div className="flex items-center h-12 w-full justify-between">
          <p className="text-xl font-bold text-center">
            Số điện thoại
          </p>
          <div className="flex ml-2 mt-1">
            <p>
              {data?.phone}
            </p>
          </div>
        </div>
        <hr/>
        {data?.payment_status ?
          <div className="flex flex-col items-start">
            <div className="flex w-full justify-start">
              <p className="text-xl font-bold">Chẩn đoán</p>
            </div>
            <textarea
              className="w-full outline-1 border-2 border-gray-200 p-2 rounded-lg text-base focus:outline-blue-500"
              placeholder="Chẩn đoán"
              value={description}
              disabled
            />
          </div>
          : null}
        {data?.payment_status && prescription ?
          <Table
            columns={columns}
            dataSource={prescription}
          /> : null}

        {reviewData && <div>
          <p className="text-xl font-bold">
            Đánh giá của bạn
          </p>
          <div className="flex gap-3 my-1">
            <Rating name="read-only" value={reviewData?.rating} readOnly/>
            <div className="text-sm">
              <FormattedDate value={reviewData?.created_at}
                             year="numeric"
                             month="long"
                             day="numeric"
                             hour="numeric"
                             minute="numeric"
              />
            </div>
          </div>
          <hr/>
          <div>{reviewData?.comment}</div>
        </div>
        }

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={true}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Đánh giá</DialogTitle>
        <DialogContent>
        <Rating
              defaultValue={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
                console.log(rating);
              }}
              precision={1}/>
            <TextArea
              name="Nội dung"
              id="outlined-multiline-static"
              multiline
              rows={4}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleSave}>Gửi</Button>
          </DialogActions>
        </Dialog>
      </div> : <><Loading/></>}
    </>
  )
}
export default Detail;