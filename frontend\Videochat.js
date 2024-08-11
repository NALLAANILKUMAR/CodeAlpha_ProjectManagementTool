import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const VideoChat = () => {
  const [stream, setStream] = useState(null);
  const [roomID, setRoomID] = useState('');
  const videoRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:5000');
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      videoRef.current.srcObject = stream;
    });

    socketRef.current.on('receive message', message => {
      console.log(message);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const joinRoom = () => {
    socketRef.current.emit('join room', roomID);
  };

  const sendMessage = () => {
    socketRef.current.emit('send message', { roomID, message: 'Hello World!' });
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ width: '300px' }}></video>
      <input type="text" value={roomID} onChange={(e) => setRoomID(e.target.value)} placeholder="Room ID" />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default VideoChat;
