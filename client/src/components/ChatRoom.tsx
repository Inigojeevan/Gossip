import { useState } from "react";
import { Socket } from "socket.io-client";

interface ChatRoomProps {
  socket: Socket;
  userName: string;
  room: string;
}

const ChatRoom = ({ socket, userName, room }: ChatRoomProps) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = () => {
    if (currentMessage !== "") {
      const message = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      socket.emit("sendMessage", message);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl justify-center items-center flex">
          Live Gossip
        </h1>
      </div>
      <div className="justify-center items-center flex">ChatBody</div>
      <div className="justify-center items-center flex">
        <input
          type="text"
          placeholder="Enter your message"
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
