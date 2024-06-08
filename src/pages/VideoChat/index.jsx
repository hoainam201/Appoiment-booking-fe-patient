import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';

const VideoChat = ({ roomId }) => {
  // Tạo các tham chiếu tới các đối tượng cần thiết
  const videoGridRef = useRef(null);
  const peersRef = useRef({});
  const myPeer = useRef(new Peer(undefined, {
    host: '/',
    port: '3001'
  })).current;
  const socket = useRef(io('/')).current;

  useEffect(() => {
    // Tạo video element cho video của chính mình và thiết lập muted
    const myVideo = document.createElement('video');
    myVideo.muted = true;

    // Lấy quyền truy cập vào video và audio của thiết bị
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      // Thêm video của chính mình vào DOM
      addVideoStream(myVideo, stream);

      // Lắng nghe sự kiện 'call' từ các peer khác
      myPeer.on('call', call => {
        call.answer(stream); // Trả lời cuộc gọi với stream của mình
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream); // Thêm video của user khác vào DOM
        });
      });

      // Lắng nghe sự kiện 'user-connected' từ server
      socket.on('user-connected', userId => {
        connectToNewUser(userId, stream); // Kết nối với user mới
      });
    });

    // Lắng nghe sự kiện 'user-disconnected' từ server
    socket.on('user-disconnected', userId => {
      if (peersRef.current[userId]) peersRef.current[userId].close(); // Đóng kết nối với user đã ngắt
    });

    // Khi peer kết nối mở, gửi sự kiện 'join-room' tới server
    myPeer.on('open', id => {
      socket.emit('join-room', roomId, id);
    });

    // Cleanup khi component unmount
    return () => {
      socket.disconnect();
      myPeer.disconnect();
    };
  }, [roomId]);

  // Hàm kết nối với user mới
  const connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream); // Gọi tới user mới
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream); // Thêm video của user mới vào DOM
    });
    call.on('close', () => {
      video.remove(); // Xóa video khi kết nối đóng
    });

    peersRef.current[userId] = call; // Lưu kết nối peer vào tham chiếu
  };

  // Hàm thêm video stream vào DOM
  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play(); // Phát video khi metadata đã load
    });
    videoGridRef.current.append(video); // Thêm video vào grid
  };

  // Render component
  return (
    <div id="video-grid" ref={videoGridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 300px)', gridAutoRows: '300px' }}>
    </div>
  );
};

export default VideoChat;
